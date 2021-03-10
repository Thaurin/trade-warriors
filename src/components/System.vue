<template>
    <svg id="system" style="width: 800; height: 600; background-color: #001;" preserveAspectRatio="none">
        <text v-for="planet in systemConverted" :key="planet.symbol"
            fill="#ffffff"
            font-size="10px"
            font-family="Verdana"
            x="5"
            y="15">
            System OE
        </text>

        <circle v-for="i in (system.length ? 20 : 0)" :key="i"
            :cx="(Math.random() * 800)"
            :cy="(Math.random() * 800)"
            :r="1"
            :fill="`rgba(255,255,255,${Math.random()})`" />

        <line x1="400" y1="0" x2="400" y2="600" style="stroke:#112;stroke-width:2" />
        <line x1="0" y1="300" x2="800" y2="300" style="stroke:#112;stroke-width:2" />

        <line v-if="shipLocation" :x1="shipLocation.x" y1="0" :x2="shipLocation?.x" y2="600" style="stroke:#211;stroke-width:1" stroke-dasharray="10,5" d="M5 20 l215 0" />
        <line v-if="shipLocation" x1="0" :y1="shipLocation.y" x2="800" :y2="shipLocation?.y" style="stroke:#211;stroke-width:1" stroke-dasharray="10,5" d="M5 20 l215 0" />

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
            :fill="`url(#grad-${planet.symbol})`"
            @click="onClicked"/>

        <text v-for="planet in systemConverted" :key="planet.symbol"
            :fill="`rgb(${planet.r},${planet.g},${planet.b})`"
            :font-size="planet.radius + 4"
            font-family="Verdana"
            :x="planet.x + planet.radius - 65"
            :y="planet.y + planet.radius - 25">
            {{ planet.symbol }}
        </text>
    </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { SpaceTraders } from 'spacetraders-sdk';
import { Location, LocationsResponse, YourShip } from 'spacetraders-sdk/dist/types';

interface LocationUI {
    name: string;
    symbol: string;
    x: number;
    y: number;
    labelX: number;
    labelY: number;
    radius: number;
    r: number;
    g: number;
    b: number;
}

export default defineComponent({
    data() {
        return {
            space: new SpaceTraders()
        }
    },
    methods: {
        convert(x: number, y: number): { x: number; y: number} {
            const margin = 100;
            const width = 800 - margin;
            const height = 600 - margin;

            return {
                x: (((x + this.conversionMap.xAdjustment) * width) / this.conversionMap.xMax) + (margin / 2),
                y: height - (((y + this.conversionMap.xAdjustment) * height) / this.conversionMap.yMax) + (margin / 2),
            }
        },
        onClicked() {
            //
        }
    },
    computed: {
        system(): Location[] {
            return this.$store.state.system;
        },
        ship(): YourShip {
            return this.$store.state.ships[0];
        },
        shipLocation(): { x: number; y: number } | undefined {
            const location = this.system.find((el: Location) => el.symbol === this.ship?.location);
            if (!location) return undefined;

            const shipCoords = this.convert(location.x, location.y);

            return {
                x: shipCoords.x,
                y: shipCoords.y
            }
        },
        conversionMap(): { xAdjustment: number; yAdjustment: number; xMax: number; yMax: number} {
            const coordsX: number[] = this.system.map(el => el.x).sort((a, b) => a - b);
            const coordsY: number[] = this.system.map(el => el.y).sort((a, b) => a - b);

            const lowestX = coordsX[0];
            const lowestY = coordsY[0];
            let highestX = coordsX[coordsX.length - 1];
            let highestY = coordsY[coordsY.length - 1];

            // Find the adjument values to shift coordinates into positive values
            const adjustX = Math.abs(lowestX);
            const adjustY = Math.abs(lowestY);

            // Find the upper, positive boundaries
            highestX += adjustX;
            highestY += adjustY;

            return {
                xAdjustment: adjustX,
                yAdjustment: adjustY,
                xMax: highestX,
                yMax: highestY
            }
        },
        systemConverted(): LocationUI[] {
            const converted = [] as LocationUI[];

            this.system.forEach((location: Location) => {
                const convertedCoords = this.convert(location.x, location.y);
                const radius = ([...location.name].reduce((acc, curr) => acc + curr.charCodeAt(0), 0) % 9) + 4;
                const r = Math.floor(Math.random() * 200) + 50;
                const g = Math.floor(Math.random() * 200) + 50;
                const b = Math.floor(Math.random() * 200) + 50;

                converted.push({
                    name: location.name,
                    symbol: location.symbol,
                    x: convertedCoords.x,
                    y: convertedCoords.y,
                    radius: radius,
                    r: r,
                    g: g,
                    b: b
                } as LocationUI);
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
