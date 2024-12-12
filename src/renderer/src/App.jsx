import React, { useEffect, useState } from 'react'
import HeaderBtns from './components/HeaderBtns'
import DailyCopies from './components/items/DailyCopies'
import CopiesSaved from './components/items/CopiesSaved'

function App() {

  const [textCopy, setTextCopy] = useState([])
  const [textSaved, setTextSaved] = useState(getLocal())

  const [btnSelect, setBtnSelect] = useState('CTRL+C Diarios')

  // Objeto para renderizar os components
  const copyPage = {
    'CTRL+C Diarios': <DailyCopies itensCopy={textCopy} itemSave={saveLocal} />,
    'CTRL+C Salvos': <CopiesSaved itensSaved={textSaved} />
  }

  // função para receber os dados salvos
  function getLocal() {
    const arr = JSON.parse(localStorage.getItem('copySaved'))

    if (arr === null) {
      return []
    } else {
      return arr
    }
  }

  function saveLocal(item) {
    const newArr = [...textSaved, { itemCopy: item, tag: '' }]
    setTextSaved(newArr)
    localStorage.setItem('copySaved', JSON.stringify(newArr))
  }

  useEffect(() => {
    // Escutando a mensagem exposta pelo preload
    window?.electronAPI?.onTextCopy((event, message) => {
      setTextCopy((prevTextCopy) => [...prevTextCopy, message]) // Exibe a mensagem do backend no console do frontend
    })
  }, [])

  return (
    <div className=" h-screen bg-[#e6e6e6] flex flex-col">
      <HeaderBtns btnSelect={btnSelect} setBtnSelect={setBtnSelect} />
      <div className='h-full'>
        {copyPage[btnSelect]}
      </div>

    </div>
  )
}

export default App
