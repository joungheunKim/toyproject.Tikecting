import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne, 
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from '../user/user.entity';

  
  @Entity()
  export class PointHistory {
    // 자동 생성 컬럼
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;
  
    @Column({ nullable: false })
    point: number;
  
    @Column({ nullable: false })
    status: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @ManyToOne(() => User, (users) => users.points, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    user: User;
  
  }