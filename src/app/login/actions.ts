"use server"

import { auth } from "@/utils/firebase"
import { prisma } from "@/utils/prisma"
import { GithubAuthProvider, signInWithCredential } from "firebase/auth"
import { sign } from "jsonwebtoken"

export async function login(accessToken: string) {
  const credential = GithubAuthProvider.credential(accessToken)
  const result = await signInWithCredential(auth, credential)

  const email = result.user.email

  if (!email) return { ok: false, message: "d" }

  let user = await prisma.user.findUnique({ where: { email } })

  if (!user)
    user = await prisma.user.create({
      data: { email, name: result.user.displayName ?? "이름없음" },
    })

  sign({id: user.id, email: user.email}, "adf") // TODO: add RSA
}
