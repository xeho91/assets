<script lang="typescript">
	import Char from "./shared/Char.svelte";
	import CharAnimation from "./shared/CharAnimation.svelte";
	import Gradient from "./shared/Gradient.svelte";

	import {
		chars,
		getColorBackground,
		getColorForeground,
		getShadow,
		getGradient,
		getCharAnimationDuration,
		getPreviousChar,
		optionsDefault
	} from "../helpers";

	import type { ComponentOptions } from "../types";

	export let color: ComponentOptions["color"] = optionsDefault.color;
	export let background: ComponentOptions["background"] = optionsDefault.background;
	export let shadow: ComponentOptions["shadow"] = optionsDefault.shadow;
	export let animation: ComponentOptions["animation"] = undefined;

	export const id = "xeho91-logo";
	export const width = 1200;
	export const height = 630;

	$: colorBackground = getColorBackground(background, color, id);
	$: colorForeground = getColorForeground(color);
	$: dropShadow = getShadow(shadow);
</script>

<svg
	{id}
	role="img"
	aria-labelledby="{id}_title {id}_description"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 {width} {height}"
	preserveAspectRatio="xMinYMin meet"
	class={$$props.class}
>
	<title id="{id}_title">xeho91's logo</title>
	<desc id="{id}_description">It contains logotype painted in the style of quickly using a paintbrush on the wall. It's written "xeho91" here in capital letters.</desc>

	<defs>
		{#if background !== "none"}
			<rect id="{id}_background" width={width} height={height} />
		{/if}

		{#if background === "gradient"}
			<Gradient {id} colors={getGradient(color)} />
		{/if}

		{#if animation}
			<g id="{id}_animations">
				{#each Object.keys(chars) as name, index}
					<CharAnimation
						{name}
						data={chars[name]}
						color={colorForeground}
						duration={getCharAnimationDuration(animation?.duration)}
						prevChar={getPreviousChar(index)}
					/>
				{/each}
			</g>
		{/if}

		<symbol id="{id}_logotype">
			{#each Object.keys(chars) as name}
				<Char
					{name}
					data={chars[name]}
					animated={animation ? true : false}
				/>
			{/each}
		</symbol>
	</defs>

	{#if background !== "none"}
		<use href="#{id}_background" fill={colorBackground} />
	{/if}

	<use href="#{id}_logotype" fill={colorForeground} filter={dropShadow} />
</svg>
