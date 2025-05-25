import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCBjJLjNPW3aB_LqiQbv9wnMxcXrNsaKvI",
  authDomain: "libray-apps.firebaseapp.com",
  projectId: "libray-apps",
  storageBucket: "libray-apps.firebasestorage.app",
  messagingSenderId: "900708321604",
  appId: "1:900708321604:web:14c602c659cc3deda86f11"
};

export const firebaseApp = initializeApp(firebaseConfig)
