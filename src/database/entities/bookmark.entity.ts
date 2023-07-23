import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class BookMark extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.bookmarks)
  user!: User;

  @Column({ nullable: false })
  userId!: number;

  @Column({ nullable: false })
  postId!: number;

}