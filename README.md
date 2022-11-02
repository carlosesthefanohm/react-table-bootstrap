# react-table-bootstrap

> Datatable desarrolado con bootstrap y react

[![NPM](https://img.shields.io/npm/v/react-table-bootstrap.svg)](https://www.npmjs.com/package/react-table-bootstrap) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-table-bootstrap
```

## Usage

```jsx
import React, { useState, useEffect } from 'react'
import ReactTableBootstrap from 'react-table-bootstrap'
import './index.scss'

const App = () => {
  const [body, setBody] = useState([])
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    let b = []
    for (let j = 1; j < 100; j++) {
      b.push({
        id: j,
        name: 'Carlos' + j,
        balance: 10 * (j + 1),
        enabled: j % 2 === 0 ? 1 : 0,
        checked: 0,
        uno: 1,
        dos: 2,
        enabled_text: j % 2 === 0 ? 'ACTIVO' : 'INACTIVO'
      })
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
            name: 'actions', text: 'Acciones', align: 'center',
            render: () => {
              return <>
                <button className='btn btn-primary btn-sm'>
                  Edit
                </button>
              </>
            }
          }
        ],
      ]}
      isProcessing={isProcessing}
      filterColumns={[{ name: 'id' }, { name: 'name' }]}
      rows={body}
    />
  </div>
}

export default App
```

```scss
@import 'bootstrap';
@import 'react-table-bootstrap/dist/index.scss'
```

## License

MIT © [carlosesthefanohm](https://github.com/carlosesthefanohm)
