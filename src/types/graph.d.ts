export const typeDefs = ["type User {\n  id: Int!\n  email: String!\n  firstName: String!\n  lastName: String!\n  password: String\n  profilePhoto: String\n  createAt: String!\n  updateAt: String!\n  fullName: String\n}\n\ntype Query {\n  user: User\n}\n"];
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
  createAt: string;
  updateAt: string;
  fullName: string | null;
}
