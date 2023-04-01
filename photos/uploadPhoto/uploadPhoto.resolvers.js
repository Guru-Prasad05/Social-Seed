import { hash } from "bcrypt";
import client from "../../client";
import { protectedResolvers } from "../../users/users.utils";
export default {
  Mutation: {
    uploadPhoto: protectedResolvers(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObjs = [];
        if (caption) {
          //parse caption
          const hashtags = caption.match(/#[\w]+/g);
          hashtagObjs = hashtags.map((hashtag) => ({
            where: { hashtag },
            create: { hashtag },
          }));
          //get or create hashtag
        }
        return client.photo.create({
          data: {
            file,
            caption,
            user: { connect: { id: loggedInUser.id } },
            ...(hashtagObjs.length > 0 && {
              hashtags: { connectOrCreate: hashtagObjs },
            }),
          },
        });
        //save the photo With the parsed Hashtag
        //add the photo to the hashtags
      }
    ),
  },
};
