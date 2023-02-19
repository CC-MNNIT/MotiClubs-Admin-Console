import { initializeApp } from "firebase/app";
import firebaseConfig from "../secrets/FirebaseCredentials";

const app = initializeApp(firebaseConfig);

export default app;
