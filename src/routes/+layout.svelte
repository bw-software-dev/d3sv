<script lang="ts">
  import "../app.css";
  const { children } = $props();
</script>

{#if children}
  {@render children()}
{/if}
