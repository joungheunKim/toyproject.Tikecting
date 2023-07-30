import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'nest_prac', name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  userId: number;

  @Column('varchar', { name: 'loginId', unique: true, length: 20 })
  loginId: string;

  @Column('varchar', { name: 'password', length: 32 })
  password: string;

  @Column('varchar', { name: 'nickname', unique: true, length: 20 })
  nickname: string;

  @Column({ nullable: false, default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteAt: Date | null;
}
