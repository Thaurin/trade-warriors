<template>
    <svg width="800" height="600" style="background-color: #001;">
        <text v-for="planet in systemConverted" :key="planet.symbol"
            fill="#ffffff"
            font-size="10px"
            font-family="Verdana"
            x="5"
            y="15">
            System OE
        </text>

        <defs v-for="planet in systemConverted" :key="planet.symbol">
            <linearGradient :id="`grad-${planet.symbol}`" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"
            :style="`stop-color: rgb(${planet.r},${planet.g},${planet.b}); stop-opacity:1`" />
            <stop offset="100%"
            :style="`stop-color: rgb(${planet.b},${planet.g},${planet.r}); stop-opacity:1`" />
            </linearGradient>
        </defs>

        <circle v-for="planet in systemConverted" :key="planet.symbol"
            :cx="planet.x"
            :cy="planet.y"
            :r="planet.radius"
            :fill="`url(#grad-${planet.symbol})`" />

        <text v-for="planet in systemConverted" :key="planet.symbol"
            :fill="`rgb(${planet.r},${planet.g},${planet.b})`"
            :font-size="planet.radius + 5"
            font-family="Verdana"
            :x="planet.x + 15"
            :y="planet.y + 15">
            {{ planet.name }}
        </text>
    </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { SpaceTraders } from 'spacetraders-sdk';
import { Location, LocationsResponse } from 'spacetraders-sdk/dist/types';

export default defineComponent({
    data() {
        return {
            space: new SpaceTraders(),
            items: [
                { label: 'Game', icon: 'pi pi-fw pi-user', to: '/' },
                { label: 'Settings', icon: 'pi pi-fw pi-cog', to: '/settings' },
            ]
        }
    },
    methods: {
    },
    computed: {
        system(): Location[] {
            return this.$store.state.system;
        },
        systemConverted(): { name: string; symbol: string; x: number; y: number; radius: number; r: number; g: number; b: number }[] {
            const converted = [] as { name: string; symbol: string; x: number; y: number; radius: number; r: number; g: number; b: number }[];

            let lowestX = 0, lowestY = 0, highestX = 0, highestY = 0;
            for (let i=0; i < this.system.length; i++) {
                if (this.system[i].x < lowestX) lowestX = this.system[i].x;
                if (this.system[i].y < lowestY) lowestY = this.system[i].y;
                if (this.system[i].x > highestX) highestX = this.system[i].y;
                if (this.system[i].y > highestY) highestY = this.system[i].y;
            }

            highestX += Math.abs(lowestX);
            highestY += Math.abs(lowestY);

            const margin = 50;
            const width = 800 - margin;
            const height = 600 - margin;
            const adjustmentX = Math.abs(lowestX);
            const adjusmentY = Math.abs(lowestY);

            this.system.forEach((location: Location) => {
                const newX = (((location.x + adjustmentX) * width) / highestX) + (margin / 2);
                const newY = (((location.y + adjusmentY) * height) / highestY) + (margin / 2);
                const radius = Math.floor(Math.random() * 9) + 4;
                const r = Math.floor(Math.random() * 200) + 50;
                const g = Math.floor(Math.random() * 200) + 50;
                const b = Math.floor(Math.random() * 200) + 50;

                converted.push({
                    name: location.name,
                    symbol: location.symbol,
                    x: newX,
                    y: newY,
                    radius: radius,
                    r: r,
                    g: g,
                    b: b
                });
            });

            return converted;
        }
    },
    mounted() {
        this.$space.listLocations(this.$store.state.token)
        .then((locations: LocationsResponse) => {
            this.$store.commit('SET_SYSTEM', locations.locations);
        })
        .catch((err: Error) => {
            this.$toast.add({severity: 'error', summary: 'Error scanning system', detail: err.message, life: 3000});
        });
    }
});
</script>

<style scoped>
    #system {
        background-color: #001;
    }
</style>