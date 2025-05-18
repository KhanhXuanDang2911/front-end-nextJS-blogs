"use client"
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { useEffect, useState, useRef } from "react"
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus, Search, FileText, Upload, Check } from "lucide-react"
import { message, Spin, Modal, Tabs } from "antd";
import { addNews, deleteNews, getNewsForAdminPage, searchNewsByTitle } from "@/service/newsService"
import Link from 'next/link';
import { getUserId } from "@/utils/auth";

interface NewsItem {
  id?: number;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  category: number;
  status: string;
  published_at?: string;
  author_id?: number;
  selected?: boolean;
}

export default function NewsManagementPage() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedNews, setSelectedNews] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [importedNews, setImportedNews] = useState<NewsItem[]>([])
  const [previewNews, setPreviewNews] = useState<NewsItem | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [importSearchTerm, setImportSearchTerm] = useState("")
  const [selectAll, setSelectAll] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importResult, setImportResult] = useState<any>(null);
  const [isImportResultOpen, setIsImportResultOpen] = useState(false);

  const handleSearch = async () => {
    const news = await searchNewsByTitle(searchTerm)
    setNewsList(news)
  }

  const handleDelete = (news: any) => {
    setSelectedNews(news)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await deleteNews(selectedNews.id)
      if (res.status === 205) {
        messageApi.open({
          type: 'success',
          content: `Delete news ${selectedNews.id} successful`,
        });
        setIsDeleteDialogOpen(false)
        fetchNews()
      } else if (res.status == 500) {
        messageApi.open({
          type: 'error',
          content: res.message,
        })
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error + "",
      })
    }
    setIsLoading(false);
  }

  const fetchNews = async () => {
    const res = searchTerm !== "" ? await searchNewsByTitle(searchTerm) : await getNewsForAdminPage()
    setNewsList(res)
  }

  const handleImportDialogOpen = () => {
    setIsImportDialogOpen(true);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        // Add published_at and author_id to each item
        const timestamp = new Date().toISOString();
        const authorId = getUserId();

        const processedNews = json.map((item: NewsItem) => ({
          ...item,
          published_at: timestamp,
          author_id: authorId,
          selected: true // Default all items as selected
        }));

        setImportedNews(processedNews);
        setSelectAll(true);
        messageApi.success(`Successfully parsed ${processedNews.length} news items`);
      } catch (error) {
        messageApi.error('Failed to parse JSON file. Please check the format and try again.');
      }
    };
    reader.readAsText(file);
  }

  const handleImportSubmit = async () => {
    const selectedItems = importedNews.filter(item => item.selected);

    if (selectedItems.length === 0) {
      messageApi.warning('Please select at least one article to import');
      return;
    }

    setIsLoading(true);

    try {
      // Prepare the data for the API - remove the 'selected' property from each item
      const articlesToImport = selectedItems.map(({ selected, ...rest }) => rest);

      // Call the API with the array of articles
      const response = await fetch('http://localhost:8000/api/news/import/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(articlesToImport)
      });

      const result = await response.json();

      if (response.ok) {
        // Show success message
        messageApi.success(result.message || `Successfully imported ${result.data.total_imported} articles`);

        // If there were partial errors, show warning
        if (result.status === 207 && result.data.total_failure > 0) {
          messageApi.warning(`${result.data.total_failure} articles failed to import`);
        }

        // Show import summary dialog with details
        setImportResult(result.data);
        setIsImportResultOpen(true);

        // Close the import dialog
        setIsImportDialogOpen(false);

        // Refresh the news list
        fetchNews();
      } else {
        // Show error message
        messageApi.error(result.message || 'Failed to import articles');
      }
    } catch (error) {
      console.error("Error importing articles:", error);
      messageApi.error('Failed to import articles: Network error');
    } finally {
      setIsLoading(false);
    }
  }

  const handlePreviewNews = (news: NewsItem) => {
    setPreviewNews(news);
    setIsPreviewOpen(true);
  }

  // Prevent modal closing propagation
  const handleImportDialogOpenChange = (open: boolean) => {
    // Only allow closing if not viewing a preview
    if (!isPreviewOpen || open) {
      setIsImportDialogOpen(open);
    }
  }

  // Handle preview modal closing separately
  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
  }

  const handleSelectArticle = (index: number, checked: boolean) => {
    const updatedNews = [...importedNews];
    updatedNews[index].selected = checked;
    setImportedNews(updatedNews);

    // Update selectAll state based on whether all items are now selected
    setSelectAll(updatedNews.every(item => item.selected));
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    const updatedNews = importedNews.map(item => ({
      ...item,
      selected: checked
    }));
    setImportedNews(updatedNews);
  }

  const getFilteredImportedNews = () => {
    if (!importSearchTerm) return importedNews;
    return importedNews.filter(item =>
      item.title.toLowerCase().includes(importSearchTerm.toLowerCase())
    );
  }

  const getSelectedItemsJSON = () => {
    const selectedItems = importedNews
      .filter(item => item.selected)
      .map(({ selected, ...rest }) => rest); // Remove the selected property

    return JSON.stringify(selectedItems, null, 2);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchNews()
    setIsLoading(false);
  }, []);

  return (
    <div className="p-8">
      {contextHolder}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">News Management</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className='flex items-center gap-1'
            onClick={handleImportDialogOpen}
          >
            <Upload className="mr-2 h-4 w-4" /> <span>Import News</span>
          </Button>
          <Link href={'/user/posts/new'}>
            <Button className='flex items-center gap-1'>
              <Plus className="mr-2 h-4 w-4" /> <span>Add News</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center py-4 gap-5">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search news by title..."
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
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Excerpt</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Published At</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  <Spin indicator={<LoadingOutlined spin />} size="large" />
                </TableCell>
              </TableRow>
            ) : (
              newsList.map((news) => (
                <TableRow key={news.id}>
                  <TableCell className="font-medium">{news.id}</TableCell>
                  <TableCell className="font-medium">{news.title}</TableCell>
                  <TableCell className="font-normal">{news.excerpt}</TableCell>
                  <TableCell className="font-normal">{news.author_id}</TableCell>
                  <TableCell className="font-normal">{news.status}</TableCell>
                  <TableCell className="font-normal">
                    {news.image ? (
                      <img
                        src={news.image.includes('http') ?
                          news.image.replace('image/upload/', '') :
                          "https://res.cloudinary.com/dbqoymyi8/" + news.image
                        }
                        alt="News Image"
                        className="w-16 h-16 object-cover"
                      />
                    ) : 'No Image'}
                  </TableCell>
                  <TableCell className="font-normal">
                    {news.published_at ?
                      new Date(news.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                      : 'Not Published'
                    }
                  </TableCell>
                  <TableCell className="font-normal">{news.category}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={`/blog/${news.id}`} target='_blank'>
                          <DropdownMenuItem>View</DropdownMenuItem>
                        </Link>
                        <Link href={`/user/posts/${news.id}/edit`} target='_blank'>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className="text-red-600" onClick={(e) => handleDelete(news)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Import News Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={handleImportDialogOpenChange}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Import News from JSON File</DialogTitle>
            <DialogDescription>
              Upload a JSON file containing news articles. Each article should have title, content, excerpt, image, category, and status fields.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-md mb-4">
              <input
                type="file"
                accept=".json"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                variant="outline"
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadOutlined className="mr-2" /> Select JSON File
              </Button>
            </div>

            {importedNews.length > 0 && (
              <div className="flex-1 overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="select-all"
                      checked={selectAll}
                      onCheckedChange={handleSelectAll}
                    />
                    <Label htmlFor="select-all" className="text-sm font-semibold">
                      Select All Articles ({importedNews.filter(item => item.selected).length}/{importedNews.length})
                    </Label>
                  </div>

                  <div className="relative w-full max-w-[200px]">
                    <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search articles..."
                      value={importSearchTerm}
                      onChange={(e) => setImportSearchTerm(e.target.value)}
                      className="pl-8 h-8 text-sm"
                    />
                  </div>
                </div>

                <div className="border rounded-md mb-4 flex-1 overflow-hidden flex flex-col">
                  <div className="flex-1 overflow-y-auto max-h-[250px]">
                    {getFilteredImportedNews().map((news, index) => {
                      const actualIndex = importedNews.findIndex(item => item.title === news.title);
                      return (
                        <div key={index} className="p-2 hover:bg-gray-100 border-b flex items-center">
                          <Checkbox
                            checked={news.selected}
                            onCheckedChange={(checked) => handleSelectArticle(actualIndex, !!checked)}
                            className="mr-3"
                            id={`article-${index}`}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div
                            className="flex-1 cursor-pointer flex justify-between items-center overflow-hidden"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePreviewNews(news);
                            }}
                          >
                            <span className="font-medium truncate max-w-[70%]">{news.title}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 shrink-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePreviewNews(news);
                              }}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Tabs
                  defaultActiveKey="1"
                  items={[
                    {
                      key: '1',
                      label: 'Preview Selected JSON',
                      children: (
                        <pre className="bg-gray-100 p-3 rounded-md overflow-auto text-xs max-h-[150px]">
                          {getSelectedItemsJSON()}
                        </pre>
                      ),
                    },
                  ]}
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => !isPreviewOpen && setIsImportDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleImportSubmit}
              disabled={!importedNews.some(item => item.selected) || isLoading}
            >
              {isLoading ? 'Importing...' : 'Import Articles'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* News Preview Modal - Must be completely separate from Import dialog */}
      <Modal
        title="Article Preview"
        open={isPreviewOpen}
        onCancel={handlePreviewClose}
        footer={[
          <Button key="close" onClick={handlePreviewClose}>
            Close
          </Button>
        ]}
        width={800}
        destroyOnClose={false}
        maskClosable={true}
        style={{ zIndex: 1051 }}
        getContainer={() => document.body}
        styles={{
          body: {
            maxHeight: '70vh',
            overflow: 'auto',
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch'
          }
        }}
      >
        {previewNews && (
          <div className="preview-container p-4" style={{ height: '100%' }}>
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: '1',
                  label: 'Preview',
                  children: (
                    <div className="preview-content">
                      <h1 className="text-2xl font-bold mb-4">{previewNews.title}</h1>
                      <div className="text-gray-500 mb-4">{previewNews.excerpt}</div>
                      {previewNews.image && (
                        <div className="mb-4">
                          <img
                            src={previewNews.image.includes('http') ?
                              previewNews.image.replace('image/upload/', '') :
                              "https://res.cloudinary.com/dbqoymyi8/" + previewNews.image
                            }
                            alt={previewNews.title}
                            className="max-w-full h-auto"
                          />
                        </div>
                      )}
                      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: previewNews.content }} />
                    </div>
                  ),
                },
                {
                  key: '2',
                  label: 'Raw Data',
                  children: (
                    <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
                      {JSON.stringify(previewNews, null, 2)}
                    </pre>
                  ),
                },
              ]}
            />
          </div>
        )}
      </Modal>

      {/* Import Results Dialog */}
      <Dialog open={isImportResultOpen} onOpenChange={setIsImportResultOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Import Results</DialogTitle>
            <DialogDescription>
              {importResult && `Successfully imported ${importResult.total_imported || importResult.total_success || 0} articles`}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            {importResult && importResult.imported && importResult.imported.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-2">Successfully Imported:</h3>
                <div className="max-h-[200px] overflow-y-auto border rounded-md">
                  {importResult.imported.map((item: any, idx: number) => (
                    <div key={idx} className="p-2 hover:bg-gray-100 border-b flex items-center">
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-green-600">ID: {item.id}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {importResult && importResult.errors && importResult.errors.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-2 text-red-600">Failed to Import:</h3>
                <div className="max-h-[200px] overflow-y-auto border rounded-md border-red-200">
                  {importResult.errors.map((item: any, idx: number) => (
                    <div key={idx} className="p-2 hover:bg-red-50 border-b">
                      <div className="font-medium">{item.title || `Article at index ${item.index}`}</div>
                      <div className="text-sm text-red-600">
                        {typeof item.error === 'string'
                          ? item.error
                          : Object.entries(item.error || {}).map(([field, msgs]) => (
                            <div key={field}>
                              <span className="font-semibold">{field}:</span> {Array.isArray(msgs) ? msgs.join(', ') : String(msgs)}
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button onClick={() => setIsImportResultOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete News Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Confirm Deletion</DialogTitle>
          </DialogHeader>
          {selectedNews && (
            <div className="py-4">
              <p className="italic">
                Are you sure you want to delete the news titled "{selectedNews.title}"?
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSubmit}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
