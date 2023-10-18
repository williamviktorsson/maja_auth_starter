<script lang="ts">
  // /routes/groups/[group]/+page.svelte

  import { browser } from "$app/environment";
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { fade, } from "svelte/transition";
  import type { ActionData } from "./$types.js";

  export let data;
  export let form: ActionData;

  $: messages = [...data.messages].reverse();

  browser ? setInterval(invalidateAll, 1000) : null;
</script>

<h1>Välkommen till group: {data.group}</h1>

<form action="?/message" method="post" use:enhance>
  <input type="text" name="message" />
  <button>SEND</button>
  {#if form?.message}
    <span>{form.message}</span>
  {/if}
</form>

{#each messages as message}
  <div class:you={message.userId == data.you.id} transition:fade|local>
    {message.userId == data.you.id ? "You" : message.user.name} : {message.content}
    - {new Date(message.createdAt).toLocaleDateString("sv-SE", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })}
  </div>
{/each}

<style>
  span {
    color: red;
  }

  .you {
    text-align: right;
  }
</style>
