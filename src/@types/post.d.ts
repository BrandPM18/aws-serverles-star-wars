interface Post {
  postId: string,
  title: string,
  description: string,
  active: boolean,
  createdAt: string,
}

interface PostPeople {
  postId: string;
  name: string,
  height: string,
  mass: string,
  description: string,
  createdAt: string;
}

interface CreatePost {
  body: {
    peopleId: string
    description: string,
  };
}

