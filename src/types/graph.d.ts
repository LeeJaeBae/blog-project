export const typeDefs = ["type Chat {\n  id: Int!\n  messages: [Message]!\n  participants: [User]!\n  createAt: String!\n  updateAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  user: User!\n  userId: Int!\n  createAt: String!\n  updateAt: String\n}\n\ntype Content {\n  id: Int!\n  writer: User!\n  context: String!\n  createAt: String!\n  updateAt: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Mutation {\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(firstName: String!, lastName: String!, email: String!, password: String!, profilePhoto: String!, age: Int!, phoneNumber: String!): EmailSignUpResponse!\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype User {\n  id: Int!\n  email: String!\n  firstName: String!\n  lastName: String!\n  password: String\n  profilePhoto: String\n  content: [Content]\n  chat: Chat\n  messages: [Message]\n  createAt: String!\n  updateAt: String!\n  fullName: String\n}\n\ntype Query {\n  user: User\n}\n"];
/* tslint:disable */

export interface Query {
  user: User | null;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string | null;
  profilePhoto: string | null;
  content: Array<Content> | null;
  chat: Chat | null;
  messages: Array<Message> | null;
  createAt: string;
  updateAt: string;
  fullName: string | null;
}

export interface Content {
  id: number;
  writer: User;
  context: string;
  createAt: string;
  updateAt: string | null;
}

export interface Chat {
  id: number;
  messages: Array<Message>;
  participants: Array<User>;
  createAt: string;
  updateAt: string | null;
}

export interface Message {
  id: number;
  text: string;
  chat: Chat;
  user: User;
  userId: number;
  createAt: string;
  updateAt: string | null;
}

export interface Mutation {
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
}

export interface EmailSignInMutationArgs {
  email: string;
  password: string;
}

export interface EmailSignUpMutationArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePhoto: string;
  age: number;
  phoneNumber: string;
}

export interface EmailSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}
