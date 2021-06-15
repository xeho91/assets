<script lang="typescript">
	export let id: string;
	export let colors: string[];

	type Directions = "vertical" | "diagonal" | "horizontal";

	export let gradientDirection: Directions = "vertical";

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
