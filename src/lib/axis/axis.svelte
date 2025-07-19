<script lang="ts">
  import { easeCubicInOut, select } from "d3";
  import { FigureContext } from "../figure/figure-context.svelte";
  import { AxisContext } from "./axis-context.svelte";

  type TProps = {
    align: "left" | "right" | "top" | "bottom";
    lineColor?: string;
    tickColor?: string;
    textColor?: string;
  };

  const {
    align,
    lineColor = "black",
    tickColor = "black",
    textColor = "black",
  }: TProps = $props();

  const figureContext = FigureContext.get();
  const axisContext = AxisContext.create(align);
</script>

<g
  {@attach (g: SVGGElement) => {
    select(g)
      .attr("transform", axisContext.translate)
      .transition()
      .duration(figureContext.animationDuration)
      .ease(easeCubicInOut)
      .call(axisContext.axis);

    select(g).selectAll("line").attr("stroke", tickColor);
    select(g).selectAll("path").attr("stroke", lineColor);
    select(g).selectAll("text").attr("fill", textColor);
  }}
/>
