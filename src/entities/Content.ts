import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Content extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;
}

export default Content;
