import * as argon2 from 'argon2';
import { IsEmail } from 'class-validator';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32, type: 'text' })
  username: string;
  @IsEmail()
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;

  @BeforeInsert()
  private hashPassword = async (): Promise<void> => {
    this.password = await argon2.hash(this.password);
  };
  @Column({ default: '' })
  imageLink: string;
}
