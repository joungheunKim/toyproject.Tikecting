import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
  // import { PointHistory } from '../point-history/pointHistory.entity';
  import { Concert } from '../concert/concert.entity';
  import { Reservation } from '../reservation/reservation.entity';

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

  @Column({ type: 'int', name:'point', default:1000000 })
  point?: boolean

  @Column({ nullable: false, default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteAt: Date | null;

  // @OneToMany(() => PointHistory, (pointHistories) => pointHistories.user, {
  //     cascade: true,
  //   })
  //   points: PointHistory[];
  
    @OneToMany(() => Concert, (concerts) => concerts.user, {
      cascade: true,
    })
    concerts: Concert[];
  
    @OneToMany(() => Reservation, (reservation) => reservation.user, {
      cascade: true,
    })
    reservations: Reservation[];
}
