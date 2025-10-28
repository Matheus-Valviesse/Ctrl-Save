import React from 'react'
import { RiEdit2Fill } from 'react-icons/ri';
import { BsFillClipboard2Fill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const Item = ({ data, id, setItemInfo, setModal, setModalDelete }) => {
  return (
    <div className="bg-[#fffffffe] rounded-[8px] m-2 p-[10px] gap-x-[2px] flex justify-stretch items-center cursor-pointer">
      {data?.shortcut !== "" ? <div className='mr-[2px] relative flex justify-center'>
        <BsFillClipboard2Fill className='text-black  text-[20px]' />
        <p className='font-semibold text-[12px] text-[#baf1b5] absolute mt-[2px]'>{data.shortcut.replace("alt+", "")}</p>
      </div> : null}

      <p className="text-[14px] font-normalmr-4 overflow-ellipsis line-clamp-2 break-words text-pretty w-full leading-[13px]">
        {data?.itemCopy}
      </p>

      <div className="flex flex-col items-center w-1/4 ">

        <div className='flex flex-row w-full justify-between px-[1px]'>
          <button
            onClick={() => {
              setItemInfo({ i: id, data });
              setModal(true);
            }}
            className="bg-white rounded-full "
          >
            <RiEdit2Fill className="text-black text-[20px] font-bold duration-150 bg-white hover:text-white hover:bg-black rounded-sm p-[2px]" />
          </button>

          <button
            onClick={() => {
              setItemInfo({ i: id, data });
              setModalDelete(true);
            }}>
            <IoClose className="text-black duration-150 bg-white hover:text-white hover:bg-red-500 text-[20px] font-bold rounded-sm" />
          </button>


        </div>
        <p className="text-[12px] font-normal bg-[#90f088] px-[4px] py-[1px] rounded-sm w-[60px] line-clamp-1 text-center overflow-ellipsis">
          {data?.tag || '-'}
        </p>

      </div>

    </div>
  );
}

export default Item
