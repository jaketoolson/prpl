import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import Encrypter from "../services/encrypter";

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', unique: true})
  username: string;

  @Column({type: "varchar" })
  name: string;

  @Column({type: "varchar", unique: true})
  email: string;

  @Column({type: 'varchar'})
  password: string;

  @CreateDateColumn({type: "datetime", update: true, default: () => 'NOW()'})
  created_at: Date;

  @UpdateDateColumn({type: "datetime", nullable: true, update: true})
  updated_at?: Date

  @BeforeInsert()
  async beforeInsert(): Promise<void> {
    this.password = await Encrypter.hash(this.password)
  }
}
