import React from 'react'
import { useRouter } from 'next/router'
import { server } from 'config'
import fetch from 'libs/fetch'
import useSWR from 'swr'

// components
import CardStats from 'components/Cards/CardStats.js'
import Loading from 'components/Loading/Loading.js'
import Redirect from 'components/Redirect'

export default function HeaderStats({ token }) {
    const router = useRouter()
    let { data, error } = useSWR(`${server}/api/dashboard`, fetch)

    if (!token) return <Redirect to={'/login'} />
    if (error) return router.push('/')
    if (!data) return <Loading />

    return (
        <>
            {/* Header */}

            <div className="pt-12">
                {/* Card stats */}
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <CardStats
                            statSubtitle="USUÁRIOS"
                            statTitle={String(data.users.length)}
                            statIconName="far fa-user-circle"
                            statIconColor="bg-red-500"
                        />
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <CardStats
                            statSubtitle="LOCAIS"
                            statTitle={String(data.places.length)}
                            statIconName="fas fa-map-marker"
                            statIconColor="bg-orange-500"
                        />
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <CardStats
                            statSubtitle="OPERADORES"
                            statTitle={String(data.operators.length)}
                            statIconName="fas fa-users"
                            statIconColor="bg-pink-500"
                        />
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <CardStats
                            statSubtitle="PRODUTOS"
                            statTitle={String(data.products.length)}
                            statIconName="fas fa-barcode"
                            statIconColor="bg-blue-500"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
