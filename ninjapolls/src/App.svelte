<script lang="ts">
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import PollList from "./components/PollList.svelte";
  import Tabs from "./shared/Tabs.svelte";
  import CreatePollForm from "./components/CreatePollForm.svelte";

  // tabs
  let items = ["Current Polls", "Add New Poll"];
  let activeItem = "Current Polls";

  interface PollObject {
    id: number;
    question: string;
    answerA: string;
    answerB: string;
    votesA: number;
    votesB: number;
  }

  function addPoll() {
    activeItem = "Current Polls";
  }
</script>

<Header />
<main>
  <Tabs
    {activeItem}
    {items}
    tabChange={(item) => {
      activeItem = item;
    }}
  />
  {#if activeItem === "Current Polls"}
    <PollList />
  {:else if activeItem === "Add New Poll"}
    <CreatePollForm {addPoll} />
  {/if}
</main>
<Footer />

<style>
  main {
    margin: 40px 80px;
  }
</style>
