<template>
<a-layout>
  <a-layout-header v-if="!userStore.loadingSession">
  <nav >
    <a-menu 
    theme="dark" 
    mode="horizontal" 
     :style="{ lineHeight: '64px' }"
      v-model:selectedKeys="selectedKeys">
      <a-menu-item  v-if="userStore.userData" key="home">
        <router-link to="/">Home</router-link>
      </a-menu-item>

      <a-menu-item v-if="!userStore.userData" key="login">
        <router-link to="/register" > Register</router-link>
      </a-menu-item>

      <a-menu-item  v-if="!userStore.userData" key="register">
        <router-link to="/login"> Login</router-link>
      </a-menu-item>

      <a-menu-item @click="userStore.logOutUser" v-if="userStore.userData" key="logout">
       Log out
      </a-menu-item>
    </a-menu>
   

   
    
  </nav>
</a-layout-header>
  <a-layout-content style="padding: 0 50px">
    <div class="container">
      <div v-if="userStore.loadingSession">loadingUser....</div>
      <router-view> </router-view>
    </div>
   
  </a-layout-content>


</a-layout>

</template>

<script setup>
import {useUserStore} from './stores/user'
import { useRoute } from 'vue-router';
import {ref, watch} from 'vue'

const route = useRoute()
const userStore = useUserStore()

const selectedKeys = ref(["login"])


watch(
   ()=> route.name, 
   ()=> {
    selectedKeys.value = [route.name]
   }
   )

</script>

<style>

.container{
  background-color: #fff;
  padding: 24px;
  min-height: cal(100vh - 64px)
}

.text-center{
  text-align: center;
}

</style>