<script>
  let interval = 0;
  let active = false;
  let original = undefined;
  let originalContent = undefined;
  const prod = typeof browser !== "undefined";
  let url;
  if (prod) {
    browser.devtools.inspectedWindow
      .eval("window.location.href")
      .then(([result]) => (url = result));
  }

  function stopHandler() {
    active = false;
    original = undefined;
    originalContent = undefined;
    browser.devtools.network.onRequestFinished.removeListener(handler);
  }

  function compareContent([c]) {
    if (typeof originalContent === "undefined") {
      originalContent = c;
    } else if (originalContent !== c) {
      stopHandler();
    }
  }

  function handler(r) {
    if (r.request.url === url) {
      r.getContent().then(compareContent);
      if (typeof original === "undefined") {
        original = r.response.bodySize;
      } else if (original !== r.response.bodySize) {
        stopHandler();
        return;
      }
      setTimeout(browser.devtools.inspectedWindow.reload, interval);
    }
  }

  $: if (prod && active) {
    browser.devtools.network.onRequestFinished.addListener(handler);
    browser.devtools.inspectedWindow.reload();
  } else if (prod) {
    stopHandler();
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
