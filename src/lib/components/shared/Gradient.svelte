<script lang="typescript">
	import type { GradientDirection } from "../../types";

	export let id: string;
	export let colors: string[];
	export let gradientDirection: GradientDirection = "vertical";

	const getGradientTransform = () => {
		switch(gradientDirection) {
			case "horizontal":
				return 0;
			case "diagonal":
				return 45;
			case "vertical":
			default:
				return 90;
		}
	};
</script>

<linearGradient
	id="{id}_gradient"
	gradientTransform="rotate({getGradientTransform()})"
>
	{#each colors as color, index}
		<stop
			offset={((100 / (colors.length - 1)) * index) + "%"}
			stop-color={color}
		/>
	{/each}
</linearGradient>
