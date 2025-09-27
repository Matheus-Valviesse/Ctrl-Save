/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";

function Modal({ modal, setModal, itemInfo, editLocal }) {
    console.log(itemInfo);

    const [selectedKey, setSelectedKey] = useState('');
    const [copyValue, setCopyValue] = useState('');
    const [tagValue, setTagValue] = useState('');

    useEffect(() => {
        if (itemInfo?.data) {
            setSelectedKey(itemInfo.data.shortcut || '');
            setCopyValue(itemInfo.data.itemCopy || '');
            setTagValue(itemInfo.data.tag || '');
        }
    }, [itemInfo]);

    const keyBindings = [
        { key: 'Nenhuma', assigned: '' },
        { key: 'alt+0', assigned: false },
        { key: 'alt+1', assigned: false },
        { key: 'alt+2', assigned: false },
        { key: 'alt+3', assigned: false },
        { key: 'alt+4', assigned: false },
        { key: 'alt+5', assigned: false },
        { key: 'alt+6', assigned: false },
        { key: 'alt+7', assigned: false },
        { key: 'alt+8', assigned: false },
        { key: 'alt+9', assigned: false }
    ];

    if (modal === false) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 ">
            <div className="bg-white w-[270px]  rounded shadow-lg px-4 py-4 flex flex-col gap-2 relative">
                <div className=' flex  absolute top-0 right-0 mr-2 mt-2'>
                    <button onClick={() => setModal(false)}>
                        <IoCloseSharp className="text-black text-[24px] font-bold" />
                    </button>
                </div>

                <label className='flex flex-col mt-4'>
                    Texto copiado
                    <textarea
                        value={copyValue}
                        onChange={(e) => setCopyValue(e.target.value)}
                        className="border-2 rounded-md w-full h-[100px] px-2 py-1 resize-none bg-[#fafafa]"
                        style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
                    />
                </label>

                <div className="flex flex-row w-full gap-4">
                    <label className="flex flex-col w-1/2 justify-between">
                        Tag para pesquisa rapida
                        <input
                            value={tagValue}
                            onChange={(e) => setTagValue(e.target.value)}
                            className="border-2 rounded-md w-full px-1 h-7"
                        />
                    </label>

                    <label className="flex flex-col w-1/2 justify-between">
                        Tecla de copia via atalho
                        <select
                            className="border-2 rounded-md w-full px-1 h-7"
                            value={selectedKey}
                            onChange={(e) => setSelectedKey(e.target.value)}
                        >
                            {keyBindings.filter(key => !key.assigned).map(key => (
                                <option key={key.key} value={key.key == 'Nenhuma' ? "" : key.key}>
                                    {key.key}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className='mt-4 w-full flex items-center justify-center'>
                    <button className='bg-black text-white rounded-md px-4 py-[0.2rem] text-[18px]' onClick={() => { editLocal(itemInfo.i, { itemCopy: copyValue, tag: tagValue, shortcut: selectedKey }), setModal(false) }}>salvar</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
