interface Post {
  postId: string;
  title: string;
  description: string;
  active: boolean;
  createdAt: string;
}


interface CreatePost {
  body: {
    title: string;
    description: string;
  };
}

