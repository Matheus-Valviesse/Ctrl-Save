import React, { useState } from 'react'
import PrimaryBtn from './buttons/PrimaryBtn'

const HeaderBtns = () => {
    const [btnSelect, setBtnSelect] = useState('CTRL+C Diarios')

    const handleClick = (name) => {
        setBtnSelect(name)
    }

    return (
        <div className='flex flex-row h-10 '>
            <PrimaryBtn selected={btnSelect} name={'CTRL+C Diarios'} onClick={handleClick} />
            <PrimaryBtn selected={btnSelect} name={'CTRL+C Salvos'} onClick={handleClick} />
        </div>
    )
}

export default HeaderBtns
