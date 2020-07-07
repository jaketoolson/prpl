import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity('member_status')
export class MemberStatus {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  username: string;

  @CreateDateColumn({type: "datetime", update: true, default: () => 'NOW()'})
  created_at: Date;

  @UpdateDateColumn({type: "datetime", nullable: true, update: true})
  updated_at?: Date
}
