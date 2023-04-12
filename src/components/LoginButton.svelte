<script lang="ts">
  import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
  import { trpc } from "../utils/trpc"
  import { auth, provider } from "../utils/firebase"
  import { idToken, token } from "../utils/atoms"

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider)

    const credential = GithubAuthProvider.credentialFromResult(result)

    if (!credential) {
      // TODO: add alert to show there was an error
      return
    }

    idToken.set(credential?.accessToken ?? null)

    const token = await trpc.signIn.query()

    console.log("From Server", token)
  }
</script>

{#if $token}
  <button type="button" class="rounded-full overflow-hidden">
    <img
      src="https://play-lh.googleusercontent.com/ID5wHCs0FsgS018pX0e0My5z3u4cBG7dAYAr2owB9gwylWaNZTJ0pWAKl9It7ys5iEM"
      alt="pfp"
      class="object-contain h-7"
    />
  </button>
{:else}
  <button
    type="button"
    class="transition duration-200 rounded-lg hover:bg-black/5 px-2.5 py-1.5"
    on:click={() => {
      signIn()
    }}
  >
    <p class="text-neutral-700 font-medium">로그인</p>
  </button>
{/if}
