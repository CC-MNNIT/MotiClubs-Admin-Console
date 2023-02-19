import auth from "../config/FirebaseAuthConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const signIn = async (email, password) => {
  const userDetails = await signInWithEmailAndPassword(auth, email, password);
  return userDetails;
};

export default signIn;
