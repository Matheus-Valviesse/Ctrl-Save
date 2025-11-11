import React from 'react'
import { RiEdit2Fill } from 'react-icons/ri';
import { BsFillClipboard2Fill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { motion } from 'motion/react';

const Item = ({ data, id, setItemInfo, setModal, setModalDelete }) => {
  return (
    <motion.div
      layout
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
      className="bg-[#333833] rounded-[8px] m-2 p-[10px] gap-x-[2px] flex justify-stretch items-center cursor-pointer">
      {data?.shortcut !== "" ? <div className='mr-[2px] relative flex justify-center'>
        <BsFillClipboard2Fill className='text-[#90f088]  text-[20px]' />
        <p className='font-semibold text-[12px] text-[#333833] absolute mt-[2px]'>{data.shortcut.replace("alt+", "")}</p>
      </div> : null}

      <p className="text-[14px] text-[#ddf1dd] font-normalmr-4 overflow-ellipsis line-clamp-2 break-words text-pretty w-full leading-[13px]">
        {data?.itemCopy}
      </p>

      <div className="flex flex-col items-center w-1/4 gap-[4px]">

        <div className='flex flex-row w-full justify-between px-[1px] text-[#ddf1dd]'>
          <button
            onClick={() => {
              setItemInfo({ i: id, data });
              setModal(true);
            }}
            className=" rounded-full "
          >
            <RiEdit2Fill className=" text-[20px]  font-bold duration-150  hover:text-[#333833] hover:bg-[#ddf1dd] rounded-sm p-[2px] " />
          </button>

          <button
            onClick={() => {
              setItemInfo({ i: id, data });
              setModalDelete(true);
            }}>
            <IoClose className=" duration-150  hover:text-white hover:bg-red-500 text-[20px] font-bold rounded-sm" />
          </button>


        </div>

        <p className="text-[12px] text-[#90f088] font-normal border-[1px] border-[#90f088] px-[4px] py-[1px] rounded-sm w-[60px] line-clamp-1 text-center overflow-ellipsis">
          {data?.tag || '-'}
        </p>

      </div>

    </motion.div>
  );
}

export default Item
