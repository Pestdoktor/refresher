<script>
  let interval = 0;
  let active = false;
  let originalSize = undefined;
  let originalContent = "";
  let content = "";
  const prod = typeof browser !== "undefined";
  let url;
  if (prod) {
    browser.devtools.inspectedWindow
      .eval("window.location.href")
      .then(([result]) => (url = result));
  }

  function stopHandler() {
    browser.devtools.network.onRequestFinished.removeListener(handler);
    active = false;
    originalSize = undefined;
    originalContent = "";
    content = "";
  }

  function handler(r) {
    if (r.request.url === url) {
      r.getContent().then(([c]) => {
        content = c;
      });
      if (typeof originalSize === "undefined") {
        originalSize = r.response.bodySize;
      } else if (originalSize !== r.response.bodySize) {
        stopHandler();
        return;
      }
      setTimeout(browser.devtools.inspectedWindow.reload, interval * 1000);
    }
  }

  $: if (originalContent !== "") {
    if (originalContent !== content) {
      stopHandler();
    }
  } else {
    originalContent = content;
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
