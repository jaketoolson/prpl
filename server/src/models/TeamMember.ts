import {
  Entity,
  Column,
} from "typeorm";
import {BaseModel} from "./BaseModel";

@Entity('team_member')
export class TeamMember extends BaseModel {

  @Column({type: 'varchar'})
  name: string;
}
