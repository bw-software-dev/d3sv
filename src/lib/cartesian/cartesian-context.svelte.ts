import { extent, type ScaleContinuousNumeric, scaleLinear } from "d3";
import type { ScatterSeriesContext } from "$lib/scatter-series/scatter-series-context.svelte";
import { ctx } from "../context-helper";
import { FigureContext } from "../figure/figure-context.svelte";
import type { LineSeriesContext } from "../line-series/line-series-context.svelte";

export class CartesianContext {
	public _key = Symbol();
	private static _key = Symbol();
	public static get = () => ctx.get<CartesianContext>(this._key);
	public static create = (
		domainX?: [number, number],
		domainY?: [number, number],
	) => ctx.create(this._key, new CartesianContext(domainX, domainY));

	private constructor(domainX?: [number, number], domainY?: [number, number]) {
		const figureContext = FigureContext.get();

		this.xScale = $derived(
			scaleLinear(
				domainX === undefined
					? // auto range based on series
						(extent(this.series.flatMap((s) => s.data.map((d) => d[0]))) as [
							number,
							number,
						])
					: domainX,
				[
					figureContext.marginLeft,
					figureContext.width - figureContext.marginRight,
				],
			),
		);
		this.yScale = $derived(
			scaleLinear(
				domainY === undefined
					? // auto range based on series
						(extent(this.series.flatMap((s) => s.data.map((d) => d[1]))) as [
							number,
							number,
						])
					: domainY,
				[
					figureContext.height - figureContext.marginBottom,
					figureContext.marginTop,
				],
			),
		);
	}

	public series: (LineSeriesContext | ScatterSeriesContext)[] = $state([]);

	public xScale: ScaleContinuousNumeric<number, number, never>;
	public yScale: ScaleContinuousNumeric<number, number, never>;
}
