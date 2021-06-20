<script lang="ts">
	import Avatar from "./Avatar.svelte";
	import Logo from "./Logo.svelte";
	import { optionsBackground, optionsColor, optionsDefault } from "../helpers";

	import Case from "case";
	import { tick } from "svelte";

	import type { ComponentOptions } from "../types";

	export let asset: "avatar" | "logo";

	let color = optionsDefault.color;
	let background = optionsDefault.background;
	let shadow = optionsDefault.shadow;
	let animated = false;
	let duration = optionsDefault.animation!.duration;
	let renderPreview = true;

	async function rerenderPreview() {
		renderPreview = false;
		await tick();
		renderPreview = true;
	}

	function getSVGelement() {
		const id = `xeho91-${asset}`;
		const svgAssetEl = document.getElementById(id);

		if (svgAssetEl) {
			return svgAssetEl;
		} else {
			throw new Error(`Couldn't find this element by id: ${id}!`)
		}
	}

	function getSVGcode() {
		return new XMLSerializer().serializeToString(getSVGelement());
	}

	function getSVGbase64() {
		return btoa(getSVGcode());
	}

	function getPNGbase64() {
		// FIXME: Canvas doesn't render either `drop-shadow` of `feDropShadow`.
// 		const canvas = document.getElementById(`canvas-${asset}`) as HTMLCanvasElement;
// 		const svgEl = getSVGelement();
// 		// const canvas = new OffscreenCanvas(svgEl.clientWidth, svgEl.clientHeight);
// 		const ctx = canvas.getContext("2d");
//
// 		canvas.width = svgEl.clientWidth;
// 		canvas.height = svgEl.clientHeight;
//
// 		if (ctx) {
// 			const v = Canvg.fromString(ctx, getSVGcode());
//
// 			v.start();
//
// 			const dataUrl = canvas.toDataURL("image/png", 1.0);
// 			console.log(dataUrl);
// 		} else {
// 			throw new Error("Something went wrong with setting ctx.");
// 		}
		return "";
	}

	async function download(filename: string, contentType: "png" | "svg") {
		const pom = document.createElement('a');

		let href: string;

		if (contentType === "svg") {
			href = `data:image/svg+xml;base64,${getSVGbase64()}`;
		} else if (contentType === "png") {
			href = getPNGbase64();
		} else {
			throw new Error(`Wrong contentType: ${contentType}!`);
		}

		pom.setAttribute("href", href);
		pom.setAttribute("download", filename);

		if (document.createEvent) {
			const event = document.createEvent('MouseEvents');

			event.initEvent('click', true, true);
			pom.dispatchEvent(event);
		} else {
			pom.click();
		}
	}

	function downloadSVG() {
		download(`xeho91-${asset}.svg`, "svg");
	}

	function downloadPNG() {
		download(`xeho91-${asset}.png`, "png");
	}

	let options: ComponentOptions;

	$: options = {
		color,
		background,
		shadow,
		animation: animated ? { duration } : undefined
	}
	$: isBlackOrWhite = color === "black" || color === "white";
	$: {
		if (isBlackOrWhite) {
			background = "none";
		}
	}
</script>

<div class="generator">
	{#if renderPreview}
		<figure id="previewer-SVG_{asset}" class="asset-previewer">
			{#if asset === "avatar"}
				<Avatar {...options} />
			{:else if asset === "logo"}
				<Logo {...options} />
			{/if}
		</figure>
	{/if}

	<div id="options_{asset}" class="options-panel">
		<h2>{Case.capital(asset)} options</h2>

		<div class="option">
			<label for="{asset}-color">Color:</label>
			<select name="{asset}-color" bind:value={color}>
				{#each optionsColor as opt}
					<option value={opt}>{opt}</option>
				{/each}
			</select>
		</div>

		<div class="option">
			<label for="{asset}-background">Background:</label>
			<select name="{asset}-background" bind:value={background}>
				{#each optionsBackground as opt}
					<option
						value={opt}
						disabled={opt === "gradient" && isBlackOrWhite}
					>{opt}</option>
				{/each}
			</select>
		</div>


		<div class="option">
			<label for="{asset}-animmated">Animated:</label>
			<input
				type="checkbox"
				name="{asset}-animated"
				bind:checked={animated}
				on:change={rerenderPreview}
			>
		</div>

		{#if animated}
			<div class="option">
				<label for="{asset}-animation_duration">Duration <em>(miiliseconds)</em>:</label>
				<input
					type="number"
					name="{asset}-animation_duration"
					step="100"
					bind:value={duration}
					on:change={rerenderPreview}
				>
			</div>
		{/if}

		<div class="download-buttons">
			<h2>Download</h2>

			<button id="save-SVG_{asset}" on:click={downloadSVG}>SVG file</button>
			<button id="save-PNG_{asset}" on:click={downloadPNG} disabled>PNG file</button>
		</div>
	</div>
</div>

<style lang="postcss">
	.generator {
		width: calc(100% / 1.618);
		margin-bottom: 1em;
	}

	.asset-previewer {
		margin: 0;

		background-color: white;
		border: 0.25em solid var(--color-kilamanjaro);
	}

	.options-panel {
		display: flex;
		flex-direction: column;

		padding: 1em 2em;

		color: var(--color-pampas);

		background-color: var(--color-kilamanjaro);

		& > h2 {
			margin-top: 0.25em;
		}
	}

	.option {
		margin-bottom: 1ch;
	}
</style>
