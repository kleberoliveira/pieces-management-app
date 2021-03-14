import React from 'react'
import { useRouter } from 'next/router'
import Error from "next/error";
import { server } from 'config'
import fetch from 'libs/fetch'
import useSWR from 'swr'

// components
import ListTable from 'components/Tables/ListTable.js'
import EditTable from 'components/Tables/EditTable.js'
import Loading from 'components/Loading/Loading.js'
import Redirect from 'components/Redirect'

// layout for page
import Admin from 'layouts/Admin.js'
import IronSession from '../../libs/session'

export const getServerSideProps = IronSession

export default function Users({ token }) {
    const router = useRouter()
    const { data, error } = useSWR(`${server}/api/users`, fetch)

    const handlerSave = (payload) => {
        fetch(`${server}/api/users${payload._id ? `/${payload._id}` : ''}`, {
            method: payload._id ? 'PUT' : 'POST',
            body: JSON.stringify(payload),
        }).then((value) => {
            if (!payload._id) data.push(value)
            router.push('users')
        })
    }

    const handlerDelete = (object) => {
        const id = object.target.id
        fetch(`${server}/api/users/${id}`, {
            method: 'DELETE',
        }).then(() => {
            const index = data.findIndex((item) => item._id === id)
            data.splice(index, 1)
            router.push('users')
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
                            title="Usuários"
                            headers={['Nome', 'Nome do Usuário']}
                            data={data.map(({ _id, name, username }) => ({
                                _id,
                                name,
                                username,
                            }))}
                            handlerDelete={handlerDelete}
                        />
                    ) : (
                        <EditTable
                            title="Usuário"
                            id={router.query.id}
                            currentData={currentData}
                            fields={{
                                name: { label: 'Nome' },
                                username: {
                                    label: 'Nome do Usuário',
                                },
                                password: {
                                    label: 'Senha',
                                    type: 'password',
                                },
                            }}
                            handler={handlerSave}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

Users.layout = Admin
