import React from "react";

// components

import ListTable from "components/Tables/ListTable.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <ListTable 
              title="Operadores"
              headers={['Nome', 'Operador']}
              data={[{ id: 1, name: 'teste', operator: 'teste' }]}          
            />
        </div>
      </div>
    </>
  );
}

Tables.layout = Admin;
