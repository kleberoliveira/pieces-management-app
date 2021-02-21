import React from 'react'
import { createPopper } from '@popperjs/core'
import Link from 'next/link'

const TableDropdown = ({ id, handlerDelete }) => {
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false)
    const btnDropdownRef = React.createRef()
    const popoverDropdownRef = React.createRef()
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: 'left-start',
        })
        setDropdownPopoverShow(true)
    }
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false)
    }
    return (
        <>
            <a
                className="text-gray-600 py-1 px-3"
                href="#show"
                ref={btnDropdownRef}
                onClick={(e) => {
                    e.preventDefault()
                    dropdownPopoverShow
                        ? closeDropdownPopover()
                        : openDropdownPopover()
                }}
            >
                <i className="fas fa-ellipsis-v"></i>
            </a>
            <div
                ref={popoverDropdownRef}
                className={
                    (dropdownPopoverShow ? 'block ' : 'hidden ') +
                    'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-24'
                }
            >
                <Link href={`?update&id=${id}`}>
                    <a
                        href="?update"
                        className={
                            'text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800'
                        }
                    >
                        Editar
                    </a>
                </Link>

                <a
                    href="#delete"
                    className={
                        'text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800'
                    }
                    onClick={handlerDelete}
                    id={id}
                >
                    Excluir
                </a>
            </div>
        </>
    )
}

export default TableDropdown
