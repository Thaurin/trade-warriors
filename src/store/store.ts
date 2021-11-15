import { createStore } from 'vuex'
import { State } from '../interfaces/interfaces';
import { Location, YourLoan, YourShip } from 'spacetraders-sdk/dist/types';

export default createStore({
  state: {
    username: '',
    token: '',
    credits: 0,
    ships: [] as YourShip[],
    loans: [] as YourLoan[],
    system: [] as Location[]
  } as State,
  mutations: {
    SET_USERNAME(state, value) {
      state.username = value;
      localStorage.setItem('username', value)
    },
    SET_TOKEN(state, value) {
      state.token = value;
      localStorage.setItem('token', value)
    },
    SET_ACCOUNT(state, value: { credits: number; ships: YourShip[]; loans: YourLoan[] }) {
      state.credits = value.credits;
      state.ships = value.ships;
      state.loans = value.loans;
    },
    SET_SYSTEM(state, value: Location[]) {
      state.system = value;
    }
  }
});
