
import { useEffect, useState } from 'react'

function App() {
  const [textCopy, setTextCopy] = useState([])

  useEffect(() => {
    // Escutando a mensagem exposta pelo preload
    window.electronAPI.onTextCopy((event, message) => {
      setTextCopy((prevTextCopy) => [...prevTextCopy, message]) // Exibe a mensagem do backend no console do frontend
    })
  }, [])

  return (
    <>
      {textCopy.length > 0 ? (
        <ul>
          {textCopy.map((texts) => (
            <li className="bg-red-700 font-bold" id={texts} key={texts}>
              {texts}
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="bg-red-800">nada foi copiado</h1>
      )}
    </>
  )
}

export default App
