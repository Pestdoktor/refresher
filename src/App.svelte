<script>
  import Tablist from "./Tablist.svelte";
  import Tab from "./Tab.svelte";
  import { tabs } from "./store.js";
  let current = 0;

  browser.runtime.onMessage.addListener(({ name, reload }) => {
    tabs.add(name, reload);
  });
</script>

<style>
  main {
    background-color: black;
    padding: 1rem;
    display: inline-flex;
    border-radius: 0.333rem;
  }
</style>

<main>
  <Tablist tabs={$tabs} bind:current />
  <Tab bind:tab={$tabs[current]} />
</main>
