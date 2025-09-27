import React, { useEffect, useState } from 'react'
import HeaderBtns from './components/HeaderBtns'
import DailyCopies from './components/itemsCopy/DailyCopies'
import CopiesSaved from './components/itemsCopy/CopiesSaved'

function App() {

  const [textCopy, setTextCopy] = useState([])
  const [textSaved, setTextSaved] = useState(getLocal())
  const [keysSaved, setKeysSaved] = useState(getKeys())
  const [btnSelect, setBtnSelect] = useState('CTRL+C Diarios')

  // Objeto para renderizar os components
  const copyPage = {
    'CTRL+C Diarios': <DailyCopies itensCopy={textCopy} itemSave={saveLocal} />,
    'CTRL+C Salvos': <CopiesSaved itensSaved={textSaved} editLocal={editLocal} deleteLocal={deleteLocal} />
  }

  function getKeys() {
    const arr = JSON.parse(localStorage.getItem('keySaved'))

    if (arr === null) {
      return [
        { key: 'alt+1', assigned: false },
        { key: 'alt+2', assigned: false },
        { key: 'alt+3', assigned: false },
        { key: 'alt+4', assigned: false },
        { key: 'alt+5', assigned: false },
        { key: 'alt+6', assigned: false },
        { key: 'alt+7', assigned: false },
        { key: 'alt+8', assigned: false },
        { key: 'alt+9', assigned: false },
        { key: 'alt+0', assigned: false }
      ];
    }
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
    const newArr = [...textSaved, { itemCopy: item, tag: '', shortcut: '' }]
    setTextSaved(newArr)
    localStorage.setItem('copySaved', JSON.stringify(newArr))
  }

  function editLocal(i, item) {

    if (textSaved[i]) {

      const updatedArr = [...textSaved];

      // Atualiza o array, limpando o atalho correspondente
      updatedArr.forEach((itemSaved) => {
        if (itemSaved.shortcut === item.shortcut) {
          itemSaved.shortcut = ""; // Limpa o atalho
        }
      });

      updatedArr[i] = {
        ...updatedArr[i], // Garante que você está atualizando apenas o índice correto
        itemCopy: item.itemCopy,
        tag: item.tag,
        shortcut: item.shortcut,
      };

      setTextSaved(updatedArr)
      localStorage.setItem('copySaved', JSON.stringify(updatedArr))
    }

  }

  function deleteLocal(i) {
    console.log(i)
    if (i < 0 || i >= textSaved.length) return console.log('item invalido'); // índice inválido

    const updatedArr = textSaved.filter((_, index) => index !== i);

    setTextSaved(updatedArr);
    localStorage.setItem('copySaved', JSON.stringify(updatedArr));

  }

  useEffect(() => {
    // Escutando a mensagem exposta pelo preload
    window?.electronAPI?.onTextCopy((event, message) => {
      setTextCopy((prevTextCopy) => [...prevTextCopy, message]) // Exibe a mensagem do backend no console do frontend
    })

    window?.electronAPI?.onCopyByPath((event, message) => {

      const i = textSaved.findIndex(item => item.shortcut == message)
      console.log(message)
      console.log(i)
      if (i != -1) {
        window?.electronAPI.sendCopy("data-copy", { text: textSaved[i].itemCopy })
        console.log(textSaved[i].itemCopy)
      }
    })
  }, [])

  return (
    <div className=" h-screen bg-[#d1d1d1] flex flex-col">
      <HeaderBtns btnSelect={btnSelect} setBtnSelect={setBtnSelect} />
      <div className='h-full overflow-y-auto'>
        {copyPage[btnSelect]}
      </div>

    </div>
  )
}

export default App
