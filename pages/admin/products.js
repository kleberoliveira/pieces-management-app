import React from 'react'

// components

import ListTable from 'components/Tables/ListTable.js'
import EditTable from 'components/Tables/EditTable.js'

// layout for page

import Admin from 'layouts/Admin.js'

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <ListTable
            title="Produtos"
            headers={['SAP', 'UUID', 'Descrição', 'Situação']}
            data={[
              {
                id: 1,
                sap: '123123',
                uuid: '123e4567-e89b-12d3-a456-426614174000',
                description: 'Peça ABCC',
                status: 'Em manutenção',
              },
            ]}
          />

          <EditTable
            title="Produto"
            id={1}
            fields={{
              id: 1,
              sap: { label: 'SAP', value: 123123 },
              uuid: {
                label: 'UUID',
                value: '123e4567-e89b-12d3-a456-426614174000',
              },
              description: { label: 'Descrição', value: 'Peça ABCC' },
              status: { label: 'Situação', value: 'Em manutenção' },
            }}
          />
        </div>
      </div>
    </>
  )
}

Tables.layout = Admin
