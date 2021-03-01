import React from 'react'
import { useRouter } from 'next/router'
import { server } from 'config'
import useSWR from 'swr'
import fetch from 'libs/fetch'

// components
import Loading from 'components/Loading/Loading.js'

export default function EditTable({
    title,
    fields,
    currentData = {},
    handler = () => {},
}) {
    const router = useRouter()
    let { data, error } = useSWR(`${server}/api/dashboard`, fetch)

    const handlerKeyUp = (object) => {
        currentData[object.target.name] = object.target.value
    }

    const handlerChange = (object) => {
        currentData[object.target.name] = object.target.value
    }

    const handlerSave = () => {
        handler({ ...currentData, createAt: new Date() })
    }

    if (error) return router.push('/')
    if (!data) return <Loading />

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-gray-800 text-xl font-bold">
                            {title}
                        </h6>
                        <button
                            className="bg-gray-800 active:bg-gray-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={handlerSave}
                        >
                            Salvar
                        </button>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                        <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                            Informações
                        </h6>
                        <div className="flex flex-wrap">
                            {Object.keys(fields).map(
                                (key) =>
                                    key !== 'id' && (
                                        <>
                                            {fields[key].type === 'select' ? (
                                                <div
                                                    key={key}
                                                    className="w-full lg:w-6/12 px-4"
                                                >
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            {fields[key].label}
                                                        </label>
                                                        <select
                                                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                                            defaultValue={
                                                                currentData[key]
                                                            }
                                                            name={key}
                                                            onChange={
                                                                handlerChange
                                                            }
                                                        >
                                                            <option>
                                                                -- selecione --
                                                            </option>
                                                            {data[
                                                                `${key}s`
                                                            ].map((option) => (
                                                                <option
                                                                    value={
                                                                        option._id
                                                                    }
                                                                >
                                                                    {option.name ||
                                                                        option.description}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    key={key}
                                                    className="w-full lg:w-6/12 px-4"
                                                >
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            {fields[key].label}
                                                        </label>
                                                        <input
                                                            type={
                                                                fields[key].type
                                                                    ? fields[
                                                                          key
                                                                      ].type
                                                                    : 'text'
                                                            }
                                                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                                            name={key}
                                                            readOnly={
                                                                fields[key]
                                                                    .readOnly
                                                            }
                                                            defaultValue={
                                                                currentData[key]
                                                            }
                                                            onKeyUp={
                                                                handlerKeyUp
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
