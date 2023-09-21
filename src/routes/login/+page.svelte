<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types.js";

  export let form: ActionData;
  export let data;
</script>

<form method="post" action="?/login" use:enhance>
  <label for="name">Username</label>
  <input type="text" name="username" />
  <label for="name">Password</label>
  <input type="text" name="password" />
  <button>login</button>
  {#if form?.username}
    <span style="color: red;">{form.username}</span>
  {/if}
  {#if form?.password}
    <span style="color: red;">{form.password}</span>
  {/if}
</form>
