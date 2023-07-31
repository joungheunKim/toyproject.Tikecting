import {
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
    import { User } from '../user/user.entity';
    import { Concert } from '../concert/concert.entity';

  @Entity()
  export class Reservation {
    // 자동 생성 컬럼
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @ManyToOne(() => User, (users) => users.concerts, {
        onDelete: 'CASCADE',
        nullable: false,
      })
      user: User;

    @ManyToOne(() => Concert, (concerts) => concerts.id, {
        onDelete: 'CASCADE',
        nullable: false,
      })
      concert: Concert;
  }