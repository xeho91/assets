<script lang="ts">
	import "../app.css";
</script>

<header>
	<h1>xeho91's assets generator</h1>
</header>

<main>
	<slot />
</main>

<footer>
	<p>Made with ❤️ for <a href="https://svelte.dev">Svelte</a>.
		Preview the source code on my
		<a href="https://github.com/xeho91/assets">GitHub repository</a>.</p>
</footer>

<style lang="postcss">
	header {
		--header-height: 5em;

		display: flex;
		flex-direction: row;
		place-content: center;
		place-items: center;

		height: var(--header-height);
		padding: 0.5em 0;
	}

	main {
		display: flex;
		flex-direction: column;
		place-items: center;

		size: 100%;
		padding: 1em;
	}

	footer {
		text-align: center;
	}
</style>
