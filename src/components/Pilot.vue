<template>
    <Card>
        <template #title>Pilot</template>
        <template #content>
            Username: {{ username }}
            <br>
            Credits: {{ credits }}
            <br>

            <div style="margin-top: 1em;">
                <b>Ships</b>
                <br>
                <div v-if="ships.length">
                    <div v-for="ship in ships" :key="ship.id">
                        Cargo:<br>
                        <div v-if="ship.cargo.length">
                            <div v-for="cargoItem in ship.cargo" :key="cargoItem.good">
                                - Good: {{ cargoItem.good }}<br>
                                - Quanity: {{ cargoItem.quantity }}<br>
                            </div>
                        </div>
                        <div v-else>
                            <i>- None.</i>
                        </div>
                        Class: {{ ship.class }}<br>
                        Location: {{ ship.location }}<br>
                        Manufacterer: {{ ship.manufacturer }}<br>
                        Max cargo: {{ ship.maxCargo }}<br>
                        Plating: {{ ship.plating }}<br>
                        Space available: {{ ship.spaceAvailable }}<br>
                        Speed: {{ ship.speed }}<br>
                        Type: {{ ship.type }}<br>
                        Weapons: {{ ship.weapons }}
                    </div>
                </div>
                <div v-else>
                    <i>None.</i>
                </div>
            </div>

            <div style="margin-top: 1em;">
                <b>Loans</b>
                <br>
                <div v-if="loans.length">
                    <div v-for="loan in loans" :key="loan.id">
                        Amount: {{ loan.repaymentAmount }}<br>
                        Status: {{ loan.status }}<br>
                        Type: {{ loan.type }}<br>
                        Due: {{ loan.due }}
                    </div>
                </div>
                <div v-else>
                    <i>None.</i>
                </div>
            </div>
        </template>
    </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { SpaceTraders } from 'spacetraders-sdk';
import { YourLoan, YourShip } from 'spacetraders-sdk/dist/types';

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
        username(): string { return this.$store.state.username; },
        credits(): string { return this.$store.state.credits; },
        ships(): YourShip[] { return this.$store.state.ships; },
        loans(): YourLoan[] { return this.$store.state.loans; }
    }
});
</script>
