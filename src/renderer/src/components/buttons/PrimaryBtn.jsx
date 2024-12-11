import React from 'react'

const PrimaryBtn = ({ selected, name, onClick }) => {
    return (
        <button
            data-select={name == selected}
            className="font-medium text-[12px] w-full bg-white data-[select=true]:bg-black data-[select=true]:text-[#a5ff82] border-white border-b-[4px] data-[select=true]:border-[#a5ff82]"
            onClick={() => onClick(name)}
        >
            {name}
        </button>
    )
}

export default PrimaryBtn
