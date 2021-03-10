<template>
    <div class="page">
        <div style="display: flex;">
            <div class="brand">
                Trade Warriors
            </div>
            <div class="github">
                <a href="https://github.com/thaurin/trade-warriors" target="_blank">
                    <i class="pi pi-github"></i>
                    <span>GitHub</span>
                </a>
            </div>
        </div>
        <Toast position="top-right" />
        <TabMenu :model="tabItems" />
        <div class="tab-container">
        <router-view />
        </div>
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
    background-color: #12131f;
    margin: 0;
    padding: 0;
}

body {
    height: 100%;
    margin: 0;
    padding: 0;
}

.page {
    height: 100vh;
    padding: 0.5em;
}

a { text-decoration: none; }
a:link { color: #ffa500; }
a:visited { color: #ffa500; }
a:hover { color: gold; }
a:active { color: gold; }

.brand {
    flex: 1;
    font-family: Arial;
    font-size: 1.75em;
    font-weight: 800;
    text-transform: uppercase;
    color: #ffa500;
    text-align: left;
    text-shadow: 0px 0px 22px gold;
    animation: glow 1s ease-in-out infinite alternate;
}

.github {
    flex: 1;
    text-align: right;
}

.github span {
    margin: 0 0.75em 0 0.75em;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #cad5dd;
    margin: 0;
    padding: 0;
}
</style>
