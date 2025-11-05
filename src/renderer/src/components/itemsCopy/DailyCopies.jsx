import React, { useState } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { nanoid } from "nanoid";
import DailyCard from "../card/DailyCard";
// Componente do item


// Componente pai
const DailyCopies = ({ itensCopy = [] }) => {

    const [itens, setItens] = useState(itensCopy.map((item) => ({ id: nanoid(), value: item })));

    const removeItem = (itemToRemove) => {

        setItens((prev) => prev.filter((i) => i.id !== itemToRemove));
    };

    return (

        <div className="flex flex-col gap-2 p-2 relative ">
            <AnimatePresence>
                {itens.map((item) => (
                    <DailyCard key={item.id} data={item.value} onRemove={() => removeItem(item.id)} />
                ))}
            </AnimatePresence>

            {itens.length === 0 && (
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.45, duration: 0.2, ease: easeInOut } }}
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
