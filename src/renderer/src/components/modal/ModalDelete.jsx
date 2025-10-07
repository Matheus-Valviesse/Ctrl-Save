/* eslint-disable react/prop-types */
import React from 'react'
import { IoCloseSharp } from "react-icons/io5";

const ModalDelete = ({ modal, setModal, itemInfo, deleteLocal }) => {

  if (modal === false) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 ">

      <div className='bg-white w-[80vw] h-[12rem] rounded px-4 py-6 relative flex flex-col justify-between'>


        <div className=' flex absolute top-0 right-0 mr-2 mt-2'>
          <button onClick={() => setModal(false)}>
            <IoCloseSharp className="text-black text-[24px] font-bold" />
          </button>
        </div>

        <div className='flex flex-col gap-1'>
          <h1 className='text-[16px]'>Deseja deletar o seguinte item:</h1>

          <p className="font-bold text-[14px] line-clamp-2 break-words">
            {itemInfo.data.itemCopy}
          </p>
        </div>

        <div className='flex flex-row justify-between w-full'>
          <button className='text-[14px] px-3 py-[1px] border-[2px] border-red-600 text-red-600 rounded font-semibold' onClick={() => { deleteLocal(itemInfo.i), setModal(false) }}>Deletar</button>
          <button className='text-[14px] px-3 py-[1px] border-[2px] border-black rounded font-semibold' onClick={() => setModal(false)}>Fechar</button>
        </div>
      </div>

    </div>
  )
}

export default ModalDelete
