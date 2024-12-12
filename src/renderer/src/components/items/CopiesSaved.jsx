import React from 'react'
import { RiEdit2Fill } from "react-icons/ri";

const Items = ({ data }) => {
    return (
        <div className="bg-white rounded-[4px] m-1 px-4 py-2 flex justify-between items-center">
            <p className="text-[12px] font-bold mr-1">{data.itemCopy}</p>
            <button className="bg-white rounded-full p-[4px]">
                <RiEdit2Fill className="text-black text-[20px] font-bold" />
            </button>
        </div>
    )
}

const CopiesSaved = ({ itensSaved }) => {
    console.log(itensSaved.length)
    return itensSaved?.length > 0 ? (
        <div className=" rounded-[4px]">
            {itensSaved.map((itemProp, index) => (
                <Items data={itemProp} key={itemProp.itemCopy + index} />
            ))}
        </div>
    ) : (
        <h1 className="flex items-center justify-center h-full text-center">Nada foi salvo.</h1>
    )
}

export default CopiesSaved
