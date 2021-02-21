import piecesManagementApi from './index'

export default async (request, response) => {
    const places = await piecesManagementApi({
        method: 'GET',
        url: 'places',
    })

    const products = await piecesManagementApi({
        method: 'GET',
        url: 'products',
    })

    const operators = await piecesManagementApi({
        method: 'GET',
        url: 'operators',
    })

    const users = await piecesManagementApi({
        method: 'GET',
        url: 'users',
    })

    response.setHeader('Content-Type', 'application/json')
    response.statusCode = 200
    response.end(
        JSON.stringify({
            users: users.data,
            operators: operators.data,
            products: products.data,
            places: places.data,
        })
    )
}
