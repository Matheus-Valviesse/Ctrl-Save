import React, { useEffect, useState } from 'react'
import HeaderBtns from './components/HeaderBtns'
import DailyCopies from './components/itemsCopy/DailyCopies'
import CopiesSaved from './components/itemsCopy/CopiesSaved'

function App() {

  const [textCopy, setTextCopy] = useState([])
  const [textSaved, setTextSaved] = useState(getLocal())

  const [btnSelect, setBtnSelect] = useState('CTRL+C Diarios')

  // Objeto para renderizar os components
  const copyPage = {
    'CTRL+C Diarios': <DailyCopies itensCopy={textCopy} itemSave={saveLocal} />,
    'CTRL+C Salvos': <CopiesSaved itensSaved={textSaved} editLocal={editLocal} />
  }

  const keyBindings = [
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
    const newArr = [...textSaved, { itemCopy: item, tag: '', shortcut: '' }]
    setTextSaved(newArr)
    localStorage.setItem('copySaved', JSON.stringify(newArr))
  }

  function editLocal(i, item) {

    if (textSaved[i]) {

      textSaved[i].itemCopy = item.itemCopy
      textSaved[i].tag = item.tag
      textSaved[i].shortcut = item.shortcut
    }

    localStorage.setItem('copySaved', JSON.stringify(textSaved))
  }

  useEffect(() => {
    // Escutando a mensagem exposta pelo preload
    window?.electronAPI?.onTextCopy((event, message) => {
      setTextCopy((prevTextCopy) => [...prevTextCopy, message]) // Exibe a mensagem do backend no console do frontend
    })
  }, [])

  return (
    <div className=" h-screen bg-[#d1d1d1] flex flex-col">
      <HeaderBtns btnSelect={btnSelect} setBtnSelect={setBtnSelect} />
      <div className='h-full'>
        {copyPage[btnSelect]}
      </div>

    </div>
  )
}

export default App
