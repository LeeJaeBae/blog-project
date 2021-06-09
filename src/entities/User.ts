import { IsEmail } from 'class-validator';
import bcrypt from 'bcrypt';
import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

const BCRYPT_ROUNDS = 10;
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

	@BeforeInsert()
	@BeforeUpdate()
	async savePassword(): Promise<void> {
		if (this.password) {
			const hashedPassword = await this.hashPassword(this.password);
			this.password = hashedPassword;
		}
	}

	get fullName(): string {
		return `${this.firstName} ${this.lastName}`;
	}

	hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, BCRYPT_ROUNDS);
	}

	public comparePassword(password: string): Promise<boolean> {
		return bcrypt.compare(password, this.password);
	}
}
export default User;
