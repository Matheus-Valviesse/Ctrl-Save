import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nanoid } from "nanoid";
// Componente do item
const Item = ({ data, onRemove }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
                opacity: 0,
                scale: 0.9,
                height: 0,
                margin: 0,
                padding: 0,
                transition: { duration: 0.3, ease: "easeInOut" },
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-[#fffffffe] rounded-[8px] p-[10px] flex items-center cursor-pointer"
            onClick={() => onRemove(data)}
        >
            <p className="w-full text-[14px]">{data}</p>
        </motion.div>
    );
};

// Componente pai
const DailyCopies = ({ itensCopy = [] }) => {
    const [itens, setItens] = useState(itensCopy.map((item) => ({ id: nanoid(), value: item })));

    const removeItem = (itemToRemove) => {
        console.log(itemToRemove)
        setItens((prev) => prev.filter((i) => i.id !== itemToRemove));
    };

    return itens.length > 0 ? (
        <motion.div layout className="flex flex-col gap-2 p-2">
            <AnimatePresence>
                {itens.map((item) => (
                    <Item key={item.id} data={item.value} onRemove={() => removeItem(item.id)} />
                ))}
            </AnimatePresence>
        </motion.div>
    ) : (
        <h1 className="flex items-center justify-center h-full text-center">
            Nada foi copiado.
        </h1>
    );
};

export default DailyCopies;
