import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from '../user/user.entity';
  import { Reservation } from '../reservation/reservation.entity';
  
  @Entity()
  export class Concert {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;
  
    @Column({ nullable: false, length: 50 })
    title: string;
  
    @Column({ nullable: false, length: 200 })
    desc: string;
  
    @Column({ nullable: false })
    price: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @ManyToOne(() => User, (users) => users.concerts, {
      onDelete: 'CASCADE',
      nullable: false,
    })
    user: User;
  
    @OneToMany(() => Reservation, (reservation) => reservation.concert, {
      cascade: true,
    })
    reservations: Reservation[];
  }