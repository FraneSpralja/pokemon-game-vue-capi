<template>
  <PokemonIntro v-if="intro" @setup-game="setupGame" />
  <PokemonGame v-else :setup="setupObj" @reset-game="intro = true" />
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import PokemonGame from './modules/pokemon/pages/PokemonGame.vue';
import PokemonIntro from './modules/pokemon/pages/PokemonIntro.vue';
import { type Setup } from './modules/pokemon/interfaces/';

const setupObj = reactive<Setup>({
  name: '',
  level: 0
})

const intro = ref<boolean>(true)

const setupGame = (setup: Setup) => {

  setupObj.name = setup.name
  setupObj.level = setup.level

  console.log(setupObj)

  intro.value = false

}
</script>