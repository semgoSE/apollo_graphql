import { ApolloServer, gql } from 'apollo-server';
import Book from "./data/Book";
// import sign_up from './sign_up';

// import User from './data/User';
import sign_up from './sign_up';


import { PrismaClient } from '@prisma/client'
import set_vacation from './set_vacation';

const prisma = new PrismaClient()



const resolvers = {
  Query: {
    users: async () => {//получаем всех пользователей
        let users = await prisma.user.findMany({ select: { password: false, id: true, first_name: true, last_name: true, vacation: true, email: true } });
        return users;
    },
  },

  Mutation: {
    sign_up: (e, args) => {//регистрация
      return sign_up(args);
    },
    set_vacation: (e, args) => {//редактирования vacation
      return set_vacation(args.id, args.vacation);
    }
  }
};

  const typeDefs = gql`
  type User {
    id: Int!
    first_name: String!
    last_name: String!
    email: String!
    vacation: Boolean!
    is_mailing: Boolean!
    amount_investing: Int!
  }

  type Query {
    users: [User]
    
  }
  type Mutation {
    sign_up(email: String!, password: String!, first_name: String!, last_name: String!, is_mailing: Boolean!): String
    set_vacation(id: Int!, vacation: Boolean!): User
  }
`;


const server = new ApolloServer({ typeDefs, resolvers });


// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});