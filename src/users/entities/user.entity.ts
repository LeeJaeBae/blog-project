import * as argon2 from 'argon2';
import { IsEmail } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  username: string;
  @IsEmail()
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  private hashPassword = async (): Promise<void> => {
    const password = this.password;
    this.password = await argon2.hash(password);
  };
  @Column({ default: '' })
  imageLink: string;

  // static findByName(username: string) {
  //   return this.createQueryBuilder('user')
  //     .where('user.username = "username', { username })
  //     .getOne();
  // }
}
