import React, { useState, useEffect } from 'react'
import ReactTableBootstrap from 'react-table-bootstrap'
/* import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-table-bootstrap/dist/index.css' */
import './index.scss'

const App = () => {
  const [body, setBody] = useState([])
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    let b = []
    let idx = 0
    for (let i = 0; i < 1; i++) {
      let d = []
      for (let j = 0; j < 1; j++) {
        d.push({
          id: idx,
          name: 'Carlos' + idx,
          balance: 10 * (idx + 1),
          enabled: i % 2 === 0 ? 1 : 0,
          checked: 0,
          uno: 1,
          dos: 2
        })
        idx++
      }
      b = [...b, ...d]
    }
    setBody(b)
    setIsProcessing(false)
  }, [])

  return <div className="container mt-4">
    <ReactTableBootstrap
      head={[

        [
          { name: 'id', text: 'ID', align: 'center' },
          { name: 'name', text: 'Nombres' },
          { name: 'balance', text: 'Salario', align: 'center' },
          {
            name: 'enabled', text: 'Estado', align: 'center', render: r => <strong className={'text-' + (parseInt(r.enabled) === 1 ? 'success' : 'danger')}>
              {parseInt(r.enabled) === 1 ? 'ACTIVO' : 'INACTIVO'}
            </strong>
          },
          {
            name: 'checked', text: 'Seleccionado', align: 'center',
            render: r => 'Seleccionado'
          },
          {
            name: 'actions', text: 'Acciones', align: 'center',
            render: r => {
              return <>
                <button>a</button>
              </>
            }
          }
        ],
      ]}
      isProcessing={isProcessing}
      /* filterColumns={[{ name: 'id_customers' }, { name: 'name' }]} */
      rows={body}
    />
  </div>
}

export default App
