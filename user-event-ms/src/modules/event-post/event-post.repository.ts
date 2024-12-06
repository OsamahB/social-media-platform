import { EntityRepository, Repository } from 'typeorm';
import { EventPost } from './event-post.entity';

@EntityRepository(EventPost)
export class EventPostRepository extends Repository<EventPost> {}
