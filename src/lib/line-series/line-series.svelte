<script lang="ts">
  import { easeCubicInOut, select } from "d3";
  import { FigureContext } from "../figure/figure-context.svelte";
  import { LineSeriesContext } from "./line-series-context.svelte";

  type TProps = { data: [number, number][]; color?: string };

  const { data, color = "black" }: TProps = $props();

  const figureContext = FigureContext.get();
  const lineSeriesContext = LineSeriesContext.create();

  $effect(() => {
    lineSeriesContext.data = data;
  });
</script>

<g>
  <path
    {@attach (path: SVGPathElement) => {
      select(path)
        .datum(data)
        .transition()
        .duration(figureContext.animationDuration)
        .ease(easeCubicInOut)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 1.5)
        .attr("d", lineSeriesContext.drawCurve);
    }}
  />
</g>
