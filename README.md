# d3sv

A declarative and reactive wrapper for D3.js built with Svelte 5. Create beautiful, animated data visualizations with minimal code using Svelte's reactive primitives.

## Features

- **Declarative API**: Write charts using Svelte components instead of imperative D3 code
- **Reactive Animations**: Automatic smooth transitions when data changes
- **TypeScript Support**: Full type safety with TypeScript
- **Svelte 5 Compatible**: Built with the latest Svelte 5 runes and features
- **Flexible Layout**: Support for multiple cartesian coordinate systems
- **Customizable Styling**: Easy color and style customization

## Installation (WIP)

```bash
npm install d3sv
```

### Peer Dependencies

This library requires:
- `d3` ^7.0.0
- `svelte` ^5.0.0

## Quick Start

```svelte
<script>
  import { Figure, Cartesian, Axis, LineSeries } from 'd3sv';
  
  let data = $state([
    [0, 1], [1, 3], [2, 2], [3, 4], [4, 1]
  ]);
  
  // Update data every second
  setInterval(() => {
    data = Array.from({ length: 5 }, (_, i) => [
      i, Math.random() * 5
    ]);
  }, 1000);
</script>

<Figure width={400} height={300}>
  <Cartesian>
    <Axis align="left" />
    <Axis align="bottom" />
    <LineSeries {data} color="blue" />
  </Cartesian>
</Figure>
```

## Components

### Figure

The root container for all visualizations. Provides the SVG context and manages dimensions.

```svelte
<Figure width={600} height={400}>
  <!-- Your chart components here -->
</Figure>
```

**Props:**
- All standard SVG attributes
- `width` and `height` for chart dimensions

### Cartesian

Defines a cartesian coordinate system with automatic scaling based on data.

```svelte
<Cartesian domainX={[0, 10]} domainY={[0, 100]}>
  <!-- Series and axes -->
</Cartesian>
```

**Props:**
- `domainX?: [number, number]` - Optional X-axis domain
- `domainY?: [number, number]` - Optional Y-axis domain
- `children?: Snippet` - Chart content

### Axis

Renders D3 axes with automatic positioning and styling.

```svelte
<Axis 
  align="left" 
  lineColor="black" 
  tickColor="gray" 
  textColor="black" 
/>
```

**Props:**
- `align: "left" | "right" | "top" | "bottom"` - Axis position
- `lineColor?: string` - Color of the axis line (default: "black")
- `tickColor?: string` - Color of tick marks (default: "black")
- `textColor?: string` - Color of tick labels (default: "black")

### LineSeries

Renders line charts with smooth animations.

```svelte
<LineSeries data={points} color="blue" />
```

**Props:**
- `data: [number, number][]` - Array of [x, y] coordinate pairs
- `color?: string` - Line color (default: "black")

### ScatterSeries

Renders scatter plots with animated points.

```svelte
<ScatterSeries data={points} color="red" />
```

**Props:**
- `data: [number, number][]` - Array of [x, y] coordinate pairs
- `color?: string` - Point color (default: "black")

## Advanced Usage

### Multiple Series

```svelte
<Figure width={600} height={400}>
  <Cartesian>
    <Axis align="left" />
    <Axis align="bottom" />
    <LineSeries data={series1} color="blue" />
    <LineSeries data={series2} color="red" />
    <ScatterSeries data={series2} color="red" />
  </Cartesian>
</Figure>
```

### Multiple Cartesian Systems

```svelte
<Figure width={600} height={400}>
  <Cartesian domainY={[0, 5]}>
    <Axis align="left" />
    <Axis align="bottom" />
    <LineSeries data={series1} color="blue" />
  </Cartesian>
  <Cartesian>
    <Axis align="left" />
    <Axis align="bottom" />
    <LineSeries data={series2} color="green" />
    <ScatterSeries data={series2} color="green" />
  </Cartesian>
</Figure>
```

### Reactive Data Updates

```svelte
<script>
  let data = $state([]);
  
  // Update data reactively
  $effect(() => {
    data = generateNewData();
  });
</script>

<Figure width={400} height={300}>
  <Cartesian>
    <Axis align="left" />
    <Axis align="bottom" />
    <LineSeries {data} color="purple" />
  </Cartesian>
</Figure>
```

## Animation

All components support smooth animations when data changes. The default animation duration is 300ms with cubic easing. Animations are automatically triggered when:

- Data arrays change
- Component props update
- Series are added or removed

## Styling

Components accept standard SVG attributes and can be styled with CSS:

```svelte
<Figure 
  width={400} 
  height={300} 
  class="my-chart"
  style="border: 1px solid #ccc;"
>
  <!-- Chart content -->
</Figure>
```

## TypeScript

The library is fully typed with TypeScript. All components and their props are properly typed for excellent IDE support.

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build library
pnpm run build
```
