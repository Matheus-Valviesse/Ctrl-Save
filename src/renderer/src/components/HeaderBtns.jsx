/* eslint-disable react/prop-types */
import React from 'react'
import PrimaryBtn from './buttons/PrimaryBtn'

const HeaderBtns = ({ btnSelect, setBtnSelect }) => {


    const handleClick = (name) => {
        setBtnSelect(name)
    }

    return (
        <div className='flex flex-row h-[30px] max-h-full bg-red-600 '>
            <PrimaryBtn selected={btnSelect} name={'CTRL+C Diarios'} onClick={handleClick} />
            <PrimaryBtn selected={btnSelect} name={'CTRL+C Salvos'} onClick={handleClick} />
        </div>
    )
}

export default HeaderBtns
