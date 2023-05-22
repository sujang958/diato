<script lang="ts">
  import { onMount } from "svelte"
  import { focusedDate } from "../utils/atoms"

  let datePicker: HTMLInputElement

  const onClick = () => {
    datePicker.showPicker()
  }

  onMount(() => {
    datePicker.addEventListener("input", () => {
      $focusedDate = datePicker.valueAsDate ?? new Date()
    })
  })
</script>

<button
  type="button"
  class="transition duration-200 hover:opacity-50"
  on:click={() => {
    onClick()
  }}
>
  <p class="text-4xl font-bold">{$focusedDate.getMonth() + 1}월 {$focusedDate.getDate()}일</p>
</button>

<input type="date" class="hidden" bind:this={datePicker} />
