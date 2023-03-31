require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema.js";
import { getUser } from "./users/users.utils.js";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      user: getUser(req.headers.token),
    };
  },
});

const PORT = process.env.PORT;
server
  .listen()
  .then(() => console.log(`Server is running on http://localhost:${PORT}/`));
