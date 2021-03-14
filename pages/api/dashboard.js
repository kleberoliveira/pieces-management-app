import { withIronSession } from 'next-iron-session'
import piecesManagementApi from './index'

export default withIronSession(
    async (request, response) => {
        const bearer = request.session.get('token')

        const places = await piecesManagementApi({
            method: 'GET',
            url: 'places',
            bearer,
        })

        const products = await piecesManagementApi({
            method: 'GET',
            url: 'products',
            bearer,
        })

        const operators = await piecesManagementApi({
            method: 'GET',
            url: 'operators',
            bearer,
        })

        const users = await piecesManagementApi({
            method: 'GET',
            url: 'users',
            bearer,
        })

        response.setHeader('Content-Type', 'application/json')
        response.statusCode = 200
        response.end(
            JSON.stringify({
                users: users.data,
                operators: operators.data,
                products: products.data,
                places: places.data,
                statuss: [
                    { name: 'Em Manutenção' },
                    { name: 'Em Almoxarifado' },
                    { name: 'Em Uso' },
                    { name: 'Em fornecedor' },
                ],
            })
        )
    },
    {
        cookieName: 'PIECESMANAGEMENT',
        cookieOptions: {
            secure: false,
        },
        password: process.env.APPLICATION_SECRET,
    }
)
