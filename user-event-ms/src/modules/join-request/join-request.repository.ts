import { EntityRepository, Repository } from 'typeorm';
import { JoinRequest } from './join-request.entity';

@EntityRepository(JoinRequest)
export class JoinRequestRepository extends Repository<JoinRequest> {}
