import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BookMark } from "./bookmark.entity";
import { Comment } from "./comment.entity";
import { Follower } from "./follower.entity";
import { Post } from "./post.entity";
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  avatar_url!: string;

  @Column({ nullable: false })
  firstName!: string;

  @Column({ nullable: false })
  lastName!: string;

  @Column({ nullable: false })
  date_of_birth!: Date;

  @Column({ type: "varchar", nullable: true, default: () => "'not specified'" })
  gender!: string;

  @Column({ nullable: false })
  email!: string;

  @OneToMany(() => Post, post => post.user)
  posts!: Post[];

  @OneToMany(() => Follower, follower => follower.follower)
  followers!: Follower[];

  @OneToMany(() => Follower, follower => follower.following)
  following!: Follower[];

  @OneToMany(() => Comment, comment => comment.user)
  comments!: Follower[];

  @OneToMany(() => BookMark, bookmark => bookmark.user)
  bookmarks!: BookMark[];

  @ManyToMany(() => Post)
  @JoinTable()
  likes!: Post[];


  @CreateDateColumn({ type: "text", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({ type: "text", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at!: Date;
}
