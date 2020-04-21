import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// App config and initialization
const config = {
  apiKey: "AIzaSyC1e1bbnj_icAwSpdl5P6AWdGSDSr8Qeto",
  authDomain: "crwn-clothing-db-65476.firebaseapp.com",
  databaseURL: "https://crwn-clothing-db-65476.firebaseio.com",
  projectId: "crwn-clothing-db-65476",
  storageBucket: "crwn-clothing-db-65476.appspot.com",
  messagingSenderId: "253653935988",
  appId: "1:253653935988:web:88787afe398c9c88896e21",
  measurementId: "G-Q8G76JKJQH",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error in the creation of user: ", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Setup google authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
