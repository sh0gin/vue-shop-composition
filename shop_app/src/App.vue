<template>
  <div>
    <header-origin></header-origin>
    <!-- <app-register></app-register> -->
    <!-- <app-login></app-login> -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { provide, ref } from "vue";
import HeaderOrigin from "@/components/HeaderOrigin.vue";

let activeToken = ref(null);
let userStatus = ref(null);

const setActiveToken = (newToken) => {
  activeToken.value = newToken;
};

const setUserStatus = (status) => {
  userStatus.value = status;
};

provide("apiUrl", ref("http://web3-14-08-25.local/"));
provide("activeToken", activeToken);
provide("setActiveToken", setActiveToken);
provide("userStatus", userStatus);
provide("setUserStatus", setUserStatus);

// data() {},
// components: { HeaderOrigin },
</script>

<style scoped></style>
