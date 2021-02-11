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
            title="Locais"
            headers={['Nome', 'Local']}
            data={[{ id: 1, name: 'teste', place: 'teste' }]}          
          />
        </div>
      </div>
    </>
  );
}

Tables.layout = Admin;