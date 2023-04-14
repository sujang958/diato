<script lang="ts">
  import type { Todo } from "@prisma/client"
  import { trpc } from "../utils/trpc"
  import TodoItem from "./TodoItem.svelte"
  import { token } from "../utils/atoms"
  import { onMount } from "svelte"

  let todos: Todo[] = []

  let deadline = ""
  let todoAddInput: HTMLInputElement

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
      <button type="button" class="p-1">
        <input type="date" class="text-sm" bind:value={deadline} />
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
