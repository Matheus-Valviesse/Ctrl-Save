/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";
// 1. Importamos os componentes do framer-motion
import { motion, AnimatePresence } from "framer-motion";

function Modal({ modal, setModal, itemInfo, editLocal }) {

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

    // Removi o "if (modal === false) return null" daqui para permitir a animação de saída (exit)
    // A lógica agora fica dentro do AnimatePresence abaixo

    return (
        <AnimatePresence>
            {modal && (
                <motion.div
                    key="modal-backdrop"
                    // ANIMAÇÃO DO FUNDO PRETO
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }} // Fundo demora um pouco para aparecer
                    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                    onClick={() => setModal(false)} // Opcional: Fechar ao clicar fora
                >
                    <motion.div
                        key="modal-box"
                        // ANIMAÇÃO DO BOX (SCALE)
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }} // Rápido mas suave
                        className="bg-[#333833] w-[270px] rounded shadow-lg px-4 py-4 flex flex-col gap-2 relative text-[#ddf1dd]"
                        onClick={(e) => e.stopPropagation()} // Impede que o clique no modal feche ele (se tiver clique no fundo)
                    >
                        {/* Botão de fechar */}
                        <div className='flex absolute top-0 right-0 mr-2 mt-2'>
                            <button onClick={() => setModal(false)}>
                                <IoCloseSharp className="text-[24px] text-[#ddf1dd] font-bold" />
                            </button>
                        </div>

                        {/* ANIMAÇÃO DO CONTEÚDO 
                            Aqui está o segredo: delay de 0.3s (igual ao tempo do scale acima)
                        */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.3 }}
                        >
                            <label className='flex flex-col mt-4'>
                                Texto copiado
                                <textarea
                                    value={copyValue}
                                    onChange={(e) => setCopyValue(e.target.value)}
                                    className="border-2 rounded-md w-full h-[100px] px-2 py-1 resize-none bg-transparent text-[14px] text-[#ddf1dd98]"
                                    style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
                                />
                            </label>

                            <div className="flex flex-row w-full gap-4">
                                <label className="flex flex-col w-1/2 justify-between">
                                    Tag para pesquisa rapida
                                    <input
                                        value={tagValue}
                                        onChange={(e) => setTagValue(e.target.value)}
                                        className="border-2 rounded-md w-full px-1 h-7 bg-transparent text-[14px] text-[#ddf1dd98]"
                                    />
                                </label>

                                <label className="flex flex-col w-1/2 justify-between">
                                    Tecla de copia via atalho
                                    <select
                                        className="border-2 rounded-md w-full px-1 h-7 bg-transparent text-[14px] text-[#ddf1dd6a]"
                                        value={selectedKey}
                                        onChange={(e) => setSelectedKey(e.target.value)}
                                    >
                                        {keyBindings.filter(key => !key.assigned).map(key => (
                                            <option className='bg-[#4c4c4c] text-[#e3e2e2]' key={key.key} value={key.key === 'Nenhuma' ? "" : key.key}>
                                                {key.key}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className='mt-4 w-full flex items-center justify-center'>
                                <button className='bg-[#66ae5f] text-white rounded-md px-4 py-[0.2rem] text-[18px]' onClick={() => { editLocal(itemInfo.i, { itemCopy: copyValue, tag: tagValue, shortcut: selectedKey }), setModal(false) }}>salvar</button>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Modal;