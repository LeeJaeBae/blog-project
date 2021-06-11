import { Resolvers } from 'src/types/resolvers';
import { EmailSignInMutationArgs, EmailSignInResponse } from 'src/types/graph';
import User from '../../../entities/User';

const resolvers: Resolvers = {
	Mutation: {
		EmailSignIn: async (_, args: EmailSignInMutationArgs): Promise<EmailSignInResponse> => {
			try {
				const { email, password } = args;
				const user = User.findOne({ email });
				if (!user) {
					return {
						ok: false,
						error: 'No User',
						token: null,
					};
				}
				const checkPassword = await user.comparePassword(password);
				if (checkPassword) {
					return {
						ok: true,
						error: null,
						token: '',
					};
				} else {
					return {
						ok: false,
						error: 'Wrong password',
						token: null,
					};
				}
			} catch (error) {
				return {
					ok: false,
					error: error.message,
					token: null,
				};
			}
		},
	},
};

export default resolvers;