import client from "../client";

export default {
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }) =>
      client.hashtag.findMany({ where: { photo: { some: { id } } } }),
    likes: ({ id }) => client.like.count({ where: { photoId: id } }),
    comments: ({ id }) => client.comment.count({ where: { photoId: id } }),
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
  },
  Hashtag: {
    photo: ({ id }, { page }) => {
      console.log(page);
      return client.hashtag.findUnique({ where: { id } }).photo({
        take: 5,
        skip: page ? 1 : 0,
        ...(page && { cursor: { id: page } }),
      });
    },
    totalPhotos: ({ id }) =>
      client.photo.count({ where: { hashtags: { some: { id } } } }),
  },
};
