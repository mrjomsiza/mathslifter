import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

export async function registerWithEmail({ name, email, password }) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);

  if (name) {
    await updateProfile(credential.user, { displayName: name });
  }

  return credential.user;
}

export async function loginWithEmail({ email, password }) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function logoutUser() {
  await signOut(auth);
}
