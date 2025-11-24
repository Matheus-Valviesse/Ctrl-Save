import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const ModalDelete = ({ modal, setModal, itemInfo, deleteLocal }) => {

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 text-[#ddf1dd] bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setModal(false)}
        >
          <motion.div
            key="modal-box"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        
            className='bg-[#333833] w-[80vw] h-[12rem] rounded relative overflow-hidden'

       
            style={{ willChange: 'transform' }}

            onClick={(e) => e.stopPropagation()}
          >

         
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="w-full h-full px-4 py-6 flex flex-col justify-between"
            >
              <div className='flex absolute top-0 right-0 mr-2 mt-2'>
                <button onClick={() => setModal(false)}>
                  <IoCloseSharp className="text-[24px] font-bold" />
                </button>
              </div>

              <div className='flex flex-col gap-1'>
                <h1 className='text-[16px]'>Deseja deletar o seguinte item:</h1>

                <p className="font-bold text-[14px] line-clamp-2 break-words">
                  {itemInfo?.data?.itemCopy}
                </p>
              </div>

              <div className='flex flex-row justify-between w-full'>
                <button
                  className='text-[14px] px-3 py-[1px] border-[2px] border-red-600 text-red-600 rounded font-semibold'
                  onClick={() => { deleteLocal(itemInfo.i); setModal(false); }}
                >
                  Deletar
                </button>
                <button
                  className='text-[14px] px-3 py-[1px] border-[2px] border-black text-black rounded font-semibold'
                  onClick={() => setModal(false)}
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ModalDelete