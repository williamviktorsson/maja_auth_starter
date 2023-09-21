<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<nav>
  <a href="/sessions">Sessioner</a>
</nav>

<h1>Välkommen {data.username}</h1>

<form action="/login?/logout" method="post">
  <button>LOGOUT</button>
</form>
