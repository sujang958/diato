"use server"

import { prisma } from "@/utils/prisma"
import { GithubAuthProvider, getAuth, signInWithCredential } from "firebase/auth"
import { sign } from "jsonwebtoken"
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyBcrQBBq8CCVN_kVmAgiBdtqg5Nw5Hoh1U",
  authDomain: "the-diato.firebaseapp.com",
  projectId: "the-diato",
  storageBucket: "the-diato.appspot.com",
  messagingSenderId: "739454226287",
  appId: "1:739454226287:web:82a612b69270c57a92629a",
  measurementId: "G-2157NEP2CL",
}

initializeApp(firebaseConfig)

type LoginReturnType =
  | { ok: false; message: string }
  | { ok: true; token: string }

export async function login(accessToken: string): Promise<LoginReturnType> {
  const credential = GithubAuthProvider.credential(accessToken)
  const result = await signInWithCredential(getAuth(), credential)

  const email = result.user.email

  if (!email)
    return {
      ok: false,
      message: "깃허브로부터 가져올 수 있는 이메일이 없습니다.",
    }

  let user = await prisma.user.findUnique({ where: { email } })

  if (!user)
    user = await prisma.user.create({
      data: { email, name: result.user.displayName ?? "이름없음" },
    })

  if (!process.env.RSA_PRIVATE) return { ok: false, message: "server fault" }

  const token = sign(
    { id: user.id, email: user.email },
    process.env.RSA_PRIVATE,
    {
      algorithm: "RS256",
    }
  )

  return { ok: true, token }
}
