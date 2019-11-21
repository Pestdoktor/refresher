<script>
  export let tab;
</script>

<style>
  .tab {
    padding: 1rem;
    margin-left: 0.5rem;
    background-color: white;
    min-height: 100%;
    border-top-right-radius: 0.33rem;
    border-bottom-right-radius: 0.33rem;
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

<div class="tab">
  <input id="number" type="number" bind:value={tab.interval} />
  <input id="checkbox" type="checkbox" bind:checked={tab.active} />
  <label for="checkbox">aktiv</label>
</div>
