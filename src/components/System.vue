<template>
    <canvas id="system" width="800" height="600"></canvas>
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
        draw(): void {
            const canvas = document.getElementById('system') as HTMLCanvasElement;
            if (!canvas) return;

            // canvas.style.width='100%';
            // canvas.style.height='100%';
            // canvas.width  = canvas.offsetWidth;
            // canvas.height = canvas.offsetHeight;

            const context = canvas.getContext('2d') as CanvasRenderingContext2D;
            if (!context) return;

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

                context.beginPath();
                context.arc(newX, newY, radius, 0, 2 * Math.PI, false);
                context.fillStyle = `rgb(${r}, ${g}, ${b})`;
                context.fill();

                context.font = `${radius + 6}px Arial`;
                context.fillText(location.symbol, newX + 20, newY + 20);
            });

            context.fillStyle = 'white';
            context.font = '12px Arial'
            context.fillText('System OE', 5, 15);
        }
    },
    computed: {
        system(): Location[] {
            return this.$store.state.system;
        }
    },
    mounted() {
        this.$space.listLocations(this.$store.state.token)
        .then((locations: LocationsResponse) => {
            this.$store.commit('SET_SYSTEM', locations.locations);
            this.draw();
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
