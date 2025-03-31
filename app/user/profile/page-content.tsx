"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { Input, Form, Upload, Button as ButtonAntd, message } from "antd"
import { UploadOutlined } from "@ant-design/icons";
import { deleteUser, updateUser } from "@/service/userService"

export default function ProfilePageContent({ usersEdit }: { usersEdit: any }) {
  console.log(usersEdit)
  const [messageApi, contextHolder] = message.useMessage();

  const [formEdit] = Form.useForm();

  const [formChangePassword] = Form.useForm();

  const [fileList, setFileList] = useState([]);

  const [loading, setLoading] = useState<boolean>(false)

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const handleEditSubmit = async () => {
    try {
      setLoading(true)
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
    } finally {
      setLoading(false)
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await deleteUser(usersEdit.Id)
      if (res.status === 205) {
        messageApi.open({
          type: 'success',
          content: `Delete user ${usersEdit.username} successful`,
        });
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

  return (
    <div>
      {contextHolder}

      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <Form
                form={formEdit}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                initialValues={usersEdit}
                style={{ maxWidth: 1000, marginTop: 13 }}
              >
                {/* Id */}
                <Form.Item

                  label="Id"
                  name="id"
                  rules={[{ required: true }]}
                >
                  <Input readOnly />
                </Form.Item>

                {/* Username */}
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true }]}
                >
                  <Input readOnly />
                </Form.Item>

                {/* Name */}
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please enter your name!" }]}
                >
                  <Input maxLength={45} placeholder="Enter your name..." />
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
                  <Input readOnly placeholder="Enter email..." />
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
                {usersEdit?.avatar ? '' :

                  <Form.Item label="Avatar" name="avatar">
                    <Upload
                      beforeUpload={() => false}
                      listType="picture"
                      fileList={fileList}
                      onChange={handleUploadChange}
                      maxCount={1}
                      accept="image/*"
                    >
                      <ButtonAntd icon={<UploadOutlined />}>Upload Avatar</ButtonAntd>
                    </Upload>
                  </Form.Item>}
              </Form>
            </CardContent>
            <CardFooter style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <ButtonAntd
                onClick={handleEditSubmit}
                disabled={loading}
                type="primary"
                className="mr-5 mb-5"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Edit...
                  </>
                ) : (
                  "Save User"
                )}
              </ButtonAntd>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent>
              <Form
                form={formChangePassword}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                style={{ maxWidth: 1000, marginTop: 13 }}
              >

                {/* Password */}
                <Form.Item
                  label="Password"
                  name="password"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Please enter current password!" },
                    { min: 6, message: "Password must be at least 6 characters!" },
                  ]}
                >
                  <Input.Password maxLength={45} placeholder="Enter the password..." />
                </Form.Item>
                {/* New Password */}
                <Form.Item
                  label="New password"
                  name="new-password"
                  rules={[
                    { required: true, message: "Please enter new password!" },
                    { min: 6, message: "Password must be at least 6 characters!" },
                  ]}
                >
                  <Input.Password maxLength={45} placeholder="Enter new password..." />
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
                        if (!value || getFieldValue("new-password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Passwords do not match!"));
                      },
                    }),
                    { min: 6, message: "Password must be at least 6 characters!" },
                  ]}
                >
                  <Input.Password maxLength={45} placeholder="Re-enter password..." />
                </Form.Item>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-row-reverse">
                  <ButtonAntd type="primary">Change Password</ButtonAntd>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Account Information</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Email: {usersEdit.email}</p>
                  {/* <p>Member since: January 2023</p> */}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

