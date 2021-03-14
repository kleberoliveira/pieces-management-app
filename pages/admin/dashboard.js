/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { server } from 'config'
import fetch from 'libs/fetch'
import { format } from 'date-fns'
import Link from 'next/link'

// components
import ListTable from 'components/Tables/ListTable.js'
import EditTable from 'components/Tables/EditTable.js'
import Redirect from 'components/Redirect'

// layout for page
import Admin from 'layouts/Admin.js'
import IronSession from '../../libs/session'

export const getServerSideProps = IronSession

export default function Dashboard({ token }) {
    const router = useRouter()
    const [results, useResults] = useState([])
    const [productId, useProductId] = useState('')

    const handlerSearch = () => {
        fetch(`${server}/api/histories/product/${productId}`).then((values) => {
            useResults(values)
        })
    }

    const handlerProductSearch = (element) => {
        useProductId(element.target.value)
    }

    const handlerSave = (payload) => {
        fetch(
            `${server}/api/histories${payload._id ? `/${payload._id}` : ''}`,
            {
                method: payload._id ? 'PUT' : 'POST',
                body: JSON.stringify(payload),
            }
        ).then(() => {
            fetch(`${server}/api/histories/product/${productId}`).then(
                (values) => {
                    useResults(values)
                    router.push('dashboard')
                }
            )
        })
    }

    const handlerDelete = (object) => {
        const id = object.target.id
        fetch(`${server}/api/histories/${id}`, {
            method: 'DELETE',
        }).then(() => {
            const index = results.findIndex((item) => item._id === id)
            results.splice(index, 1)
            router.push('dashboard')
        })
    }

    if (!token) return <Redirect to={'/login'} />

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    {router.query.insert === undefined &&
                    router.query.update === undefined ? (
                        <>
                            <div
                                className={
                                    'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0'
                                }
                            >
                                <div
                                    className={
                                        'relative flex flex-col min-w-0 break-words w-full mb-6 rounded bg-white'
                                    }
                                >
                                    <div
                                        className={
                                            'rounded-t mb-0 px-4 py-3 border-0'
                                        }
                                    >
                                        <div className="flex flex-wrap items-center">
                                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                                <h3
                                                    className={
                                                        'font-semibold text-lg text-gray-800'
                                                    }
                                                >
                                                    Pesquisar por Produto
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                    <div className="flex flex-wrap">
                                        <div
                                            className={'w-full lg:w-9/12 px-4'}
                                        >
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Produto
                                                </label>
                                                <input
                                                    type={'text'}
                                                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                                    name={'productId'}
                                                    defaultValue={productId}
                                                    onKeyUp={
                                                        handlerProductSearch
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className={'w-full lg:w-3/12 px-4'}
                                        >
                                            <div className="flex flex-wrap">
                                                <div className="relative w-full mb-3 mt-6">
                                                    <button
                                                        className="bg-gray-800 active:bg-gray-700 text-white font-bold uppercase text-xs px-6 py-3 mt-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={handlerSearch}
                                                    >
                                                        Buscar
                                                    </button>

                                                    <Link href="?insert">
                                                        <button
                                                            className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-6 py-3 mt-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                        >
                                                            Criar novo
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {results.length > 0 && (
                                <ListTable
                                    title="Movimentações"
                                    headers={[
                                        'Criado em',
                                        'Movimentação',
                                        'Local',
                                        'Operador',
                                        'Produto',
                                    ]}
                                    data={results.map(
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
                                            operator: operator
                                                ? operator.name
                                                : '',
                                            product: product
                                                ? product.description
                                                : '',
                                        })
                                    )}
                                    handlerDelete={handlerDelete}
                                    insertButton={false}
                                />
                            )}
                        </>
                    ) : (
                        <EditTable
                            title="Movimentação"
                            id={router.query.id}
                            currentData={results
                                .map(
                                    ({
                                        _id,
                                        history,
                                        operator,
                                        place,
                                        product,
                                    }) => ({
                                        _id,
                                        history,
                                        operator: operator?._id,
                                        place: place?._id,
                                        product: product?._id,
                                    })
                                )
                                .find((item) => item._id === router.query.id)}
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

Dashboard.layout = Admin
