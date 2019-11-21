<script>
	export let tabs
	export let current
</script>

<ul>
{#each tabs as tab, i (tab)}
	<li on:click={() => current = i} class:selected={current === i} class:active={tab.active}>{i + 1}: {tab.name}</li>
{/each}
</ul>

<style>
	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
	li {
		background-color: gray;
		margin: .5rem 0;
		padding: .33rem .67rem;
		color: white;
		border-top-left-radius: .33rem;
		border-bottom-left-radius: .33rem;
	}
	ul li:first-child {
		margin-top: 0;
	}
	ul li:last-child {
		margin-bottom: 0;
	}
	li.selected {
		background-color: white;
		color: black;
	}
	li.active {
		background-color: green;
	}
</style>
