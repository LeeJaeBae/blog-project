import { Options } from 'graphql-yoga';
import { createConnection } from 'typeorm';
import app from './app';
import ConnectionOptions from './ormConfig';

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = '/playground';
const GRAPHQL_ENDPOINT: string = '/graphql';

const appOption: Options = {
	port: PORT,
	playground: PLAYGROUND_ENDPOINT,
	endpoint: GRAPHQL_ENDPOINT,
};

const handleAppStat = () => console.log(`Listening on port ${PORT}`);
createConnection(ConnectionOptions).then((_) => {
	app.start(appOption, handleAppStat);
});
