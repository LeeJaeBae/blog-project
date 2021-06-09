import { makeExecutableSchema } from '@graphql-tools/schema';
import { IResolvers } from 'graphql-middleware/dist/types';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';

/**
 * allTypes : take all api directory's .graphql files
 */
const allTypes: string[] = fileLoader(path.join(__dirname, './api/**/*.graphql'));

/**
 * allResolvers : take all api directory's resolvers files
 */
const allResolvers: IResolvers[] = fileLoader(path.join(__dirname, './api/**/*.resolvers.*'));

const mergedTypes = mergeTypes(allTypes);
const mergedResolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
	typeDefs: mergedTypes,
	resolvers: mergedResolvers,
});

export default schema;
