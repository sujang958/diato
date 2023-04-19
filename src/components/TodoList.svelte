<script lang="ts">
  import type { Todo } from "@prisma/client"
  import { trpc } from "../utils/trpc"
  import TodoItem from "./TodoItem.svelte"
  import { token } from "../utils/atoms"
  import { onMount } from "svelte"

  let todos: Todo[] = []

  let deadline = ""
  let todoAddInput: HTMLInputElement

  let preferencesShown = false

  token.subscribe(async (newToken) => {
    if (!newToken) return
    try {
      const fetchedTodos = await trpc.todos.query()

      todos = [
        ...fetchedTodos.map(
          ({ authorId, deadline, finished, id, startDate, todo }) =>
            ({
              authorId,
              deadline,
              finished,
              id,
              startDate,
              todo,
            } satisfies Todo)
        ),
      ]
    } catch (e) {
      console.log("There was an error fetching todos")
      console.log(e)
    }
  })

  const addTodo = async () => {
    const todo = await trpc.addTodo.mutate({
      todo: todoAddInput.value,
      deadline: new Date(deadline),
    })

    todoAddInput.value = ""
    deadline = ""

    todos = [...todos, todo]
  }

  onMount(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key.trim() != "/") return
      event.preventDefault()
      todoAddInput.focus()
    })
  })
</script>

{#if preferencesShown}
  <div
    class="fixed top-0 bottom-0 left-0 right-0 w-full h-screen grid place-items-center bg-black/5 z-50"
  >
    <div
      class="flex flex-col bg-white rounded-lg py-4 px-5 w-3/4 md:w-1/4 gap-y-4 relative"
    >
      <div class="absolute top-2 right-2">
        <button
          type="button"
          on:click={() => {
            preferencesShown = false
          }}
          class="transition duration-200 hover:bg-black/5 rounded-full p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <style>
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }
      </style>
      <label>
        <p class="font-medium text-lg">반복적인 일</p>
        <div class="flex flex-row items-center gap-x-2 mt-1">
          <button type="button" class="rounded-xl px-2 py-1 bg-neutral-100">
            <p class="text-xs">주 마다</p>
          </button>
          <button type="button" class="rounded-xl px-2 py-1 bg-neutral-100">
            <p class="text-xs">~일 뒤 마다</p>
          </button>
        </div>
        <input
          type="number"
          class="text-sm w-28 rounded-lg mt-2.5 outline-none border border-neutral-200 appearance-none px-1.5 py-0.5"
        />
        <span class="text-sm">일 뒤 반복</span>
      </label>
      <label>
        <p class="font-semibold">마감일</p>
        <input
          type="date"
          class="mt-1.5 text-sm border-neutral-200 border rounded-lg px-1.5 py-0.5"
          bind:value={deadline}
        />
      </label>

      <div class="flex flex-row items-center justify-end">
        <button
          type="button"
          on:click={() => {
            preferencesShown = false
          }}
          class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 text-sm rounded-lg"
        >
          적용
        </button>
      </div>
    </div>
  </div>
{/if}

<div class="flex flex-col gap-y-4 py-10">
  <div class="relative flex flex-row items-center">
    <input
      type="text"
      class="outline-none border-neutral-200 border rounded-lg px-2 py-1 w-full"
      placeholder="Press / to focus"
      bind:this={todoAddInput}
      on:keypress={(event) => {
        if (event.key == "Enter") addTodo()
      }}
    />
    <div
      class="absolute top-1/2 right-1 transform -translate-y-1/2 transition duration-200 flex flex-row items-center gap-x-1.5"
    >
      <button
        type="button"
        on:click={() => {
          preferencesShown = true
        }}
        class="transition duration-200 rounded-full hover:bg-black/5 p-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
      <button
        on:click={() => {
          addTodo()
        }}
        type="button"
        class="transition duration-200 rounded-full hover:bg-black/5 p-1"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  </div>
  <div class="pt-0.5" />
  {#each todos as todo}
    <TodoItem
      {todo}
      onDelete={() => {
        const arr = structuredClone(todos)
        const todoId = arr.findIndex(({ id }) => id == todo.id)
        delete arr[todoId]
        todos = [...arr.filter((e) => e)]
      }}
    />
  {/each}
</div>
