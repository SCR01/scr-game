import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDm0XBt8KnA41Ixvpayl1zDo503U-iVvio",
  authDomain: "scr-game-f461a.firebaseapp.com",
  projectId: "scr-game-f461a",
  storageBucket: "scr-game-f461a.firebasestorage.app",
  messagingSenderId: "68172717916",
  appId: "1:68172717916:web:062bdd2c227441cd3eab99",
  measurementId: "G-8KXHE64TXV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
