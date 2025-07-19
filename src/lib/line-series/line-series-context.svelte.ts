import { curveMonotoneX, type Line, line } from "d3";
import { CartesianContext } from "../cartesian/cartesian-context.svelte";
import { ctx } from "../context-helper";

export class LineSeriesContext {
	public _key = Symbol();
	private static _key = Symbol();
	public static get = () => ctx.get<LineSeriesContext>(this._key);
	public static create = () => ctx.create(this._key, new LineSeriesContext());

	private constructor() {
		CartesianContext.get().series.push(this);
		const cartesianContext = CartesianContext.get();
		this.drawCurve = $derived(
			line()
				.curve(curveMonotoneX)
				.x((d) => cartesianContext.xScale(d[0]))
				.y((d) => cartesianContext.yScale(d[1])),
		);
	}

	public data: [number, number][] = $state([]);
	public drawCurve: Line<[number, number]>;
}
