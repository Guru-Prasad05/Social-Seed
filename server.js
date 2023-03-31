require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema.js";
import { getUser } from "./users/users.utils.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

const PORT = process.env.PORT;
server
  .listen()
  .then(() => console.log(`Server is running on http://localhost:${PORT}/`));
