"use client"
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus, Search } from "lucide-react"
import { Form, message, Spin } from "antd";
import { addCategery, deleteCategory, getCategoryForAdminPage, searchCategoryByName, updateCategery } from "@/service/categoryService"

export default function ContentCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [isLoading, setIsloading] = useState<any>(false)

  const handleSearch = async () => {
    const categories = await searchCategoryByName(searchTerm)
    setCategories(categories)
  }

  const handleAdd = () => {
    setIsCreateDialogOpen(true)
  }

  const handleEdit = (category: any) => {
    setSelectedCategory(category)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (category: any) => {
    setSelectedCategory(category)
    setIsDeleteDialogOpen(true)
  }

  const handleAddSubmit = async () => {
    try {
      setIsloading(true);
      const category = await formAdd.validateFields();
      const res = await addCategery(category)
      if (res.status === 201) {
        messageApi.open({
          type: 'success',
          content: 'Add category success',
        });
        formAdd.resetFields();
        setIsCreateDialogOpen(false)
        fetchCategories()
        // setCategories(
        //   [...categories,
        //     category.data
        //   ]
        // )
      }
      else {
        messageApi.open({
          type: 'error',
          content: res.message,
        })
      }
    } catch (error) {
      console.log("Validation failed:", error);
      messageApi.open({
        type: 'error',
        content: error + "",
      })
    }
    setIsloading(false);
  };

  const handleEditSubmit = async () => {
    try {
      setIsloading(true);
      const category = await formEdit.validateFields();
      const res = await updateCategery(category)
      if (res.status === 202) {
        messageApi.open({
          type: 'success',
          content: `Update category ${category.id} successful`,
        });
        setIsEditDialogOpen(false)
        fetchCategories()
      }
      else if (res.status == 500) {
        messageApi.open({
          type: 'error',
          content: res.message,
        })
      }
    } catch (error) {
      console.log("Validation failed:", error);
      messageApi.open({
        type: 'error',
        content: error + "",
      })
    }
    setIsloading(false);
  };

  const handleDeleteSubmit = async (selectedCategory: any) => {
    setIsloading(true);
    try {
      const res = await deleteCategory(selectedCategory.id)
      if (res.status === 205) {
        messageApi.open({
          type: 'success',
          content: `Delete category ${selectedCategory.id} successful`,
        });
        setIsDeleteDialogOpen(false)
        fetchCategories()
      }
      else if (res.status == 500) {
        messageApi.open({
          type: 'error',
          content: res.message,
        })
      }
    } catch (error) {
      console.log("Validation failed:", error);

      messageApi.open({
        type: 'error',
        content: error + "",
      })
    }
    setIsloading(false);
  }

  const fetchCategories = async () => {
    const res = searchTerm != "" ? await searchCategoryByName(searchTerm) : await getCategoryForAdminPage()
    setCategories(res)
  }

  useEffect(() => {
    setIsloading(true);
    fetchCategories()
    setIsloading(false);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      formEdit.setFieldsValue({
        id: selectedCategory.id,
        name: selectedCategory.name,
      });
    }
  }, [selectedCategory, formEdit]);

  return (
    <div className="p-8">
      {contextHolder}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <div className="flex items-center py-4 gap-5">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />

        </div>
        <Button onClick={() => handleSearch()}>
          Search
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Articles</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? <><Spin indicator={<LoadingOutlined spin />} size="large" /></> :
              <>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.id}</TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.news_count}</TableCell>
                    <TableCell>{category.created_at}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEdit(category)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(category)} className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </>}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Create Category Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            {/* <DialogDescription>Create a new category for news articles. Click save when you're done.</DialogDescription> */}
          </DialogHeader>
          <Form form={formAdd} layout="horizontal" style={{ marginTop: 20 }}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter category name!" }]}
            >
              <Input placeholder="Enter category name" />
            </Form.Item>
          </Form>
          <DialogFooter>
            <Button onClick={() => handleAddSubmit()}>Save Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            {/* <DialogDescription>Make changes to the category. Click save when you're done.</DialogDescription> */}
          </DialogHeader>
          {selectedCategory && (
            <Form form={formEdit} layout="horizontal" style={{ marginTop: 20 }} labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }} >
              <Form.Item
                label="Id"
                name="id"
              >
                <Input readOnly />
              </Form.Item>

              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter category name!" }]}
              >

                <Input placeholder="Enter category name" />
              </Form.Item>

            </Form>
          )}
          <DialogFooter>
            <Button onClick={handleEditSubmit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Category Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Confirm Deletion</DialogTitle>
            {/* <DialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
            </DialogDescription> */}
          </DialogHeader>
          {selectedCategory && (
            <div className="py-4">
              <p className="italic">
                Deleting this category will affect {selectedCategory.articleCount} articles!!!
              </p>
              {/* <p>
                <strong>Articles Count:</strong> {selectedCategory.articleCount}
              </p>
              <p className="text-amber-600 mt-2">
                Warning: Deleting this category will affect {selectedCategory.articleCount} articles.
              </p> */}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => handleDeleteSubmit(selectedCategory)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}