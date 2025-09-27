/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Modal from '../modal/ModalEdit';
import ModalDelete from '../modal/ModalDelete';

import { RiEdit2Fill } from 'react-icons/ri';
import { BsFillClipboard2Fill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";



const Items = ({ data, index, setItemInfo, setModal, setModalDelete }) => {

    return (
        <div className="bg-white rounded-[4px] mx-1 my-[6px] px-2 py-1 flex justify-stretch gap-[2px] items-center">
            {data?.shortcut !== "" ? <div className='mr-[2px] relative flex justify-center'>
                <BsFillClipboard2Fill className='text-black  text-[20px]' />
                <p className='font-semibold text-[12px] text-[#baf1b5] absolute mt-[2px]'>{data.shortcut.replace("alt+", "")}</p>
            </div> : null}

            <p className="text-[11px] font-bold mr-4 overflow-ellipsis line-clamp-2 break-words text-pretty w-full leading-[13px]">
                {data?.itemCopy}
            </p>

            <div className="flex flex-col items-center w-1/4 ">

                <div className='flex flex-row w-full justify-between px-[1px]'>
                    <button
                        onClick={() => {
                            setItemInfo({ i: index, data });
                            setModal(true);
                        }}
                        className="bg-white rounded-full "
                    >
                        <RiEdit2Fill className="text-black text-[20px] font-bold duration-150 bg-white hover:text-white hover:bg-black rounded-sm p-[2px]" />
                    </button>

                    <button
                        onClick={() => {
                            setItemInfo({ i: index, data });
                            setModalDelete(true);
                        }}>
                        <IoClose className="text-black duration-150 bg-white hover:text-white hover:bg-red-500 text-[20px] font-bold rounded-sm" />
                    </button>


                </div>
                <p className="text-[10px] font-bold bg-[#baf1b5] px-[4px] py-[1px] rounded-sm w-[52px] line-clamp-1 text-center overflow-ellipsis">
                    {data?.tag || '-'}
                </p>

            </div>

        </div>
    );
};

const CopiesSaved = ({ itensSaved, editLocal, deleteLocal }) => {
    const [modal, setModal] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [itemInfo, setItemInfo] = useState(null);
    const [inputSearch, setInputSearch] = useState('');

    // Filtrar itens com base no input
    const filteredItems = itensSaved?.filter(
        (item) =>
            item?.itemCopy.toLowerCase().includes(inputSearch.toLowerCase()) ||
            (item?.tag && item.tag.toLowerCase().includes(inputSearch.toLowerCase()))
    );

    return (
        <div>
            <div className="bg-white rounded-t-[4px] mx-1 my-[6px] p-2 flex items-center">
                <input
                    className="border-2 border-[#5c5c5c] focus:outline focus:outline-0 focus:border-[#8ee786] rounded-md w-full px-2 py-1 text-[14px] font-normal"
                    placeholder="Digite pelo texto ou tag"
                    value={inputSearch}
                    onChange={(e) => { setInputSearch(e.target.value) }}
                />
            </div>

            {itensSaved?.length > 0 ? (
                <div>
                    <Modal modal={modal} setModal={setModal} itemInfo={itemInfo} editLocal={editLocal} />

                    <ModalDelete modal={modalDelete} setModal={setModalDelete} itemInfo={itemInfo} deleteLocal={deleteLocal} />

                    {filteredItems.length > 0 ? (
                        filteredItems.map((itemProp, index) => (
                            <Items
                                data={itemProp}
                                index={index}
                                setItemInfo={setItemInfo}
                                setModal={setModal}
                                setModalDelete={setModalDelete}
                                key={`${itemProp.itemCopy}-${index}`}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Nenhum item encontrado.</p>
                    )}
                </div>
            ) : (
                <h1 className="flex items-center justify-center h-full text-center">Nada foi salvo.</h1>
            )}
        </div>
    );
};

export default CopiesSaved;
