import { withIronSession } from 'next-iron-session'
import piecesManagementApi from './index'

export default withIronSession(
    async (req, res) => {
        const bearer = req.session.get('token')
        const {
            query: { url },
            method,
            body,
        } = req

        const request = await piecesManagementApi({
            method,
            url: url.join('/'),
            body: body !== '' ? JSON.parse(body) : null,
            bearer,
        })

        const { data, response } = request
        const statusCode = response ? response.status : request.status

        if (statusCode === 200 || statusCode === 201) {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(JSON.stringify(data))
        } else if (statusCode === 410) {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 410
            res.end(
                JSON.stringify({
                    name: 'Error',
                    message: 'Token Expired',
                })
            )
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 400
            res.end()
        }
    },
    {
        cookieName: 'PIECESMANAGEMENT',
        cookieOptions: {
            secure: false,
        },
        password: process.env.APPLICATION_SECRET,
    }
)
