<template>
  <header>
    <TopBar />
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
     <!-- <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
       <RouterView />
    </div>
  </header>

    <!-- <div class="text-4xl m-8 bg-gray-100">
      Hello 👋🏼
    </div> -->

      <!-- <RouterView /> -->
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import TopBar from '@/components/TopBar.vue';

export default {
  components: {
    TopBar
  }
}
</script>

<style scoped>

</style>
