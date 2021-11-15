<template>
    <div style="display: flex">
        <div style="flex: 1; width: 50%; margin-right: 0.25em; text-align: right">
            <System />
        </div>
        <div style="flex: 1; width: 50%; margin-left: 0.25em; text-align: left;">
            <div style="display: flex">
                <div style="flex: 1">
                    <Pilot />
                </div>
                <div style="flex: 1">
                </div>
                <div style="flex: 1">
              </div>
            </div>
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
        }
    },
    methods: {
    }
});
</script>
