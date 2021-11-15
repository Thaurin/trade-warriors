<template>
    <h1>Settings</h1>
    <div class="settingsContainer">
        <div class="settingsItem">
            <label for="username">Username</label><br>
            <InputText id="username" type="text" v-model="username" />
        </div>
        <div class="settingsItem">
            <label for="token">Token</label><br>
            <InputText id="token" type="text" v-model="token" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '../store/store';

export default defineComponent({
    data() {
        return {
        }
    },
    computed: {
        username: {
            get(): string { return this.$store.state.username; },
            set(value: string): void {
                store.commit('SET_USERNAME', value);
            }
        },
        token: {
            get(): string { return this.$store.state.token; },
            set(value: string): void {
                store.commit('SET_TOKEN', value);
            }
        }
    }
});
</script>

<style lang="scss">
.settingsContainer {
}

.settingsItem {
    padding: 0.5em;
}

.settingsItem label {
    color: #667;
    font-size: 0.85em;
}
</style>
