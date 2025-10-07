/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Modal from '../modal/ModalEdit';
import ModalDelete from '../modal/ModalDelete';

import Item from '../card/Item';


const CopiesSaved = ({ itensSaved, editLocal, deleteLocal }) => {
    const [modal, setModal] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [itemInfo, setItemInfo] = useState(null);
    const [inputSearch, setInputSearch] = useState('');

    // Filtrar itens com base no input
    const filteredItems = (Array.isArray(itensSaved) ? itensSaved : []).filter(
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

                    {filteredItems?.length > 0 ? (
                        filteredItems?.map((itemProp, index) => (
                            <Item
                                data={itemProp}
                                id={itemProp.id}
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
