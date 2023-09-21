<script lang="ts">

// /routes/sessions/+page.svelte


  import { browser } from "$app/environment";
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import type { PageData } from "./$types";

  export let data: PageData;
  export let form;

  browser ? setInterval(invalidateAll, 1000) : null;
</script>

<h1>Sessions</h1>

<ul>
  {#each data.sessions as [session, messages]}
    <li>
      <a href="/sessions/{session}">{session} - {messages.length} messages</a>
    </li>
  {/each}
</ul>

<hr />

<h1>New session</h1>

<form action="?/create" method="post" use:enhance>
  <input type="text" name="sessionName" />
  <button>Create</button>
  {#if form?.sessionName}
    <span>{form.sessionName}</span>
  {/if}
</form>

<style>
  span {
    color: red;
    font-weight: bold;
  }
</style>
