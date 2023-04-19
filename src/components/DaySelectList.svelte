<script lang="ts">
  import { focusedDate } from "../utils/atoms"
</script>

<button
  type="button"
  class={`${$focusedDate.getDay() == 0 ? "bg-black/10" : ""} h-8 w-8 grid place-items-center rounded-lg transition duration-200 hover:bg-black/5 text-neutral-700`}
>
  <p class="text-xl font-bold">일</p>
</button>
<button
  type="button"
  class={`${$focusedDate.getDay() == 1 ? "bg-black/10" : ""} h-8 w-8 grid place-items-center rounded-lg transition duration-200 hover:bg-black/5 text-neutral-700`}
>
  <p class="text-xl font-bold">월</p>
</button>
<button
  type="button"
  class={`${$focusedDate.getDay() == 2 ? "bg-black/10" : ""} h-8 w-8 grid place-items-center rounded-lg transition duration-200 hover:bg-black/5 text-neutral-700`}
>
  <p class="text-xl font-bold">화</p>
</button>
<button
  type="button"
  class={`${$focusedDate.getDay() == 3 ? "bg-black/10" : ""} h-8 w-8 grid place-items-center rounded-lg transition duration-200 hover:bg-black/5 text-neutral-700`}
>
  <p class="text-xl font-bold">수</p>
</button>
<button
  type="button"
  class={`${$focusedDate.getDay() == 4 ? "bg-black/10" : ""} h-8 w-8 grid place-items-center rounded-lg transition duration-200 hover:bg-black/5 text-neutral-700`}
>
  <p class="text-xl font-bold">목</p>
</button>
<button
  type="button"
  class={`${$focusedDate.getDay() == 5 ? "bg-black/10" : ""} h-8 w-8 grid place-items-center rounded-lg transition duration-200 hover:bg-black/5 text-neutral-700`}
>
  <p class="text-xl font-bold">금</p>
</button>
<button
  type="button"
  class={`${$focusedDate.getDay() == 6 ? "bg-black/10" : ""} h-8 w-8 grid place-items-center rounded-lg transition duration-200 hover:bg-black/5 text-neutral-700`}
>
  <p class="text-xl font-bold">토</p>
</button>
