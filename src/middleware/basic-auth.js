const AuthService = require('../auth/auth-service')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const payload = {
  preferred_username: 'bobsmith',
  given_name: 'Bob',
  family_name: 'Smith'
};

const options = {
  subject: payload.preferred_username,
  expiresIn: '7d'
};

// env.JWT_SECRET is preferably a 256-bit string minimum, e.g.
// '8eb715bbd21078ee2585366a186a9bd834ff3660cf918d0b1e8d3b5d285d6aa7';

const token = jwt.sign(payload, process.env.JWT_SECRET, options);


function requireAuth(req, res, next) {
    const authToken = req.get('Authorization') || ''

    let basicToken
    if (!authToken.toLowerCase().startsWith('basic ')) {
        return res.status(401).json({
            error: 'Missing basic token'
        })
    } else {
        basicToken = authToken.slice('basic '.length, authToken.length)
    }

    const [tokenUserName, tokenPassword] = Buffer
        .from(basicToken, 'base64')
        .toString()
        .split(':')

    if (!tokenUserName || !tokenPassword) {
        return res.status(401).json({
            error: 'Unauthorized request'
        })
    }

    AuthService.getUserWithUserName(
            req.app.get('db'),
            tokenUserName
        )
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    error: 'Unauthorized request'
                })
            }

            return bcrypt.compare(tokenPassword, user.password)
                .then(passwordsMatch => {
                    if (!passwordsMatch) {
                        return res.status(401).json({
                            error: 'Unauthorized request'
                        })
                    }

                    req.user = user
                    next()
                })

        })
        .catch(next)
}

module.exports = {
    requireAuth
}