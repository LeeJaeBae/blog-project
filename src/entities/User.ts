import { IsEmail } from 'class-validator';
import bcrypt from 'bcrypt';
import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import Content from './Content';
import Chat from './Chat';
import Message from './Message';

const BCRYPT_ROUNDS = 10;
@Entity()
class User extends BaseEntity {
	@PrimaryGeneratedColumn('increment') id: string;

	@IsEmail()
	@Column({ type: 'text' })
	email: string;

	@Column({ type: 'text' })
	firstName: string;
	@Column({ type: 'text' })
	lastName: string;
	@Column({ type: 'text', nullable: true })
	password: string;

	@Column({ type: 'text', nullable: true })
	profilePhoto: string;

	@OneToMany((type) => Content, (content) => content.writher)
	content: Content[];

	@ManyToOne((type) => Chat, (chat) => chat.participants)
	chat: Chat;

	@OneToMany((type) => Message, (message) => message.user)
	messages: Message[];

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
