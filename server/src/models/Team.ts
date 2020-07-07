import {
  Entity,
  Column,
} from "typeorm";
import {BaseModel} from "./BaseModel";

@Entity('team')
export class Team extends BaseModel {
  @Column({type: 'varchar'})
  name: string;
}
