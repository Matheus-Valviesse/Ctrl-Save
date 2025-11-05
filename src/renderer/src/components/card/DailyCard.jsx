import React from 'react'
import { motion } from "framer-motion";

const DailyCard = ({ data, onRemove }) => {
  return (

    <motion.div
      layout
      whileHover={{ scale: 0.95, transition: { duration: 0.2, ease: "easeInOut" } }}
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        scale: 0,
        height: 0,
        margin: 0,
        padding: 0,
        transition: { delay: 0.3, duration: 0.3, ease: "easeInOut" },
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden bg-[#333833] rounded-[8px] p-[10px] flex items-center cursor-pointer"
      onClick={() => onRemove(data)}
    >
      <motion.div className="flex flex-row" exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }}>
        <p className="w-full text-[14px] text-[#ddf1dd]">{data}</p>
      </motion.div>
    </motion.div>
  )
};

export default DailyCard