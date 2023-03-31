import client from "../../client";

import bcrypt from "bcrypt";
export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password: newPassword },
      { user }
    ) => {
      console.log(user);
      let hashPassword = null;
      if (newPassword) {
        hashPassword = await bcrypt.hash(newPassword, 10);
      }
      const updatedUser = await client.user.update({
        where: {
          id: user.id,
        },
        data: {
          firstName,
          lastName,
          email,
          username,
          ...(hashPassword && { password: hashPassword }),
        },
      });
      if (updatedUser.id) {
        return { ok: true };
      } else {
        return {
          ok: false,
          error: "Could not update profile.",
        };
      }
    },
  },
};
