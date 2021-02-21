import React from 'react'
import { useRouter } from 'next/router'

export default function Navbar() {
    const router = useRouter()
    const currentPage = router.pathname.split('/')[
        router.pathname.split('/').length - 1
    ]
    const titles = {
        dashboard: 'Dashboard',
        operators: 'Operadores',
        places: 'Locais',
        products: 'Produtos',
        users: 'Usuários',
    }
    return (
        <>
            {/* Navbar */}
            <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-no-wrap md:justify-start flex items-center p-4">
                <div className="w-full mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4">
                    {/* Brand */}
                    <a
                        className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                    >
                        {titles[currentPage]}
                    </a>
                </div>
            </nav>
            {/* End Navbar */}
        </>
    )
}
