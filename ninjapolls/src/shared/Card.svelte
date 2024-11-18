<script>
  let { children } = $props();
</script>

<div class="card">
  {@render children?.()}
</div>

<style>
  .card {
    background-color: #242424;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  }
</style>
