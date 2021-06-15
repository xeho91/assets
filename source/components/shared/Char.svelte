<script lang="typescript">
	import type { CharData } from "../helpers/paths";

	export let name: string;
	export let data: CharData;
	export let animated: boolean;
	export let transform: string | undefined = undefined;

	function getFill(pathName: string) {
		if (animated) {
			return `url(#gradient-${name}_${pathName})`;
		}
	}
</script>

<g id="char_{name}" {transform}>
	{#each Object.keys(data) as pathName}
		<path
			id="{name}-{pathName}"
			d={data[pathName].d}
			fill={getFill(pathName)}
		/>
	{/each}
</g>
