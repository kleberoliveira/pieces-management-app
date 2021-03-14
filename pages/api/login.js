import { withIronSession } from 'next-iron-session'
import piecesManagementApi from './index'

export default withIronSession(
    async (request, response) => {
        const result = await piecesManagementApi({
            url: 'auth/login',
            method: 'POST',
            body: request.body,
        })

        request.session.set('token', result.data.accessToken)
        await request.session.save()

        response.setHeader('Content-Type', 'application/json')
        response.statusCode = 201
        response.end()
    },
    {
        cookieName: 'PIECESMANAGEMENT',
        cookieOptions: {
            secure: false,
        },
        password: process.env.APPLICATION_SECRET,
    }
)
