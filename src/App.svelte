<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte'
	import { text, morse } from './store.js';
	import Notification, { position } from './components/Notification.svelte';

	let morseRef = null;
	let notificationRef = null;

	const Clipboard = () => {
		morseRef.select();
		document.execCommand('copy');

		notificationRef.showTime({
			message: 'Translation copied to clipboard! 😄',
			duration: 3000,
			placement: position.BOTTOM_LEFT,
		});
	}

	onMount(() => text.set('Welcome to Yet Another Morse Translator'));
</script>


<!-- VIEW -->
<main>
	<textarea bind:value={$text}></textarea>
	<textarea bind:value={$morse} bind:this={morseRef}></textarea>

	{#if $morse.length > 0}
		<button transition:fade on:click={Clipboard}>Copy to clipboard</button>
	{/if}
</main>

<Notification bind:this={notificationRef} />

<p>Made with <a href="https://svelte.dev/">Svelte</a> - (<a href="https://github.com/">source</a>)</p>


<!-- STYLES -->

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		margin: 0;
		padding: 0;
	}

	:global(button) {
		border-width: 0;
		font-size: 14px;
		letter-spacing: 0.01em;
		text-transform: uppercase;
		margin: 0;
		cursor: pointer;
		border-radius: 4px;
		background-color: transparent;
	}

	main {
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: space-between;
		position: relative;
		background: #f8c291;
		padding: 2px;
	}

	textarea {
		display: block;
		resize: none;
		border-width: 0;
		width: calc(50% - 1px);
		height: 100%;
		padding: calc(17px + 15px);
		margin: 0;
		font-family: inherit;
		font-size: inherit;
	}

	textarea:focus {
		outline-width: 0;
	}

	button {
		position: fixed;
		z-index: 42;
		bottom: 15px;
		right: 15px;
		background-color: #f8c291;
		padding: 17px;
		box-shadow: 0 25px 10px -15px rgba(0, 0, 0, 0.05);
		font-weight: bold;
	}

	p {
		position: fixed;
		display: inline-block;
		bottom: 15px;
		left: 15px;
		padding: 17px;
		margin: 0;
		letter-spacing: 0.01em;
	}

	a {
		text-decoration: none;
		color: #ff3e00;
	}

	a:hover {
		text-decoration: underline;
	}

	@media (max-width: 780px) {
		main {
			flex-direction: column;
		}

		textarea {
			width: 100%;
			height: calc(50% - 1px);
		}
	}
	</style>