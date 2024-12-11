import React, { useEffect, useState } from 'react'
import HeaderBtns from './components/HeaderBtns'
import DailyCopies from './components/items/DailyCopies'

function App() {
  const [textCopy, setTextCopy] = useState([])

  useEffect(() => {
    // Escutando a mensagem exposta pelo preload
    window?.electronAPI?.onTextCopy((event, message) => {
      setTextCopy((prevTextCopy) => [...prevTextCopy, message]) // Exibe a mensagem do backend no console do frontend
    })
  }, [])

  return (
    <div className=" h-screen bg-[#e6e6e6] flex flex-col">
      <HeaderBtns />
      <div className='h-full'>
        <DailyCopies itensCopy={textCopy} />
      </div>

    </div>
  )
}

export default App
