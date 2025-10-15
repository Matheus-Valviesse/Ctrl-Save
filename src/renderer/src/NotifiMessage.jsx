import React, { useEffect, useRef } from 'react'
import { IoCopySharp } from "react-icons/io5";
import { motion, useAnimation } from "framer-motion"

const NotifiMessage = () => {
  const animControl = useAnimation()
  const boxControl = useAnimation()
  const textControl = useAnimation()
  const textRef = useRef(null) // referência direta para o <p>

  let currentText = null // variável para comparar o texto atual

  const startAnimationBar = async () => {

    animControl.stop()
    await animControl.set({ scaleX: 1 })
    await animControl.start({
      scaleX: 0,
      transition: { duration: 2.3, ease: "easeInOut" },
    })
  }

  const resetAnimationBar = async () => {
    animControl.stop()
    await animControl.start({
      scaleX: 1,
      transition: { duration: 0.25, ease: "easeInOut" },
    })
  }

  const openAnimationNotifi = async () => {

    boxControl.stop()
    await boxControl.set({ x: 380 })
    await boxControl.start({
      x: 0,
      transition: { duration: 0.75, ease: "easeInOut" },
    })
  }
  const openAnimationNotifiReset = async () => {
    await boxControl.start({
      x: 0,
      transition: { duration: 0.25, ease: "easeInOut" },
    })
  }

  const closeAnimationNotifi = async () => {
    boxControl.stop()
    await boxControl.start({
      x: 380,
      transition: { duration: 0.75, ease: "easeInOut" },
    })
    currentText = null
    if (textRef.current) textRef.current.innerText = ""
  }

  const fadeAnimationText = async (novoTexto) => {
    textControl.stop()
    await textControl.start({ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } })

    // altera diretamente o texto no DOM
    if (textRef.current) textRef.current.innerText = novoTexto
    currentText = novoTexto

    await textControl.start({ opacity: 1, transition: { duration: 0.45, ease: "easeInOut", delay: 0.3 } })
  }

  const handleUpdate = async (dados) => {
    if (currentText) {
      if (dados === currentText) {
        // mesmo texto: só reinicia a barra
        await openAnimationNotifiReset()
        await resetAnimationBar()
        await startAnimationBar()
        await closeAnimationNotifi()
        return
      }

      // texto diferente: fade + barra
      await openAnimationNotifiReset()
      await resetAnimationBar()
      await fadeAnimationText(dados)
      await startAnimationBar()
      await closeAnimationNotifi()
      return
    }

    // primeira vez que aparece
    currentText = dados
    if (textRef.current) textRef.current.innerText = dados
    await openAnimationNotifi()
    await startAnimationBar()
    await closeAnimationNotifi()
  }

  useEffect(() => {
    window?.electronAPI?.onUpdateData((dados) => handleUpdate(dados))
  }, [])

  return (
    <div className='overflow-x-hidden relative scrollbar-none h-[110px] flex flex-col'>
      <motion.div
        animate={boxControl}
        className='border-r-0 bg-[#000] p-4 text-white absolute flex flex-col gap-2 overflow-hidden translate-x-[380px] w-full h-full scrollbar-none'
      >
        <h3 className='flex flex-row items-center gap-1 font-medium text-[16px]'>
          <IoCopySharp /> texto copiado
        </h3>

        <motion.p
          ref={textRef} // referência direta para alterar o texto
          animate={textControl}
          className='text-[#c7c7c7] text-[14px] font-extralight line-clamp-2'
        ></motion.p>

        <motion.div
          animate={animControl}
          className='absolute bg-green-500 w-full h-1 bottom-0 right-0 self-end scale-x-1 origin-right'
        ></motion.div>
      </motion.div>
    </div>
  )
}

export default NotifiMessage
