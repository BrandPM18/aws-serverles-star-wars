import createDynamoDBClient from '../db';
import PostService from './postSerice';

const { POSTS_TABLE } = process.env;

const postService = new PostService(createDynamoDBClient(), POSTS_TABLE);

export default postService;