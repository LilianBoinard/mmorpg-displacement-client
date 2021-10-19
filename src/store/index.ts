import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    x: 0,
    y: 0,
    handler: {
      onStop: () => {
        //
      }
    }
  },
  mutations: {
    setPosition (state, payload) {
      state.x = payload.x;
      state.y = payload.y;
    },
    setStopHandler (state, payload) {
      state.handler.onStop = payload.handler;
    }
  },
  actions: {
    setPosition (context, position) {
      context.commit('setPosition', position);
    },
    onStop (context, handler) {
      context.commit('setStopHandler', {handler});
    },
    stop (context) {
      context.state.handler.onStop();
    }
  },
  modules: {
  }
})
