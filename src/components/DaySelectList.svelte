<script lang="ts">
  import { focusedDate } from "../utils/atoms"

  const setDatebyDay = (targetDay: number) => {
    if ($focusedDate.getDay() == targetDay) return
    $focusedDate = new Date(
      $focusedDate.getTime() -
        1000 * 60 * 60 * 24 * ($focusedDate.getDay() - targetDay)
    )
  }
</script>

<button
  type="button"
  on:click={() => {
    setDatebyDay(0)
  }}
  class={`${
    $focusedDate.getDay() == 0 ? "bg-black/10" : ""
  } h-8 w-8 grid place-items-center rounded-lg transition duration-200 hover:bg-black/5 text-neutral-700`}
>
  <p class="text-xl font-bold">일</p>
</button>
<button
  type="button"
  on:click={() => {
    setDatebyDay(1)
  }}
  class={`${
    $focusedDate.getDay() == 1 ? "bg-black/10" : ""
  } h-8 w-8 grid place-items-center rounded-lg transition duration-200 hover:bg-black/5 text-neutral-700`}
>
  <p class="text-xl font-bold">월</p>
</button>
<button
  type="button"
  on:click={() => {
    setDatebyDay(2)
  }}
  class={`${
    $focusedDate.getDay() == 2 ? "bg-black/10" : ""
  } h-8 w-8 grid place-items-center rounded-lg transition duration-200 hover:bg-black/5 text-neutral-700`}
>
  <p class="text-xl font-bold">화</p>
</button>
<button
  type="button"
  on:click={() => {
    setDatebyDay(3)
  }}
  class={`${
    $focusedDate.getDay() == 3 ? "bg-black/10" : ""
  } h-8 w-8 grid place-items-center rounded-lg transition duration-200 hover:bg-black/5 text-neutral-700`}
>
  <p class="text-xl font-bold">수</p>
</button>
<button
  type="button"
  on:click={() => {
    setDatebyDay(4)
  }}
  class={`${
    $focusedDate.getDay() == 4 ? "bg-black/10" : ""
  } h-8 w-8 grid place-items-center rounded-lg transition duration-200 hover:bg-black/5 text-neutral-700`}
>
  <p class="text-xl font-bold">목</p>
</button>
<button
  type="button"
  on:click={() => {
    setDatebyDay(5)
  }}
  class={`${
    $focusedDate.getDay() == 5 ? "bg-black/10" : ""
  } h-8 w-8 grid place-items-center rounded-lg transition duration-200 hover:bg-black/5 text-neutral-700`}
>
  <p class="text-xl font-bold">금</p>
</button>
<button
  type="button"
  on:click={() => {
    setDatebyDay(6)
  }}
  class={`${
    $focusedDate.getDay() == 6 ? "bg-black/10" : ""
  } h-8 w-8 grid place-items-center rounded-lg transition duration-200 hover:bg-black/5 text-neutral-700`}
>
  <p class="text-xl font-bold">토</p>
</button>
