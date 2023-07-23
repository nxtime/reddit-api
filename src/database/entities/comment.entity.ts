import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @ManyToOne(() => User, user => user.comments, { cascade: true, onDelete: "CASCADE" })
  user!: User;

  @ManyToOne(() => Post, post => post.comments, { cascade: true, onDelete: "CASCADE" })
  post!: Post;

  @Column({ nullable: false })
  userId!: number;

  @Column({ nullable: false })
  postId!: number;


  @CreateDateColumn({ type: "text", nullable: false, default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({ type: "text", nullable: false, default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at!: Date;
}
