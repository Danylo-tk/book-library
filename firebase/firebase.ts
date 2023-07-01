import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfigSecrets } from "./firebase.config";

//importing secret configuration data(apiKey, authDomain, projectId...)
const firebaseConfig = firebaseConfigSecrets;

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
