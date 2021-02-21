import React from 'react'

// components

import AdminNavbar from 'components/Navbars/AdminNavbar.js'
import Sidebar from 'components/Sidebar/Sidebar.js'
import HeaderStats from 'components/Headers/HeaderStats.js'
import FooterAdmin from 'components/Footers/FooterAdmin.js'
import { useRouter } from 'next/router'

export default function Admin({ children }) {
    const router = useRouter()
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-gray-200 min-h-screen">
                <AdminNavbar />
                {/* Header */}
                <div className="relative bg-gray-900 pb-32 pt-12">
                    <div className="px-4 md:px-10 mx-auto w-full">
                        {router.pathname.indexOf('/admin/dashboard') !== -1 && (
                            <HeaderStats />
                        )}
                    </div>
                </div>
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <div className="min-h-full">{children}</div>
                    <FooterAdmin />
                </div>
            </div>
        </>
    )
}
