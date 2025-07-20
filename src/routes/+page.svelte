<script lang="ts">
  import { Axis, Cartesian, Figure, LineSeries } from "$lib";
  import ScatterSeries from "$lib/scatter-series/scatter-series.svelte";

  const randomData = (len = 10) =>
    Array.from(Array(len)).map(
      (_, i, arr) =>
        [i * (1 / arr.length), Math.random() * 3] as [number, number]
    );

  let series1 = $state(randomData(20));
  setInterval(() => {
    series1 = randomData(20);
  }, 1000);

  let series2 = $state(randomData(20));
  setInterval(() => {
    series2 = randomData(20);
  }, 1000);
</script>

<div class="flex justify-center p-20">
  <div class="flex h-100 max-w-150 grow border">
    <Figure class="size-full">
      <Cartesian domainY={[0, 5]}>
        <Axis align="left" />
        <Axis align="bottom" />
        <LineSeries data={series1} color="blue" />
      </Cartesian>
      <Cartesian>
        <Axis align="left" />
        <Axis align="bottom" />
        <LineSeries data={series2} color="green" />
      </Cartesian>
    </Figure>
  </div>
</div>
