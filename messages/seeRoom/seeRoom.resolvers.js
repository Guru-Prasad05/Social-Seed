import client from "../../client";
import { protectedResolvers } from "../../users/users.utils";

export default {
  Query: {
    seeRoom: protectedResolvers(async (_, { id }, { loggedInUser }) =>
      client.room.findFirst({
        where: {
          id,
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      })
    ),
  },
};
