/* eslint-disable react/prop-types */
import React from 'react'
import { FaRegFloppyDisk } from 'react-icons/fa6'

const Items = ({ data, itemSave }) => {
    return (
        <div className="bg-white rounded-[4px] m-1 p-2 gap-x-[2px] flex justify-stretch items-center">
            <p className="text-[12px] font-bold mr-1 w-full line-clamp-3 overflow-ellipsis" >{data}</p>
            <button onClick={() => itemSave(data)} className="bg-white rounded-full p-[4px] w-1/8">
                <FaRegFloppyDisk className="text-black text-[20px] font-bold" />
            </button>
        </div>
    )
}
const DailyCopies = ({ itensCopy, itemSave }) => {

    return itensCopy?.length > 0 ? (
        <div className=" rounded-[4px]">
            {itensCopy.map((itemProp, index) => (
                <Items data={itemProp} key={itemProp + index} itemSave={itemSave} />
            ))}
        </div>
    ) : (
        <h1 className="flex items-center justify-center h-full text-center">Nada foi copiado.</h1>
    )
}

export default DailyCopies
