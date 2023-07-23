import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { User } from "./user.entity";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  title!: string;

  @Column({ nullable: false })
  content!: string;

  @ManyToOne(() => User, user => user.posts, { cascade: true, onDelete: "CASCADE" })
  user!: User;

  @Column({ nullable: false })
  userId!: number;

  @OneToMany(() => Comment, comment => comment.post)
  comments!: Comment[];

  @ManyToMany(() => User)
  @JoinTable()
  likes!: User[];


  @CreateDateColumn({ type: "text", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({ type: "text", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at!: Date;
}
