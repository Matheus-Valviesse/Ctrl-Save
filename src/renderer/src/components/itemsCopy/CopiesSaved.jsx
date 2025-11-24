/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Modal from '../modal/ModalEdit';
import ModalDelete from '../modal/ModalDelete';

import Item from '../card/Item';
import { motion, AnimatePresence } from 'motion/react';


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
        <div className='overflow-hidden flex flex-col relative h-full'>
            <div className="bg-[#262626] rounded-t-[4px] mx-1 my-[6px] p-1 flex items-center">
                <input
                    className="border-2 border-[#5c5c5c] bg-[#333833] focus:outline focus:outline-0 focus:border-[#8ee786] rounded-md w-full px-2 py-1 text-[14px] font-normal text-[#ddf1dd]"
                    placeholder="Digite pelo texto ou tag"
                    value={inputSearch}
                    onChange={(e) => { setInputSearch(e.target.value) }}
                />
            </div>
            <AnimatePresence>
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
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.45, duration: 0.2, ease: 'easeInOut' } }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center h-full text-center  inset-0 text-[22px] text-[#cfcfcf] "
                    >
                        Nada foi salvo.
                    </motion.h1>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CopiesSaved;
