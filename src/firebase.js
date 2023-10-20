// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJyzF1XTYoRSHTcUrgV4sTr7oGGV2gFLE",
  authDomain: "homework-61d25.firebaseapp.com",
  projectId: "homework-61d25",
  storageBucket: "homework-61d25.appspot.com",
  messagingSenderId: "614612554902",
  appId: "1:614612554902:web:bd2572bcc35e57ecd31eb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export default app 