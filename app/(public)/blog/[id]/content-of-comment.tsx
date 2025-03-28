'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { Button, message } from "antd";

export default function ContentOfComment({ initialText, handleUpdateComment, isEditing, id, setIsEditing }:
  {
    initialText: any, isEditing: any,
    handleUpdateComment: (id: any, content: any) => Promise<boolean>, id: any,
    setIsEditing: (isEdit: boolean) => void
  }) {

  const [tempText, setTempText] = useState(initialText);
  const [isChanged, setIsChanged] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleCancel = () => {
    setIsChanged(false);
    setIsEditing(false)
  };

  const handleSave = async () => {
    const isSuccess = await handleUpdateComment(id, tempText)
    if (isSuccess) {
      setIsChanged(false);
      setIsEditing(false)
      return
    }
    messageApi.open({
      type: 'error',
      content: 'Update comment failed!',
    });
  };

  return (
    <div className="flex items-start space-x-3">
      {contextHolder}
      <div className="flex-1">
        {!isEditing ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-800">{initialText}</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="text"
              className="w-full pb-2 border-b outline-none focus:ring-0"
              value={tempText}
              onChange={(e) => {
                setTempText(e.target.value);
                setIsChanged(e.target.value.trim() !== initialText);
              }}
            />
            <div className="flex items-center justify-end space-x-2 mt-2">
              <Button size="small" onClick={handleCancel}>
                Hủy
              </Button>
              <Button size="small"
                onClick={handleSave}
                type={`${isChanged ? "primary" : "default"}`}
                className={` ${isChanged ? "text-white" : "text-gray-400 cursor-not-allowed"}`}
                disabled={!isChanged && tempText === ''}
              >
                Lưu
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
