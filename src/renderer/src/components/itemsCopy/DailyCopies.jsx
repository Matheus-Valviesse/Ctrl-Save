import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { nanoid } from "nanoid";
import DailyCard from "../card/DailyCard";


const DailyCopies = ({ itensCopy = [], itemSave }) => {

    const [itens, setItens] = useState([]);

    const removeItem = (itemToRemove) => {

        setItens((prev) => prev.filter((i) => i.id !== itemToRemove));
    };

    useEffect(() => {
        setItens((prev) => {
            // Mantém os itens antigos
            const novos = itensCopy.map((valor) => {
                // Se já existia um item com esse valor, mantém o mesmo id
                const existente = prev.find((i) => i.value === valor);
                return existente ? existente : { id: nanoid(), value: valor };
            });
            return novos;
        });
    }, [itensCopy]);


    return (

        <div className="flex flex-col gap-2 p-2 relative ">
            <AnimatePresence>
                {itens.map((item) => (
                    <DailyCard key={item.id} data={item.value} onRemove={() => [itemSave(item.value), removeItem(item.id)]} />
                ))}
            </AnimatePresence>

            {itens.length === 0 && (
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.25, duration: 0.2, ease: easeInOut } }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center  h-[90vh]  text-center absolute inset-0 text-[22px] text-[#cfcfcf]"
                >
                    Nada foi copiado.
                </motion.h1>
            )}
        </div>


    )


};

export default DailyCopies;
