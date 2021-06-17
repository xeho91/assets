<script lang="typescript">
	// Shared components
	import Char from "../shared/Char.svelte";
	import CharAnimation from "../shared/CharAnimation.svelte";
	import Gradient from "../shared/Gradient.svelte";
	import Shadow from "../shared/Shadow.svelte";

	// Helpers
	import { chars } from "../helpers/paths";
	import {
		getColorBackground,
		getColorForeground,
		getColorShadow,
		getGradient,
	} from "../helpers/colors";
	import { getDuration, getPreviousChar } from "../helpers/animation";

	import type { AssetOptions } from "../types";

	export let options: AssetOptions;

	const { withBackground, backgroundType, withAnimation } = options;

	export const id = "xeho91-logo";
	export const width = 1200;
	export const height = 630;

	let colorBackground = getColorBackground(id, options);
	let colorForeground = getColorForeground(options);
</script>

<svg
	{id}
	role="img"
	aria-labelledby="{id}_title {id}_description"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 {width} {height}"
	preserveAspectRatio="xMinYMin meet"
>
	<title id="{id}_title">xeho91's logo</title>
	<desc id="{id}_description">It contains logotype painted in the style of
	quickly using a paintbrush on the wall. It's written "xeho91" here in
	capital letters.</desc>

	<defs>
		{#if withBackground}
			<rect id="{id}_background" width={width} height={height} />
		{/if}

		{#if backgroundType === "gradient"}
			<Gradient {id} colors={getGradient(options)} />
		{/if}

		<Shadow {id} color={getColorShadow(options)} />

		{#if withAnimation}
			<g id="{id}_animations">
				{#each Object.keys(chars) as name, index}
					<CharAnimation
						{name}
						data={chars[name]}
						color={colorForeground}
						duration={getDuration(options)}
						prevChar={getPreviousChar(index)}
					/>
				{/each}
			</g>
		{/if}

		<symbol id="{id}_logotype">
			{#each Object.keys(chars) as name}
				<Char {name} data={chars[name]} animated={withAnimation} />
			{/each}
		</symbol>
	</defs>

	{#if withBackground}
		<use href="#{id}_background" fill={colorBackground} />
	{/if}

	<use
		href="#{id}_logotype"
		fill={colorForeground}
		filter="url(#{id}_shadow)"
	/>
</svg>
