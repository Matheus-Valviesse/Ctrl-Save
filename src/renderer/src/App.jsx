import React, { useEffect, useState } from 'react'
import HeaderBtns from './components/HeaderBtns'
import DailyCopies from './components/itemsCopy/DailyCopies'
import CopiesSaved from './components/itemsCopy/CopiesSaved'
import { nanoid } from "nanoid";
function App() {
  const [textCopy, setTextCopy] = useState([])
  const [textSaved, setTextSaved] = useState([]) // começa vazio
  const [btnSelect, setBtnSelect] = useState('CTRL+C Diarios')

  // Objeto para renderizar os components
  const copyPage = {
    'CTRL+C Diarios': <DailyCopies itensCopy={textCopy} itemSave={saveLocal} />,
    'CTRL+C Salvos': <CopiesSaved itensSaved={textSaved} editLocal={editLocal} deleteLocal={deleteLocal} />
  }

  async function loadCopies() {
    try {
      const arr = await window.electronAPI.getCopies();
      setTextSaved(Array.isArray(arr) ? arr : []);
    } catch (error) {
      console.error('Erro em getLocal:', error);
      setTextSaved([]);
    }
  }

  async function saveLocal(item) {
    const newItem = await window.electronAPI.addCopy(item);
    setTextSaved(prev => [...prev, newItem]); // atualiza o state no React
    const copyExist = textCopy.findIndex(i => i === item)
    if (copyExist > -1) {
      setTextCopy(textCopy.filter(data => data !== item))
    }

  }

  async function editLocal(i, item) {
    const editItem = await window.electronAPI.editCopy(i, item);
    editItem.success ? loadCopies() : null;
  }

  async function deleteLocal(i) {
    const deleteItem = await window.electronAPI.deleteCopy(i);
    deleteItem.success ? loadCopies() : null;
  }


  useEffect(() => {

    loadCopies(); // carrega os dados quando o componente montar

    // Escutando eventos vindos do preload
    window?.electronAPI?.onTextCopy((event, message) => {
      setTextCopy((prevTextCopy) => [...prevTextCopy, message])
    })


  }, [])

  if (textSaved.length > 0) {
    window?.electronAPI?.onCopyByPath((event, message) => {
      const data = textSaved
      const i = data.findIndex(item => item.shortcut == message)

      if (i !== -1) {
        window?.electronAPI.sendCopy("data-copy", { text: textSaved[i].itemCopy })
      }
    })
  }




  return (
    <div className="h-screen bg-[#262626] flex flex-col custom-scroll">
      <HeaderBtns btnSelect={btnSelect} setBtnSelect={setBtnSelect} />
      <div className="h-full overflow-y-auto">
        {copyPage[btnSelect]}
      </div>
    </div>
  )
}

export default App
