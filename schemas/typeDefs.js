const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    username: String
    email: String
    savedBooks: [Book]
    _id: ID
    bookCount: Int
  }

  type Book {
      authors:[ String  ]
      description: String
      bookId: ID!
      image: String
      title: String
  }
  type Auth {
    token: ID
    user: User
  }
  type Query {
  me: User
  }

  type Mutation {
      login(email: String!, password:String): Auth
      signUp(username: String!, email:String!, password:String! ): Auth
      savedBook(authors: [String], bookId: ID!, title:String, description: String!, image: String! ) : User
    removeBook(bookId: ID!) : User

    }


  `;

module.exports = typeDefs;


















module.exports = typeDefs;