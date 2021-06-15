import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

const ConnectionOptions: ConnectionOptions = {
	type: 'postgres',
	database: 'baelog',
	synchronize: true,
	logging: true,
	entities: ['entities/**/*.*'],
	host: process.env.DB_ENDPOINT || 'localhost',
	port: 5432,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
};

export default ConnectionOptions;
