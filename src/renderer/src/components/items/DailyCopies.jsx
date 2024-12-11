import React from 'react'
import { FaRegFloppyDisk } from "react-icons/fa6";

const Items = ({ data }) => {
    return (
        <div className='bg-white rounded-[4px] m-1 px-4 py-2 flex justify-between items-center'>
            <p className='text-[12px] font-bold'>{data}</p>
            <button className='bg-white rounded-full p-[4px]'><FaRegFloppyDisk className='text-black text-[20px] font-bold' /></button>
        </div>
    )
}
const DailyCopies = ({ itensCopy }) => {
    console.log(itensCopy.length)
    return (
        itensCopy?.length > 0 ?

            <div className=' rounded-[4px]'>
                {itensCopy.map((itemProp, index) => <Items data={itemProp} key={itemProp + index} />)}
            </div>

            : <h1 className="flex items-center justify-center h-full text-center">Nada foi copiado.</h1>
    )
}

export default DailyCopies
