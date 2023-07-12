import { APIBaseEntity } from './entity';
import { APIUser } from './user';

export interface APIPost extends APIBaseEntity {
  author: APIUser;
  content: string;
  // The post's media URLs. Empty array if none.
  media: string[];

  likesCount: number;
  repostsCount: number;
  commentsCount: number;

  likes: APIUser[];
}
