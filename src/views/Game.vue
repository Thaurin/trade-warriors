<template>
    <div style="display: flex">
        <div style="flex: 2; margin-right: 0.25em">
            <System />
        </div>
        <div style="flex: 1; margin-left: 0.25em">
            <Pilot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Pilot from '../components/Pilot.vue';
import System from '../components/System.vue';

export default defineComponent({
    components: {
        'Pilot': Pilot,
        'System': System
        },
    data() {
        return {
            items: [
                { label: 'Game', icon: 'pi pi-fw pi-user', to: '/' },
                { label: 'Settings', icon: 'pi pi-fw pi-cog', to: '/settings' },
            ]
        }
    },
    methods: {
    }
});
</script>
