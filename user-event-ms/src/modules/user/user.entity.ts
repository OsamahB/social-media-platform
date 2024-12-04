import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { EventPost } from '../event-post/event-post.entity';
import { JoinRequest } from '../join-request/join-request.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => EventPost, (eventPost) => eventPost.id)
  eventPosts: EventPost[];

  @OneToMany(() => JoinRequest, (joinRequest) => joinRequest.id)
  joinRequests: JoinRequest[];
}
