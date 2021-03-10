<template>
    <div class="brand">
        Trade Warriors
    </div>
    <Toast position="top-right" />
    <TabMenu :model="tabItems" />
    <div class="tab-container">
      <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AccountResponse } from 'spacetraders-sdk/dist/types';

export default defineComponent({
    name: 'App',
    data() {
        return {
            tabItems: [
                { label: 'Game', icon: 'pi pi-fw pi-user', to: '/' },
                { label: 'Settings', icon: 'pi pi-fw pi-cog', to: '/settings' },
            ]
        }
    },
    mounted() {
        this.$store.state.username = localStorage.getItem('username') ?? '';
        this.$store.state.token = localStorage.getItem('token') ?? '';

        this.$space.getAccount(this.$store.state.username, this.$store.state.token)
        .then((account: AccountResponse) => {
            this.$store.commit('SET_ACCOUNT', {
                credits: account.user.credits,
                ships: account.user.ships,
                loans: account.user.loans
            });
        })
        .catch((err: Error) => {
            this.$toast.add({severity: 'error', summary: `Error trying to log on ${this.$store.state.username}`, detail: err.message, life: 3000});
        });
    },
});
</script>

<style lang="scss">
html {
    background-color: #222;
}


.brand {
  font-family: 'Brush Script MT', cursive;
  font-size: 2.8em;
  font-weight: 800;
  color: gold;
  text-align: left;
  text-shadow: 0px 0px 22px #ff0;
  animation: glow 1s ease-in-out infinite alternate;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #cad5dd;
    margin-top: 10px;
}

.p-tabmenu {
    text-align: center;
    background-color: red i !important;
}

.tab-container {
    margin: 0.5em 0 0.5em 0;
}
</style>
