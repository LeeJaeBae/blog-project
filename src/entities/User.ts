import { IsEmail } from 'class-validator';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
class User extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@IsEmail()
	email: string;

	@Column({ type: 'text' })
	firstName: string;
	@Column({ type: 'text' })
	lastName: string;
	@Column({ type: 'string' })
	password: string;

	@Column({ type: 'string' })
	profilePhoto: string;

	@CreateDateColumn() createAt: string;
	@UpdateDateColumn() updateAt: string;

	get fullName(): string {
		return `${this.firstName} ${this.lastName}`;
	}
}
export default User;
