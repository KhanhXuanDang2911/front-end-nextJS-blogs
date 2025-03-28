'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "antd";

export default function ContentOfComment({ initialText, updateComment, isEditing }: { initialText: any, isEditing: any,  updateComment: () => Promise<void> }) {
  const [text, setText] = useState(initialText);
  const [tempText, setTempText] = useState(initialText);
  const [isChanged, setIsChanged] = useState(false);

  const handleCancel = () => {
    setTempText(text);
    setIsChanged(false);
  };
  const handleSave = () => {
    updateComment()
    setText(tempText);
    setIsChanged(false);
  };

  return (
    <div className="flex items-start space-x-3 p-3">
      <div className="flex-1">
        {!isEditing ? (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-800">{text}</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.2 }}
          >
            <input
              type="text"
              className="w-full p-2 border-b outline-none focus:ring-0"
              value={tempText}
              onChange={(e) => {
                setTempText(e.target.value);
                setIsChanged(e.target.value.trim() !== text);
              }}
            />
            <div className="flex items-center justify-end space-x-2 mt-2">
              <Button size="small" onClick={handleCancel}>
                Hủy
              </Button>
              <Button size="small"
                type="primary"
                onClick={handleSave}
                className={` ${isChanged ? "text-white" : "text-gray-400 cursor-not-allowed"}`}
                disabled={!isChanged && text === ''}
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
