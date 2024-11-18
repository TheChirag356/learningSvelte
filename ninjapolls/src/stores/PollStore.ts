import { writable } from "svelte/store";

interface Poll {
    id: number;
    question: string;
    answerA: string;
    answerB: string;
    votesA: number;
    votesB: number;
}

const PollStore = writable<Poll[]>([
    {
        id: 1,
        question: "Python or Javascript?",
        answerA: "Python",
        answerB: "Javascript",
        votesA: 9,
        votesB: 10,
    },
]);

export default PollStore;