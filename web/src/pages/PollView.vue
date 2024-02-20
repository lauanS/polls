<template>
  <h2>{{ poll.name }}</h2>

  <form>
    <div v-for="option in poll.options" :key="option.name">
      <button type="button">{{ option.name }}</button>
    </div>
  </form>
</template>

<script setup lang="ts">
const poll = {
  name: 'What is your favorite basic land type?',
  options: [
    { name: 'Swamp', score: 6 },
    { name: 'Mountain', score: 5 },
    { name: 'Forest', score: 10 },
    { name: 'Plains', score: 2 },
    { name: 'Island', score: 4 }
  ]
}
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
