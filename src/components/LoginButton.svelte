<script lang="ts">
  import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
  import { trpc } from "../utils/trpc"
  import { auth, provider } from "../utils/firebase"
  import { idToken, token } from "../utils/atoms"
  import { onMount } from "svelte"

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider)

    const credential = GithubAuthProvider.credentialFromResult(result)

    if (!credential) {
      // TODO: add alert to show there was an error
      return
    }

    idToken.set(credential?.accessToken ?? null)

    const tokenRes = await trpc.signIn.query()

    if (!("token" in tokenRes)) {
      // TODO: add alert

      return
    }

    token.set(tokenRes.token ?? null)
    idToken.set(null)

    console.log(await trpc.todos.query())

    token.subscribe((changed) => {
      if (changed) localStorage.setItem("token", changed)
    })
  }

  onMount(() => {
    const tokenInStorage = localStorage.getItem("token")
    if (!tokenInStorage) return

    token.set(tokenInStorage)
  })

  let menuShown = false
</script>

{#if $token}
  <button type="button" class="relative" on:click={() => {
    menuShown = !menuShown
  }}>
    <img
      src="https://play-lh.googleusercontent.com/ID5wHCs0FsgS018pX0e0My5z3u4cBG7dAYAr2owB9gwylWaNZTJ0pWAKl9It7ys5iEM"
      alt="pfp"
      class="object-contain h-7 rounded-full"
    />
    {#if menuShown}
      <div
        class="absolute top-8 right-0 w-24 bg-white flex flex-col rounded-lg shadow p-1"
      >
        <button
          type="button"
          on:click={() => {
            localStorage.removeItem("token")
            token.set(null)
            location.reload()
          }}
          class="rounded-lg py-1 px-2 hover:bg-black/5 transition duration-200"
        >
          <p class="text-sm text-left">로그아웃</p></button
        >
      </div>
    {/if}
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
