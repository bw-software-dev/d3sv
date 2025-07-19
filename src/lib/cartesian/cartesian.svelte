<script lang="ts">
  import type { Snippet } from "svelte";
  import { CartesianContext } from "./cartesian-context.svelte";

  type TProps = {
    children?: Snippet;
    domainX?: [number, number];
    domainY?: [number, number];
  };

  const { children, domainX, domainY }: TProps = $props();

  CartesianContext.create(domainX, domainY);
</script>

{#if children}
  {@render children()}
{/if}
