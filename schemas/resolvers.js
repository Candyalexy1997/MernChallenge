const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('../models/index');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const response = await User.findOne({ _id: context.user._id })
                return response
            }
            throw new AuthenticationError('Not logged in');
        },

    },

    Mutation: {
        login: async (parent, args, context) => {
            const email = args.email
            const password = args.password

            const response = await User.findOne({ email: email, })
            if (!response) {
                throw new AuthenticationError('Email not found')
            }
            const passwordResponse = await response.isCorrectPassword(password)

            if (!passwordResponse) {
                throw new AuthenticationError('incorrect password')
            }
            const passwordResponse = await response.isCorrectPassword(password)

            const token = signToken(response)
            return { token: token, user: response }


        }
    }
}