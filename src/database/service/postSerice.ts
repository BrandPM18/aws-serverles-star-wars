import { DocumentClient } from "aws-sdk/clients/dynamodb";

class PostService {
  constructor(
    private readonly docClient: DocumentClient,
    private readonly tableName: string
  ) {}

  async getAllPosts(): Promise<Post[]> {
    const result = await this.docClient
      .scan({
        TableName: this.tableName,
      })
      .promise();

    return result.Items as Post[];
  }

  async getPost(postId: string): Promise<Post> {
    const result = await this.docClient
      .get({
        TableName: this.tableName,
        Key: { postId },
      })
      .promise();

    return result.Item as Post;
  }

  async createPost(post: PostPeople): Promise<PostPeople> {
    await this.docClient
      .put({
        TableName: this.tableName,
        Item: post,
      })
      .promise();

    return post;
  }

}
  
export default PostService;