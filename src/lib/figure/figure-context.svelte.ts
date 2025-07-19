import type { AxisContext } from "../axis/axis-context.svelte";
import { ctx } from "../context-helper";

export class FigureContext {
	public _key = Symbol();
	private static _key = Symbol();
	public static get = () => ctx.get<FigureContext>(this._key);
	public static create = () => ctx.create(this._key, new FigureContext());

	private constructor() {}

	public svg: SVGElement = $state(undefined as unknown as SVGElement);
	public width: number = $state(undefined as unknown as number);
	public height: number = $state(undefined as unknown as number);

	public axis: AxisContext[] = $state([]);

	public animationDuration = $state(300);

	public readonly axisSize = Object.freeze({ width: 40, height: 30 });

	public marginLeft = $derived(
		(this.axis.filter((a) => a.align === "left").length || 1) *
			this.axisSize.width,
	);
	public marginRight = $derived(
		(this.axis.filter((a) => a.align === "right").length || 1) *
			this.axisSize.width,
	);
	public marginTop = $derived(
		(this.axis.filter((a) => a.align === "top").length || 1) *
			this.axisSize.height,
	);
	public marginBottom = $derived(
		(this.axis.filter((a) => a.align === "bottom").length || 1) *
			this.axisSize.height,
	);
}
