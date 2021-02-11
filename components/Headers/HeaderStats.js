import React from 'react'

// components

import CardStats from 'components/Cards/CardStats.js'

export default function HeaderStats() {
  return (
    <>
      {/* Header */}

      <div className="pt-12">
        {/* Card stats */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats
              statSubtitle="USUÁRIOS"
              statTitle="1000"
              statDescripiron="Atualizado ontem"
              statIconName="far fa-user-circle"
              statIconColor="bg-red-500"
            />
          </div>
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats
              statSubtitle="LOCAIS"
              statTitle="3990"
              statDescripiron="Atualizado ultima semana"
              statIconName="fas fa-map-marker"
              statIconColor="bg-orange-500"
            />
          </div>
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats
              statSubtitle="OPERADORES"
              statTitle="12"
              statDescripiron="Atualizado hoje"
              statIconName="fas fa-users"
              statIconColor="bg-pink-500"
            />
          </div>
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats
              statSubtitle="PRODUTOS"
              statTitle="1231231"
              statDescripiron="Atualizado mês passado"
              statIconName="fas fa-barcode"
              statIconColor="bg-blue-500"
            />
          </div>
        </div>
      </div>
    </>
  )
}
