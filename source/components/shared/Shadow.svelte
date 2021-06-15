<script lang="typescript">
	export let id: string;
	export let color: string;
	export let opacity = 0.75;
	export let offset = { x: 0, y: 5 };
	export let blur = 10;
</script>

<filter id="{id}_shadow" filterUnits="userSpaceOnUse">
	<feDropShadow
		dx={offset.x}
		dy={offset.y}
		stdDeviation={blur}
		flood-color={color}
		flood-opacity={opacity}
	/>
</filter>
