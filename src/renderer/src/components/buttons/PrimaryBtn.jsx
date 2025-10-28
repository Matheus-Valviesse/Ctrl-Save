import React from 'react'

const PrimaryBtn = ({ selected, name, onClick }) => {
    return (
        <button
            data-select={name == selected}
            className="font-medium text-[12px] w-full bg-[#262626]  data-[select=true]:text-[#05cd55] text-[#9c9c9c] border-[#9c9c9c]  border-b-[1px] data-[select=true]:border-[#05cd55]"
            onClick={() => onClick(name)}
        >
            {name}
        </button>
    )
}

export default PrimaryBtn
