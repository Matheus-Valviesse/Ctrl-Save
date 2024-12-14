/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { RiEdit2Fill } from "react-icons/ri";
import Modal from '../modal/ModalEdit';

const Items = ({ data, index, setItemInfo, setModal }) => {
    return (
        <div className="bg-white rounded-[4px] mx-1 my-[6px] p-2 flex justify-stretch gap-[2px] items-center">
            <p className="text-[11px] font-bold mr-4 overflow-ellipsis line-clamp-2 break-words text-pretty w-full leading-[13px] ">{data?.itemCopy}</p>

            <div className='flex flex-row items-center w-1/3'>
                <p className="text-[10px] font-bold bg-[#baf1b5] px-[4px] py-[2px] rounded-sm w-[56px] line-clamp-1 text-center overflow-ellipsis">{data?.tag ? data?.tag : '-'}</p>

                <button onClick={() => [setItemInfo({ i: index, data: data }), setModal(true)]} className="bg-white rounded-full p-[4px]">
                    <RiEdit2Fill className="text-black text-[18px] font-bold" />
                </button>
            </div >

        </div >
    )
}

const CopiesSaved = ({ itensSaved, editLocal }) => {
    const [modal, setModal] = useState(false)
    const [itemInfo, setItemInfo] = useState(null)

    return itensSaved?.length > 0 ? (
        <div className=" rounded-[4px]">
            <Modal modal={modal} setModal={setModal} itemInfo={itemInfo} editLocal={editLocal} />
            {itensSaved.map((itemProp, index) => (
                <Items data={itemProp} index={index} setItemInfo={setItemInfo} setModal={setModal} key={itemProp.itemCopy + index} />
            ))}
        </div>
    ) : (
        <h1 className="flex items-center justify-center h-full text-center">Nada foi salvo.</h1>
    )
}

export default CopiesSaved
