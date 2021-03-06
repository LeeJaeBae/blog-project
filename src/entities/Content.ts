import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import User from './User';

@Entity()
class Content extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@ManyToOne((type) => User, (user) => user.content)
	writher: User;

	@Column()
	context: string;

	@CreateDateColumn() createAt: string;
	@UpdateDateColumn() updateAt: string;
}

export default Content;
