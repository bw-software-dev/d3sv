<script lang="ts">
  import { easeCubicInOut, select } from "d3";
  import { CartesianContext } from "$lib/cartesian/cartesian-context.svelte";
  import { FigureContext } from "../figure/figure-context.svelte";
  import { ScatterSeriesContext } from "./scatter-series-context.svelte";

  type TProps = { data: [number, number][]; color?: string };

  const { data, color = "black" }: TProps = $props();

  const figureContext = FigureContext.get();
  const cartesianContext = CartesianContext.get();
  const scatterSeriesContext = ScatterSeriesContext.create();

  $effect(() => {
    scatterSeriesContext.data = data;
  });
</script>

<g
  {@attach (g: SVGPathElement) => {
    const circles = select(g)
      .selectAll("circle")
      .attr("fill", color)
      .style("opacity", 1)
      .attr("r", 3)
      .data(data);

    circles.exit().remove();

    circles
      .enter()
      .append("circle")
      .attr("cx", (d) => cartesianContext.xScale(d[0]))
      .attr("cy", (d) => cartesianContext.yScale(d[1]));

    circles
      .transition()
      .duration(figureContext.animationDuration)
      .ease(easeCubicInOut)
      .attr("cx", (d) => cartesianContext.xScale(d[0]))
      .attr("cy", (d) => cartesianContext.yScale(d[1]));
  }}
>
</g>
