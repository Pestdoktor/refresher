<script>
  let interval = 0;
  let active = false;
  let original = undefined;
  const prod = typeof browser !== "undefined";
  let url = prod
    ? browser.devtools.inspectedPage.eval("window.location.href")
    : undefined;

  const handler = r => {
    if (r.request.url === url) {
      if (typeof this.original === "undefined") {
        this.original = r.response.bodySize;
      } else if (this.original !== r.response.bodySize) {
        this.original = undefined;
        return;
      }
      setTimeout(browser.devtools.inspectedWindow.reload, interval);
    }
  };

  $: if (prod && active) {
    browser.devtools.network.onRequestFinished.addListener(handler);
  } else if (prod) {
    browser.devtools.network.onRequestFinished.removeListener(handler);
  }
</script>

<style>
  main {
    background-color: black;
    padding: 1rem;
    display: inline-block;
    border-radius: 0.333rem;
  }
  div {
    background-color: white;
    padding: 1rem;
  }
  input#checkbox {
    display: none;
  }
  input#number {
    width: 5rem;
  }
  label {
    padding: 0.33rem 0.5rem;
    border: 2px solid black;
  }
  input:checked + label {
    background-color: green;
    color: white;
  }
</style>

<main>
  <div>
    <input id="number" type="number" bind:value={interval} />
    <input id="checkbox" type="checkbox" bind:checked={active} />
    <label for="checkbox">aktiv</label>
  </div>
</main>
