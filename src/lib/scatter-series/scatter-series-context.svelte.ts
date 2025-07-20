import { CartesianContext } from "../cartesian/cartesian-context.svelte";
import { ctx } from "../context-helper";

export class ScatterSeriesContext {
	public _key = Symbol();
	private static _key = Symbol();
	public static get = () => ctx.get<ScatterSeriesContext>(this._key);
	public static create = () =>
		ctx.create(this._key, new ScatterSeriesContext());

	private constructor() {
		CartesianContext.get().series.push(this);
	}

	public data: [number, number][] = $state([]);
}
