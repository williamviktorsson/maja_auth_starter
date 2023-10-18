<script lang="ts">
  // /routes/groups/+page.svelte

  import { browser } from "$app/environment";
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import type { PageData } from "./$types";

  export let data: PageData;
  export let form;

  browser ? setInterval(invalidateAll, 1000) : null;
</script>

<h1>groups</h1>

<ul>
  {#each data.groups as group}
    <li>
      <a href="/groups/{group.id}"
        >{group.name} - {group.messages.length} messages</a
      >
    </li>
  {/each}
</ul>

<hr />

<h1>New group</h1>

<form action="?/create" method="post" use:enhance>
  <input type="text" name="groupName" />
  <button>Create</button>
  {#if form?.groupName}
    <span>{form.groupName}</span>
  {/if}
</form>

<style>
  span {
    color: red;
    font-weight: bold;
  }
</style>
