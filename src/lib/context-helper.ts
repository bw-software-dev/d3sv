import { getContext, setContext } from "svelte";

export const ctx = {
	create<T>(key: symbol, instance: T) {
		return setContext(key, getContext<T>(key) ?? instance);
	},
	get<T>(key: symbol) {
		return getContext<Readonly<T>>(key);
	},
};
