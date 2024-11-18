<script>
  import { preventDefault } from "svelte/legacy";
  import Button from "../shared/Button.svelte";
  import PollStore from "../stores/PollStore";

  let { addPoll } = $props();

  let fields = {
    question: "",
    answerA: "",
    answerB: "",
  };
  let errors = {
    question: "",
    answerA: "",
    answerB: "",
  };
  let valid = false;
  const submitHandler = () => {
    valid = true;

    // validate question
    if (fields.question.trim().length < 5) {
      valid = false;
      errors.question = "Question must be at least 5 characters long";
    } else {
      errors.question = "";
    }

    //validate answerA
    if (fields.answerA.trim().length < 1) {
      valid = false;
      errors.answerA = "Answer A cannot be empty";
    } else {
      errors.answerA = "";
    }

    //validate answerB
    if (fields.answerB.trim().length < 1) {
      valid = false;
      errors.answerB = "Answer A cannot be empty";
    } else {
      errors.answerB = "";
    }

    // add new poll
    if (valid) {
      let poll = { ...fields, votesA: 0, votesB: 0, id: Math.random() };
      PollStore.update((currentPolls) => [poll, ...currentPolls]);
      addPoll();
    }
  };
</script>

<!-- svelte-ignore event_directive_deprecated -->
<form on:submit|preventDefault={submitHandler}>
  <div class="form-field">
    <label for="question">Poll Question:</label>
    <input type="text" id="question" bind:value={fields.question} />
  </div>
  <div class="error">{errors.question}</div>
  <div class="form-field">
    <label for="answer-a">Answer A:</label>
    <input type="text" name="" id="answer-a" bind:value={fields.answerA} />
  </div>
  <div class="error">{errors.answerA}</div>
  <div class="form-field">
    <label for="answer-b">Answer B:</label>
    <input type="text" name="" id="answer-b" bind:value={fields.answerB} />
  </div>
  <div class="error">{errors.answerB}</div>

  <Button type="secondary" flat={true}>Add Poll</Button>
</form>

<style>
  form {
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  form > div {
    margin-bottom: 20px;
    text-align: left;
  }
  .form-field {
    margin-bottom: 20px auto;
  }
  input {
    width: 100%;
    border-radius: 6px;
    margin-top: 4px;
    padding: 8px;
    background-color: #242424;
  }
  label {
    margin: 10px auto;
    text-align: left;
  }
  .error {
    font-weight: bold;
    font-size: 12px;
    color: #d91b42;
  }
</style>
