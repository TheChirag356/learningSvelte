<script>
  import Card from "../shared/Card.svelte";
  import PollStore from "../stores/PollStore";
  import Button from "../shared/Button.svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  let { poll } = $props();

  let totalVotes = $derived(poll.votesA + poll.votesB);
  let percentA = $derived(Math.floor((100 / totalVotes) * poll.votesA) || 0);
  let percentB = $derived(Math.floor((100 / totalVotes) * poll.votesB) || 0);

  // tweened percentages
  const tweenedA = tweened(percentA, {
    duration: 300,
    easing: cubicOut,
  });
  const tweenedB = tweened(percentB, {
    duration: 300,
    easing: cubicOut,
  });

  $effect(() => {
    tweenedA.set(percentA);
    tweenedB.set(percentB);
  });

  // handling votes
  const handleVote = (option, id) => {
    PollStore.update((currentPolls) => {
      let copiedPolls = [...currentPolls];
      let upvotedPoll = copiedPolls.find((poll) => poll.id === id);
      if (option === "a") {
        upvotedPoll.votesA++;
      }
      if (option === "b") {
        upvotedPoll.votesB++;
      }

      return copiedPolls;
    });
  };

  const handleDelete = (id) => {
    PollStore.update((currentPolls) =>
      currentPolls.filter((poll) => poll.id !== id)
    );
  };
</script>

<Card>
  <div class="poll">
    <h3>{poll.question}</h3>
    <p>Total Votes: {totalVotes}</p>
    <div class="answer" onclick={() => handleVote("a", poll.id)}>
      <div class="percent percent-a" style="width: {$tweenedA}%;"></div>
      <span>{poll.answerA} ({poll.votesA})</span>
    </div>
    <div class="answer" onclick={() => handleVote("b", poll.id)}>
      <div class="percent percent-b" style="width: {$tweenedB}%;"></div>
      <span>{poll.answerB} ({poll.votesB})</span>
    </div>
  </div>
  <div class="delete">
    <Button flat={true} on:click={() => handleDelete(poll.id)}>Delete</Button>
  </div>
</Card>

<style>
  h3 {
    margin: 0 auto;
    color: #c9c9c9;
  }
  p {
    margin-top: 6px;
    font-size: 14px;
    color: #aaa;
    margin-bottom: 30px;
  }
  .answer {
    background: #393939;
    cursor: pointer;
    margin: 10px auto;
    position: relative;
    border-radius: 4px;
    user-select: none;
  }
  .answer:hover {
    opacity: 0.6;
  }
  span {
    display: inline-block;
    padding: 10px 20px;
  }
  .percent {
    height: 100%;
    position: absolute;
    box-sizing: border-box;
  }
  .percent-a {
    border-left: 4px solid #d91b42;
    background: rgba(217, 27, 66, 0.2);
  }
  .percent-b {
    border-left: 4px solid #45c496;
    background: rgba(69, 196, 150, 0.2);
  }
  .delete {
    text-align: center;
    margin-top: 30px;
  }
</style>
