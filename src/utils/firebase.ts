import { initializeApp } from "firebase/app"
import { GithubAuthProvider, getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBcrQBBq8CCVN_kVmAgiBdtqg5Nw5Hoh1U",
  authDomain: "the-diato.firebaseapp.com",
  projectId: "the-diato",
  storageBucket: "the-diato.appspot.com",
  messagingSenderId: "739454226287",
  appId: "1:739454226287:web:82a612b69270c57a92629a",
  measurementId: "G-2157NEP2CL",
}

const app = initializeApp(firebaseConfig)

export const provider = new GithubAuthProvider()

provider.addScope("read:user")
provider.addScope("read:email")

export const auth = getAuth()
