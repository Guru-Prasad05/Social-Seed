import client from "../../client";
import { protectedResolvers } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolvers(
      async (_, { username }, { loggedInUser }) => {
        const ok = await client.user.findUnique({ where: { username } });
        if (!ok) {
          return {
            ok: false,
            error: "This user doesn't exist.",
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              connect: {
                username,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
