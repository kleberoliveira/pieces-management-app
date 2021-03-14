import { withIronSession } from 'next-iron-session'

export default withIronSession(
    async ({ req, res }) => {
        const token = req.session.get('token')

        if (!token) {
            return { props: {} }
        }

        return {
            props: { token },
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
