import type { isUserVerified } from "~/types/user";

interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: isUserVerified;
}

export type {
  User
}