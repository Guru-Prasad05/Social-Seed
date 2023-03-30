import client from "../client.js";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      //check if username or email exist on DB
      const existingUser = await client.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      })
      console.log(existingUser);
      //hash the password
      const hashPassword = await bcrypt.hash(password, 10);
      console.log(hashPassword);
      //save and retun the User
      return client.user.create({
        data: {
          username,
          email,
          firstName,
          lastName,
          password: hashPassword,
        },
      });
    },
  },
};
