import React from "react";

// components
import SimpleListTable from "components/Tables/SimpleListTable.js";


// layout for page

import Admin from "layouts/Admin.js";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl-12 mb-12 xl:mb-0 px-4">
          <SimpleListTable />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
