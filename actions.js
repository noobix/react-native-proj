import { async } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, firestore, storage } from "./config";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export const setUser = (user) => {
  return { type: "SET_USER", payload: user };
};
export const isAuthenticated = (authenticated) => {
  return { type: "IS_AUTHENTICATED", payload: authenticated };
};

export const registerUser = async (email, password, regdata, Image) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredentials.user.uid;
    sendToFirestore(regdata, uid);
    await uploadProfileImage(uid, Image);
    // console.log(userCredentials);
  } catch (error) {
    console.log(error);
  }
};
export const signInUser = async (email, password) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredentials.user.id;
  } catch (error) {
    console.log(error);
  }
};
export const sendToFirestore = async (regdata, uid) => {
  try {
    await setDoc(doc(firestore, "users", uid), regdata);
  } catch (error) {
    console.log(error);
  }
};
export const uploadProfileImage = async (uid, image) => {
  try {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const imagesRef = ref(storage, `images/${uid}`);
    await uploadBytes(imagesRef, blob);
  } catch (error) {
    console.log(error);
  }
};
