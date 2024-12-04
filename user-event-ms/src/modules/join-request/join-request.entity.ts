import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { EventPost } from '../event-post/event-post.entity';
import { JoinRequestStatus } from './interfaces/join-request-status.interface';

@Entity('join_request')
export class JoinRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column()
  event_post_id: number;

  @ManyToOne(() => EventPost, (eventPost) => eventPost.id)
  @JoinColumn({ name: 'event_post_id', referencedColumnName: 'id' })
  @Column({
    type: 'enum',
    enum: JoinRequestStatus,
    default: JoinRequestStatus.PENDING,
  })
  status: JoinRequestStatus;

  @CreateDateColumn()
  created_at: Date;
}
