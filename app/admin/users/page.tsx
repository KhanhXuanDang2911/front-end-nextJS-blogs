"use client"

import { ChevronLeft, ChevronRight, MoreHorizontal, Plus, Search, Loader2 } from "lucide-react"
import { Form, Input, Select, Upload, Button as ButtonAntd } from "antd";
// const { Option } = Select;
import { UploadOutlined } from "@ant-design/icons";
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
import { Input as InputFromCpn } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { addUser, deleteUser, getUsersForAdminPage, searchUserByName, updateUser } from "@/service/userService"
import { message } from "antd";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [messageApi, contextHolder] = message.useMessage();
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSearch = async () => {
    const users = await searchUserByName(searchTerm)
    setUsers(users)
  }

  const handleAdd = () => {
    setIsCreateDialogOpen(true)
  }

  const handleEdit = (user: any) => {
    setSelectedUser(user)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (user: any) => {
    setSelectedUser(user)
    setIsDeleteDialogOpen(true)
  }

  const handleAddSubmit = async () => {
    try {
      const user = await formAdd.validateFields();
      delete user.confirmPassword;
      const res = await addUser(user)
      console.log("user", res)
      if (res.status === 201) {
        messageApi.open({
          type: 'success',
          content: 'Add user success',
        });
        formAdd.resetFields();
        setIsCreateDialogOpen(false)
        fetchUsers()

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
  };

  const handleEditSubmit = async () => {
    try {
      const user = await formEdit.validateFields();
      delete user.avatar;
      console.log("user", user)
      const res = await updateUser(user)
      console.log("res", res)
      if (res.status === 204) {
        messageApi.open({
          type: 'success',
          content: `Update user ${user.id} successful`,
        });
        setIsEditDialogOpen(false)
        fetchUsers()
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
  };

  const handleDeleteSubmit = async () => {
    try {
      console.log("selectedUser", selectedUser)
      const res = await deleteUser(selectedUser.id)
      if (res.status === 205) {
        messageApi.open({
          type: 'success',
          content: `Delete user ${selectedUser.username} successful`,
        });
        setIsDeleteDialogOpen(false)
        fetchUsers()
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
  }

  const fetchUsers = async () => {
    const res = searchTerm != "" ? await searchUserByName(searchTerm) : await getUsersForAdminPage()
    setUsers(res)
  }

  useEffect(() => {
    fetchUsers()
  }, []);

  useEffect(() => {
    if (selectedUser) {
      formEdit.setFieldsValue({
        id: selectedUser.id,
        username: selectedUser.username,
        name: selectedUser.name,
        role: selectedUser.role,
        email: selectedUser.email,
        phone: selectedUser.phone,
        avatar: selectedUser.avatar,
        is_active: selectedUser.is_active
      });
    }
  }, [selectedUser, formEdit]);

  const [fileList, setFileList] = useState([]);

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };
  return (
    <div className="p-8">
      {contextHolder}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold gradient-text">Users</h1>
        <Button onClick={handleAdd} className="bg-gradient-to-r from-brand-blue to-brand-purple text-white">
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <div className="flex items-center py-4 gap-5">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <InputFromCpn
            placeholder="Search users by name..."
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

      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/30">
                <TableCell>
                  <img src={user.avatar} alt="Avatar" className="h-10 w-10 rounded-full" />
                </TableCell>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.role === 'admin' ? 'Admin' : 'User'}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </div>
                </TableCell>
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
                      <DropdownMenuItem onClick={() => handleEdit(user)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(user)} className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {!loading && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Create User Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Add New User</DialogTitle>
            {/* <DialogDescription>
              Create a new user account. Fill in the details below and click save when you're done.
            </DialogDescription> */}
          </DialogHeader>
          <Form
            form={formAdd}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            initialValues={{ is_active: true }}
            style={{ maxWidth: 600, marginTop: 13 }}
          >
            {/* Username */}
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please enter a username!" }]}
            >
              <Input maxLength={20} placeholder="Enter username..." />
            </Form.Item>

            {/* Password */}
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter a password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password maxLength={45} placeholder="Enter password..." />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password maxLength={45} placeholder="Re-enter password..." />
            </Form.Item>

            {/* Name */}
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input maxLength={45} placeholder="Enter your name..." />
            </Form.Item>

            {/* Role */}
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select a role!" }]}
            >
              <Select placeholder="Select role">
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="user">User</Select.Option>
              </Select>
            </Form.Item>

            {/* Email */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter an email!" },
                { type: "email", message: "Invalid email format!" },
              ]}
            >
              <Input placeholder="Enter email..." />
            </Form.Item>

            {/* Phone */}
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please enter a phone number!" },
                { pattern: /^[0-9]{10,11}$/, message: "Phone number must be 10-11 digits!" },
              ]}
            >
              <Input maxLength={11} placeholder="Enter phone number..." />
            </Form.Item>

            {/* Avatar Upload */}
            <Form.Item label="Avatar" name="avatar">
              <Upload
                beforeUpload={() => false} // Không upload ngay lập tức
                listType="picture"
                fileList={fileList}
                onChange={handleUploadChange}
                maxCount={1}
                accept="image/*" // Chỉ cho phép chọn ảnh
              >
                <ButtonAntd icon={<UploadOutlined />}>Upload Avatar</ButtonAntd>
              </Upload>
            </Form.Item>
            <DialogFooter className="flex space-x-2 justify-end">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleAddSubmit}
                disabled={loading}
                className="bg-gradient-to-r from-brand-blue to-brand-purple text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Save User"
                )}
              </Button>
            </DialogFooter>
          </Form>

        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit User</DialogTitle>
            {/* <DialogDescription>Make changes to the user account. Click save when you're done.</DialogDescription> */}
          </DialogHeader>
          {selectedUser && (
            <Form
              form={formEdit}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              layout="horizontal"
              initialValues={{ is_active: true }}
              style={{ maxWidth: 600, marginTop: 13 }}
            >
              {/* Username */}
              <Form.Item

                label="Id"
                name="id"
                rules={[{ required: true}]}
              >
                <Input readOnly/>
              </Form.Item>

              {/* Username */}
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true }]}
              >
                <Input readOnly/>
              </Form.Item>

              {/* Status */}
              <Form.Item
                label="Status"
                name="is_active"
                rules={[{ required: true, message: "Please select a status!" }]}
              >
                <Select placeholder="Select role">
                <Select.Option value={true}>Active</Select.Option>
                  <Select.Option value={false}>Inactive</Select.Option>
                </Select>
              </Form.Item>

              {/* Name */}
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name!" }]}
              >
                <Input maxLength={45} placeholder="Enter your name..." />
              </Form.Item>

              {/* Role */}
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select a role!" }]}
              >
                <Select placeholder="Select role">
                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="user">User</Select.Option>
                </Select>
              </Form.Item>

              {/* Email */}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter an email!" },
                  { type: "email", message: "Invalid email format!" },
                ]}
              >
                <Input placeholder="Enter email..." />
              </Form.Item>

              {/* Phone */}
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please enter a phone number!" },
                  { pattern: /^[0-9]{10,11}$/, message: "Phone number must be 10-11 digits!" },
                ]}
              >
                <Input maxLength={11} placeholder="Enter phone number..." />
              </Form.Item>

              {/* Avatar Upload */}
              {selectedUser.avatar ? '' : 
              
              <Form.Item label="Avatar" name="avatar">
                <Upload
                  beforeUpload={() => false} // Không upload ngay lập tức
                  listType="picture"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  maxCount={1}
                  accept="image/*" // Chỉ cho phép chọn ảnh
                >
                  <ButtonAntd icon={<UploadOutlined />}>Upload Avatar</ButtonAntd>
                </Upload>
              </Form.Item>}
              <DialogFooter className="flex space-x-2 justify-end">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={handleEditSubmit}
                  disabled={loading}
                  className="bg-gradient-to-r from-brand-blue to-brand-purple text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Save User"
                  )}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl text-red-600">Confirm Deletion</DialogTitle>
            {/* <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription> */}
          </DialogHeader>
          {selectedUser && (
            <div className="py-4 space-y-2">
              <p className="italic">Are you sure you want to delete this user? This action cannot be undone !!</p>
              {/* <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Name:</span>
                <span>{selectedUser.name}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Email:</span>
                <span>{selectedUser.email}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Role:</span>
                <span>{selectedUser.role}</span>
              </div> */}
            </div>
          )}
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSubmit} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

