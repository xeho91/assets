<script lang="typescript">
	import type {
		CharData,
		PathData,
		PositionX,
		PositionY
	} from "$components/helpers/paths";
	import type { PreviousChar } from "$components/helpers/previousChar";

	export let name: string;
	export let data: CharData;
	export let color: string;
	export let duration = 200;
	export let prevChar: PreviousChar | null;

	function parseCoordinate(coordinate: PositionX | PositionY) {
		switch (coordinate) {
			case "left":
			case "bottom":
				return "0%";
			case "middle":
			case "center":
				return "50%";
			case "right":
			case "top":
				return "100%";
		}
	}

	function getCoordinates({ from, to }: PathData) {
		let [ startX, startY ] = from;
		let [ endX, endY ] = to;

		let x1 = parseCoordinate(startX);
		let y1 = parseCoordinate(startY);
		let x2 = parseCoordinate(endX);
		let y2 = parseCoordinate(endY);

		return { x1, y1, x2, y2 };
	}

	/*
	 * NOTE: Id must be with underscore, don't add dash.
	 * The reason is that with dash,
	 * it won't be possible to use "animationId.end"
	 */
	function setAnimationId(charName: string, pathName: string) {
		return `animation_${charName}_${pathName}`;
	}

	function getLastAnimationId(index: number) {
		const currentCharLastPathName = Object.keys(data)[index - 1];

		if (currentCharLastPathName) {
			return `${setAnimationId(name, currentCharLastPathName)}.end`;
		} else if (prevChar) {
			const { name, lastPath } = prevChar;

			return `${setAnimationId(name, lastPath)}.end`;
		} else {
			return 0;
		}
	}
</script>

<g id="char-animation_{name}">
	{#each Object.keys(data) as pathName, index}
		<linearGradient
			id="gradient-{name}_{pathName}"
			{...getCoordinates(data[pathName])}
		>
			<stop offset="100" stop-color={color} stop-opacity="0">
				<animate
					id={setAnimationId(name, pathName)}
					attributeName="offset"
					values="1; 0"
					dur="{duration / 1000}s"
					begin={getLastAnimationId(index)}
					fill="freeze"
				/>
			</stop>

			<stop offset="0" stop-color={color} stop-opacity="1" />
		</linearGradient>
	{/each}
</g>
