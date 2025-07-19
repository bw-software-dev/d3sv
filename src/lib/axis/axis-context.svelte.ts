import {
	type Axis,
	axisBottom,
	axisLeft,
	axisRight,
	axisTop,
	type NumberValue,
} from "d3";
import { CartesianContext } from "../cartesian/cartesian-context.svelte";
import { ctx } from "../context-helper";
import { FigureContext } from "../figure/figure-context.svelte";

export class AxisContext {
	public _key = Symbol();
	private static _key = Symbol();
	public static get = () => ctx.get<AxisContext>(this._key);
	public static create = (align: "top" | "bottom" | "left" | "right") =>
		ctx.create(this._key, new AxisContext(align));

	private constructor(align: "top" | "bottom" | "left" | "right") {
		FigureContext.get().axis.push(this);
		this.align = $derived(align);
		const cartesianContext = CartesianContext.get();
		this.axis = $derived.by(() => {
			switch (align) {
				case "left":
					return axisLeft(cartesianContext.yScale);
				case "right":
					return axisRight(cartesianContext.yScale);
				case "top":
					return axisTop(cartesianContext.xScale);
				case "bottom":
					return axisBottom(cartesianContext.xScale);
			}
		});
	}

	private figureContext = FigureContext.get();

	public align: "top" | "bottom" | "left" | "right";
	public axis: Axis<NumberValue>;
	public translate = $derived.by(() => {
		const index =
			this.figureContext.axis
				.filter((a) => a.align === this.align)
				.indexOf(this) + 1;

		switch (this.align) {
			case "left":
				return `translate(${index * this.figureContext.axisSize.width},0)`;
			case "right":
				return `translate(${this.figureContext.width - index * this.figureContext.axisSize.width},0)`;
			case "top":
				return `translate(0, ${index * this.figureContext.axisSize.height})`;
			case "bottom":
				return `translate(0, ${this.figureContext.height - index * this.figureContext.axisSize.height})`;
		}
	});
}
