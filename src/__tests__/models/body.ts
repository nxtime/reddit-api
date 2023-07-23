const modelsBody = {
  user: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@converteme.com",
    date_of_birth: "2000-01-01T02:00:00.000Z",
  },
  post: {
    title: "Test Post",
    content: "This is a test post.",
    userId: 1
  },
  comment: {
    content: "This is a test comment.",
    userId: 1,
    postId: 1
  },
  follower: {
    followerId: 1,
    followingId: 2
  }
} as const;

export default modelsBody;