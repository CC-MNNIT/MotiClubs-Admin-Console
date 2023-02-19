import app from "./FirebaseConfig";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

export default auth;
