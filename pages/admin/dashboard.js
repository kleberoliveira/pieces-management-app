import React from 'react'
import { useRouter } from 'next/router'
import { server } from 'config'
import fetch from 'libs/fetch'
import useSWR from 'swr'
import { format } from 'date-fns'

// components
import ListTable from 'components/Tables/ListTable.js'
import EditTable from 'components/Tables/EditTable.js'
import Loading from 'components/Loading/Loading.js'

// layout for page
import Admin from 'layouts/Admin.js'

export default function Histórico() {
    const router = useRouter()
    let { data, error } = useSWR(`${server}/api/histories`, fetch)

    const handlerSave = (payload) => {
        fetch(
            `${server}/api/histories${payload._id ? `/${payload._id}` : ''}`,
            {
                method: payload._id ? 'PUT' : 'POST',
                body: JSON.stringify(payload),
            }
        ).then((value) => {

            fetch(`${server}/api/dashboard`).then( ({ products, operators, places })  => {
                
                value.product = products.find(product => product._id === value.product)
                value.operator = operators.find(operator => operator._id === value.operator)
                value.place = places.find(place => place._id === value.place)

                if (!payload._id) data.push(value)
                router.push('dashboard')

            })

            
        })
    }

    const handlerDelete = (object) => {
        const id = object.target.id
        fetch(`${server}/api/histories/${id}`, {
            method: 'DELETE',
        }).then(() => {
            const index = data.findIndex((item) => item._id === id)
            data.splice(index, 1)
            router.push('dashboard')
        })
    }

    if (error) return router.push('/')
    if (!data) return <Loading />

    const currentData = data
        .filter((datum) => datum._id === router.query.id)
        .map(({ _id, createAt, history, place, operator, product }) => ({
            _id,
            createAt,
            history,
            place: place._id,
            operator: operator._id,
            product: product._id,
        }))[0]

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    {router.query.insert === undefined &&
                    router.query.update === undefined ? (
                        <ListTable
                            title="Movimentações"
                            headers={[
                                'Criado em',
                                'Movimentação',
                                'Local',
                                'Operador',
                                'Produto',
                            ]}
                            data={data.map(
                                ({
                                    _id,
                                    createAt,
                                    history,
                                    place,
                                    operator,
                                    product,
                                }) => ({
                                    _id,
                                    createAt: format(
                                        new Date(createAt),
                                        'dd/MM/yyyy HH:mm:ss'
                                    ),
                                    history,
                                    place: place ? place.name : '',
                                    operator: operator ? operator.name : '',
                                    product: product ? product.description : '',
                                })
                            )}
                            handlerDelete={handlerDelete}
                        />
                    ) : (
                        <EditTable
                            title="Movimentação"
                            id={router.query.id}
                            currentData={currentData}
                            fields={{
                                history: { label: 'Movimentação' },
                                place: { label: 'Locais', type: 'select' },
                                operator: {
                                    label: 'Operadores',
                                    type: 'select',
                                },
                                product: { label: 'Produtos', type: 'select' },
                            }}
                            handler={handlerSave}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

Histórico.layout = Admin
