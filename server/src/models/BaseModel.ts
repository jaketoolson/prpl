import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

export abstract class BaseModel {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({type: "datetime", update: true, default: () => 'NOW()'})
  created_at: Date;

  @UpdateDateColumn({type: "datetime", nullable: true, update: true})
  updated_at?: Date
}
