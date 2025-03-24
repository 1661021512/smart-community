import {Resident} from './resident';
import {Relationship} from './relationship';

/**
 * 居民间关系
 */
export interface ResidentRelationships {
  anotherResident: Resident;
  id: number;
  oneResident: Resident;
  relationship: Relationship;
}
