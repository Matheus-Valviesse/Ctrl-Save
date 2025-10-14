import React, { useEffect, useState } from 'react'
import HeaderBtns from './components/HeaderBtns'
import DailyCopies from './components/itemsCopy/DailyCopies'
import CopiesSaved from './components/itemsCopy/CopiesSaved'

function App() {
  const [textCopy, setTextCopy] = useState([])
  const [textSaved, setTextSaved] = useState([]) // começa vazio
  const [btnSelect, setBtnSelect] = useState('CTRL+C Diarios')

  // Objeto para renderizar os components
  const copyPage = {
    'CTRL+C Diarios': <DailyCopies itensCopy={textCopy} itemSave={saveLocal} />,
    'CTRL+C Salvos': <CopiesSaved itensSaved={textSaved} editLocal={editLocal} deleteLocal={deleteLocal} />
  }

  async function callShowMessage() {
    await window.electronAPI.showMessage()
  }

  async function loadData() {
    const arr = await window.electronAPI.getCopies();
    return arr
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
    callShowMessage()
    loadCopies(); // carrega os dados quando o componente montar

    // Escutando eventos vindos do preload
    window?.electronAPI?.onTextCopy((event, message) => {
      setTextCopy((prevTextCopy) => [...prevTextCopy, message])
    })


  }, [])

  if (textSaved.length > 0) {
    window?.electronAPI?.onCopyByPath((event, message) => {
      const data = textSaved
      console.log(data)
      const i = data.findIndex(item => item.shortcut == message)

      console.log(i)
      if (i !== -1) {
        window?.electronAPI.sendCopy("data-copy", { text: textSaved[i].itemCopy })
      }
    })
  }




  return (
    <div className="h-screen bg-[#d1d1d1] flex flex-col">
      <HeaderBtns btnSelect={btnSelect} setBtnSelect={setBtnSelect} />
      <div className="h-full overflow-y-auto">
        {copyPage[btnSelect]}
      </div>
    </div>
  )
}

export default App
