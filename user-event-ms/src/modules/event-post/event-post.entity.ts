import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { JoinRequest } from '../join-request/join-request.entity';

@Entity('event_post')
export class EventPost extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  category: string;

  @Column()
  location: string;

  @Column()
  date: Date;

  @Column()
  period: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => JoinRequest, (joinRequest) => joinRequest.id)
  joinRequests: JoinRequest[];
}
