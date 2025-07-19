<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";
  import { FigureContext } from "./figure-context.svelte";

  const props: SVGAttributes<SVGElement> = $props();

  const figureContext = FigureContext.create();
</script>

<svg
  bind:this={figureContext.svg}
  bind:clientWidth={figureContext.width}
  bind:clientHeight={figureContext.height}
  {...props}
>
  {#if props.children && figureContext.svg && figureContext.width && figureContext.height}
    {@render props.children()}
  {/if}
</svg>
