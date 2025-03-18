// import { Form, Input, Select, Button, Upload } from "antd";
// import { useState } from "react";
// import { UploadOutlined } from "@ant-design/icons";

// const { Option } = Select;

// const AddUserForm = ({ onSubmit }: { onSubmit: (values: any) => void }) => {
//     const [form] = Form.useForm();
//     const [fileList, setFileList] = useState([]);

//     const handleUploadChange = ({ fileList }: any) => {
//         setFileList(fileList);
//     };

//     return (<>
//         <DialogHeader>
//             <DialogTitle className="text-xl">Add New User</DialogTitle>
//             {/* <DialogDescription>
//                 Create a new user account. Fill in the details below and click save when you're done.
//             </DialogDescription> */}
//         </DialogHeader>
//         <Form
//             form={form}
//             labelCol={{ span: 6 }}
//             wrapperCol={{ span: 16 }}
//             layout="horizontal"
//             initialValues={{ is_active: true }}
//             onFinish={onSubmit}
//             style={{ maxWidth: 600 }}
//         >
//             {/* Username */}
//             <Form.Item
//                 label="Username"
//                 name="username"
//                 rules={[{ required: true, message: "Please enter a username!" }]}
//             >
//                 <Input maxLength={20} placeholder="Enter username..." />
//             </Form.Item>

//             {/* Password */}
//             <Form.Item
//                 label="Password"
//                 name="password"
//                 rules={[
//                     { required: true, message: "Please enter a password!" },
//                     { min: 6, message: "Password must be at least 6 characters!" },
//                 ]}
//             >
//                 <Input.Password maxLength={45} placeholder="Enter password..." />
//             </Form.Item>

//             {/* Confirm Password */}
//             <Form.Item
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 dependencies={["password"]}
//                 rules={[
//                     { required: true, message: "Please confirm your password!" },
//                     ({ getFieldValue }) => ({
//                         validator(_, value) {
//                             if (!value || getFieldValue("password") === value) {
//                                 return Promise.resolve();
//                             }
//                             return Promise.reject(new Error("Passwords do not match!"));
//                         },
//                     }),
//                 ]}
//             >
//                 <Input.Password maxLength={45} placeholder="Re-enter password..." />
//             </Form.Item>

//             {/* Name */}
//             <Form.Item
//                 label="Name"
//                 name="name"
//                 rules={[{ required: true, message: "Please enter your name!" }]}
//             >
//                 <Input maxLength={45} placeholder="Enter your name..." />
//             </Form.Item>

//             {/* Role */}
//             <Form.Item
//                 label="Role"
//                 name="role"
//                 rules={[{ required: true, message: "Please select a role!" }]}
//             >
//                 <Select placeholder="Select role">
//                     <Option value="admin">Admin</Option>
//                     <Option value="user">User</Option>
//                 </Select>
//             </Form.Item>

//             {/* Email */}
//             <Form.Item
//                 label="Email"
//                 name="email"
//                 rules={[
//                     { required: true, message: "Please enter an email!" },
//                     { type: "email", message: "Invalid email format!" },
//                 ]}
//             >
//                 <Input placeholder="Enter email..." />
//             </Form.Item>

//             {/* Phone */}
//             <Form.Item
//                 label="Phone"
//                 name="phone"
//                 rules={[
//                     { required: true, message: "Please enter a phone number!" },
//                     { pattern: /^[0-9]{10,11}$/, message: "Phone number must be 10-11 digits!" },
//                 ]}
//             >
//                 <Input maxLength={11} placeholder="Enter phone number..." />
//             </Form.Item>

//             {/* Avatar Upload */}
//             <Form.Item label="Avatar" name="avatar">
//                 <Upload
//                     beforeUpload={() => false} // Không upload ngay lập tức
//                     listType="picture"
//                     fileList={fileList}
//                     onChange={handleUploadChange}
//                     maxCount={1}
//                     accept="image/*" // Chỉ cho phép chọn ảnh
//                 >
//                     <Button icon={<UploadOutlined />}>Upload Avatar</Button>
//                 </Upload>
//             </Form.Item>

//             {/* Submit Button */}
//             <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
//                 <Button type="primary" htmlType="submit">
//                     Add User
//                 </Button>
//             </Form.Item>
//         </Form>
//         <DialogFooter className="flex space-x-2 justify-end">
//             <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
//                 Cancel
//             </Button>
//             <Button
//                 type="submit"
//                 onClick={handleAddSubmit}
//                 disabled={loading}
//                 className="bg-gradient-to-r from-brand-blue to-brand-purple text-white"
//             >
//                 {loading ? (
//                     <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Creating...
//                     </>
//                 ) : (
//                     "Save User"
//                 )}
//             </Button>
//         </DialogFooter>
//     </>
//     );
// };

// export default AddUserForm;
