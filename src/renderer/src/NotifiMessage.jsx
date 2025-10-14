import React, { useEffect } from 'react'
import { IoCopySharp } from "react-icons/io5";
import { useTimer } from './hooks/useTimer';
import { motion, useAnimation } from "motion/react"

const NotifiMessage = () => {
  const { time, isRunning, start, reset, setZero } = useTimer(1.5)

  const animControl = useAnimation()

  useEffect(() => {
    window?.electronAPI?.onUpdateData((dados) => {
      console.log('Recebido:', dados);
    });

    console.log('aqui agora foi')
  }, [])


  return (
    <div className='border-r-0 bg-[#000] p-4 text-white relative flex flex-col gap-2 overflow-hidden'>


      <h3 className='flex flex-row items-center gap-1 font-medium text-[16px]'> <IoCopySharp />texto copiado </h3>
      <p className='text-[#c7c7c7] text-[14px] font-extralight line-clamp-2'>Lorem ipsum is a dummy text used in the design and publishing industry, originating from a scrambled passage of Cicero's work from the 15th century. It serves as a placeholder text in graphic design, web development, and publishing to focus attention on design elements rather than content. The text has been the industry's standard since the 1500s and remains widely used today. You can also generate "Lorem ipsum" text using various online tools.</p>

      <motion.div animate= className='absolute bg-green-500 w-full h-1 bottom-0 right-0 self-end scale-x-0'></motion.div>
    </div>
  )


}

export default NotifiMessage
