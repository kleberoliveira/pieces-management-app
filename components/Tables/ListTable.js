import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

// components

import TableDropdown from 'components/Dropdowns/TableDropdown.js'

export default function ListTable({
  color,
  title = 'Simple Title',
  headers = ['sample column'],
  data = [{ id: 1, sampleColumn: 'teste' }],
  handlerDelete = () => {}
}) {
  return (
    <>
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
          (color === 'light' ? 'bg-white' : 'bg-gray-800 text-white')
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  'font-semibold text-lg ' +
                  (color === 'light' ? 'text-gray-800' : 'text-white')
                }
              >
                {title}
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <Link href="?insert">
                <button
                  className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Criar novo
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {headers.map((header, key) => (
                  <th
                    key={key}
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-gray-100 text-gray-600 border-gray-200'
                        : 'bg-gray-700 text-gray-300 border-gray-600')
                    }
                  >
                    {header}
                  </th>
                ))}
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-right ' +
                    (color === 'light'
                      ? 'bg-gray-100 text-gray-600 border-gray-200'
                      : 'bg-gray-700 text-gray-300 border-gray-600')
                  }
                >
                  Opções
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((datum, dataKey) => (
                <tr key={dataKey}>
                  {Object.keys(datum).map(
                    (key) =>
                      key !== '_id' && (
                        <td
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                          key={`${key}-${dataKey}`}
                        >
                          {datum[key]}
                        </td>
                      ),
                  )}

                  <td
                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right"
                    key={`${dataKey}-options`}
                  >
                    <TableDropdown id={datum._id} handlerDelete={handlerDelete} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

ListTable.defaultProps = {
  color: 'light',
}

ListTable.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
}
