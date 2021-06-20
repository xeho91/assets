<script lang="typescript">
	import Char from "./shared/Char.svelte";
	import CharAnimation from "./shared/CharAnimation.svelte";
	import Gradient from "./shared/Gradient.svelte";

	import {
		x as charXdata,
		getColorBackground,
		getColorForeground,
		getShadow,
		getGradient,
		getCharAnimationDuration,
		getPreviousChar,
		optionsDefault,
	} from "../helpers";

	import type { ComponentOptions } from "../types";

	export let color: ComponentOptions["color"] = optionsDefault.color;
	export let background: ComponentOptions["background"] = optionsDefault.background;
	export let shadow: ComponentOptions["shadow"] = optionsDefault.shadow;
	export let animation: ComponentOptions["animation"] = undefined;

	export const id = "xeho91-avatar";
	export const size = 630;
	export const frameSize = 20;

	const circleSize = size / 2;

	$: colorForeground = getColorForeground(color);
	$: colorBackground = getColorBackground(background, color, id);
	$: dropShadow = getShadow(shadow);
</script>

<svg
	{id}
	role="img"
	aria-labelledby="{id}_title {id}_description"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 {size} {size}"
	preserveAspectRatio="xMinYMin meet"
>
	<title id="{id}_title">xeho91's avatar</title>
	<desc id="{id}_description">It contains logomark - which is a letter "X" in the circle with a frame. The letter painted in the style of quickly using a paintbrush on the wall.</desc>

	<defs>
		{#if background !== "none"}
			<circle
				id="{id}_background"
				cx={circleSize}
				cy={circleSize}
				r={circleSize}
			/>
		{/if}

		<symbol id="{id}_frame">
			<path
				d="
					M {circleSize} 0
					A {circleSize} {circleSize} 0 0 0 0 {circleSize}
					A {circleSize} {circleSize} 0 0 0 {circleSize} {size}
					A {circleSize} {circleSize} 0 0 0 {size} {circleSize}
					A {circleSize} {circleSize} 0 0 0 {circleSize} 0
					z
					M {circleSize} {frameSize}
					A {circleSize - frameSize} {circleSize - frameSize} 0 0 1 {size - frameSize} {circleSize}
					A {circleSize - frameSize} {circleSize - frameSize} 0 0 1 {circleSize} {size - frameSize}
					A {circleSize - frameSize} {circleSize - frameSize} 0 0 1 {frameSize} {circleSize}
					A {circleSize - frameSize} {circleSize - frameSize} 0 0 1 {circleSize} {frameSize}
					z
				" />
		</symbol>

		{#if background === "gradient"}
			<Gradient {id} colors={getGradient(color)} />
		{/if}

		{#if animation}
			<CharAnimation
				name="x"
				data={charXdata}
				color={colorForeground}
				duration={getCharAnimationDuration(animation?.duration)}
				prevChar={getPreviousChar(0)}
			/>
		{/if}

		<!-- FIXME: Temporarily use transform until I figure out to make it automated. -->
		<symbol id="{id}_logomark">
			<Char
				name="x"
				data={charXdata}
				animated={animation ? true : false}
				transform="matrix(2.6178896,0,0,2.6178896,-444.98648,-588.03971)"
			/>
		</symbol>
	</defs>

	{#if background !== "none"}
		<use href="#{id}_background" fill={colorBackground} />
	{/if}

	<use href="#{id}_frame" fill={colorForeground} filter={dropShadow} />

	<use href="#{id}_logomark" fill={colorForeground} filter={dropShadow} />
</svg>
