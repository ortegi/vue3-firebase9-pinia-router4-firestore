<template>
<div>
  <h1>App</h1>
  <nav v-if="!userStore.loadingSession">
    <router-link to="/" v-if="userStore.userData">Home</router-link>
    <router-link to="/register" v-if="!userStore.userData"> Register</router-link>
    <router-link to="/login" v-if="!userStore.userData"> Login</router-link>
    <button @click="userStore.logOutUser" v-if="userStore.userData">Log out</button>
  </nav>
  <div v-else>
    loadingUser....
  </div>
  <router-view> </router-view>
</div>

</template>

<script setup>
import {useUserStore} from './stores/user'
const userStore = useUserStore()


</script>