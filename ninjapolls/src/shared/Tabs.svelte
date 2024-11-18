<script lang="ts">
  let { activeItem, items, tabChange } = $props<{
    activeItem: string;
    items: Array<string>;
    tabChange: (item: string) => void;
  }>();
</script>

<div class="tabs">
  <ul>
    {#each items as item}
      <li onclick={() => tabChange(item)}>
          <div class:active={item === activeItem}>{item}</div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .tabs {
    margin-bottom: 40px;
  }
  ul {
    display: flex;
    justify-content: center;
    padding: 0;
    list-style-type: none;
  }
  li {
    margin: 0 16px;
    font-size: 18px;
    color: #555;
    cursor: pointer;
  }
  .active {
    color: #d91b42;
    border-bottom: 2px solid #d91b42;
    padding-bottom: 8px;
  }
</style>
