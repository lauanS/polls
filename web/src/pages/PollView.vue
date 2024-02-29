<template>
  <h2>{{ loadingPoll ? 'Carregando...' : poll.title }}</h2>

  <form v-if="!loadingPoll" :onsubmit="submitVote">
    <div v-for="option in poll.options" :key="option.title">
      <button
        :class="option.id === selectedPollOptionId ? 'selected' : ''"
        type="button"
        @click="() => selectPollOption(option.id)"
      >
        {{ option.title }}
      </button>
    </div>

    <div class="submit">
      <button type="submit">Vote</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import client from '@/services/api';
import type { Poll } from '@/services/api'

let poll: Poll;
const loadingPoll = ref(false);
const selectedPollOptionId = ref<undefined | string>(undefined);

const getPoll = async (): Promise<void> => {
  loadingPoll.value = true;

  poll = await client.getPollRequest('444bcb78-7e04-4e49-973f-f61dc27adede');

  loadingPoll.value = false;
};

const submitVote = async (event: SubmitEvent): Promise<void> => {
  event.preventDefault();

  await client.votePollRequest({
    pollId: poll.id,
    pollOptionId: String(selectedPollOptionId.value)
  });
}

const selectPollOption = (optionId: string): void => {
  selectedPollOptionId.value = optionId;
};

getPoll();
</script>

<style scoped lang="scss">
$green-primary: #D9ED92;
$green-primary-darker: #CAE666;
$green-secondary: #50B69A;
$green-secondary-darker: #3E957D;

$blue-primary: #184E77;
$blue-secondary: #34A0A4;
$blue-secondary-light: #92D9ED;
$poll-white: #FAFAFA;

button {
  border: 2px solid $green-primary;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 15px;
  width: 100%;
  display: block;
}

button:hover {
  border-color: $blue-secondary-light;
}

div~div {
  margin-top: 20px;
}

.selected {
  background-color: $blue-secondary-light;
  border-color: $blue-secondary-light;
  color: white;
}

.submit {
  button {
    background-color: $green-secondary;
    border: 2px solid $green-secondary;
    color: white;
  }

  button:hover {
    border-color: green-secondary-darker;
  }
}
</style>
