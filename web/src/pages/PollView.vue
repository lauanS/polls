<template>
  <h2>{{ loadingPoll ? 'Carregando...' : poll.title }}</h2>

  <form v-if="!loadingPoll">
    <div v-for="option in poll.options" :key="option.title">
      <button type="button">{{ option.title }}</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import client from '@/services/api';
import type { Poll } from '@/services/api'

let poll: Poll;
const loadingPoll = ref(false);

const getPoll = async () => {
  loadingPoll.value = true;

  poll = await client.getPollRequest('444bcb78-7e04-4e49-973f-f61dc27adede');

  loadingPoll.value = false;
}

getPoll();
</script>

<style scoped lang="scss">
$green-primary: #D9ED92;
$green-secondary: #50B69A;
$blue-primary: #184E77;
$blue-secondary: #34A0A4;
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
  border-color: $green-secondary;
}

button:active {
  background-color: $blue-secondary;
  border-color: $blue-secondary;
}

div~div {
  margin-top: 20px;
}
</style>
