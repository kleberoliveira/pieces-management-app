import React from 'react'
import { useRouter } from 'next/router'
import Error from "next/error";
import { server } from 'config'
import fetch from 'libs/fetch'
import useSWR from 'swr'
import { v4 as uuidv4 } from 'uuid'

// components
import ListTable from 'components/Tables/ListTable.js'
import EditTable from 'components/Tables/EditTable.js'
import Loading from 'components/Loading/Loading.js'
import Redirect from 'components/Redirect'

// layout for page
import Admin from 'layouts/Admin.js'
import IronSession from '../../libs/session'

export const getServerSideProps = IronSession

export default function Products({ token }) {
    const router = useRouter()
    const { data, error } = useSWR(`${server}/api/products`, fetch)

    const handlerSave = (payload) => {
        fetch(`${server}/api/products${payload._id ? `/${payload._id}` : ''}`, {
            method: payload._id ? 'PUT' : 'POST',
            body: JSON.stringify(payload),
        }).then((value) => {
            if (!payload._id) data.push(value)
            router.push('products')
        })
    }

    const handlerDelete = (object) => {
        const id = object.target.id
        fetch(`${server}/api/products/${id}`, {
            method: 'DELETE',
        }).then(() => {
            const index = data.findIndex((item) => item._id === id)
            data.splice(index, 1)
            router.push('products')
        })
    }

    if (!token) return <Redirect to={'/login'} />
    if (error) return <Error />    
    if (!data) return <Loading />

    const currentData = data.filter((datum) => datum._id === router.query.id)[0]

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    {router.query.insert === undefined &&
                    router.query.update === undefined ? (
                        <ListTable
                            title="Produtos"
                            headers={['UUID', 'SAP', 'Descrição', 'Situação']}
                            data={data.map(
                                ({ _id, sap, uuid, description, status }) => ({
                                    _id,
                                    uuid,
                                    sap,
                                    description,
                                    status,
                                })
                            )}
                            handlerDelete={handlerDelete}
                        />
                    ) : (
                        <EditTable
                            title="Produto"
                            id={router.query.id}
                            currentData={currentData || { uuid: uuidv4() }}
                            fields={{
                                id: 1,
                                uuid: {
                                    label: 'UUID',
                                    readOnly: true,
                                },
                                sap: { label: 'SAP' },
                                description: { label: 'Descrição' },
                                status: { label: 'Situação', type: 'select' },
                            }}
                            handler={handlerSave}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

Products.layout = Admin
