<template>
  <div class="background">
    <div class="card">
      <h1>Polls web</h1>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
$green-primary: #D9ED92;
$green-secondary: #50B69A;
$blue-primary: #184E77;
$blue-secondary: #34A0A4;
$poll-white: #FAFAFA;

html, body {
  height: 100%;
  width: 100%;
  max-width: 100%;
}

.background {
  background: linear-gradient(90deg, $green-primary 0%, $green-secondary 40%, $blue-secondary 60%, $blue-primary 100%);

  box-sizing: border-box;
  min-height: 100vh;
  padding: 20px;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  justify-content: flex-start;
  align-items: center;
}

.card {
  background-color: $poll-white;
  box-sizing: border-box;
  padding: 20px;

  border-radius: 10px;

  min-width: 70%;
}
</style>
