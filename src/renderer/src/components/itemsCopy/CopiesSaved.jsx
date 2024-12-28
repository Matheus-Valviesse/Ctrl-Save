/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { RiEdit2Fill } from 'react-icons/ri';
import Modal from '../modal/ModalEdit';

const Items = ({ data, index, setItemInfo, setModal }) => {
    return (
        <div className="bg-white rounded-[4px] mx-1 my-[6px] p-2 flex justify-stretch gap-[2px] items-center">
            <p className="text-[11px] font-bold mr-4 overflow-ellipsis line-clamp-2 break-words text-pretty w-full leading-[13px]">
                {data?.itemCopy}
            </p>

            <div className="flex flex-row items-center w-1/3">
                <p className="text-[10px] font-bold bg-[#baf1b5] px-[4px] py-[2px] rounded-sm w-[56px] line-clamp-1 text-center overflow-ellipsis">
                    {data?.tag || '-'}
                </p>

                <button
                    onClick={() => {
                        setItemInfo({ i: index, data });
                        setModal(true);
                    }}
                    className="bg-white rounded-full p-[4px]"
                >
                    <RiEdit2Fill className="text-black text-[18px] font-bold" />
                </button>
            </div>
        </div>
    );
};

const CopiesSaved = ({ itensSaved, editLocal }) => {
    const [modal, setModal] = useState(false);
    const [itemInfo, setItemInfo] = useState(null);
    const [inputSearch, setInputSearch] = useState('');

    // Filtrar itens com base no input
    const filteredItems = itensSaved?.filter(
        (item) =>
            item.itemCopy.toLowerCase().includes(inputSearch.toLowerCase()) ||
            (item.tag && item.tag.toLowerCase().includes(inputSearch.toLowerCase()))
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

                    {filteredItems.length > 0 ? (
                        filteredItems.map((itemProp, index) => (
                            <Items
                                data={itemProp}
                                index={index}
                                setItemInfo={setItemInfo}
                                setModal={setModal}
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
