import axios from 'axios';
import { createStore } from "vuex";

export default createStore({
  state: {
    activity: null,
  },
  mutations: {
    setActivity(state, data){
      if(data) state.activity = data;
    }
  },
  actions: {
    async getRandomActivity(context){
      await axios
      .get('http://www.boredapi.com/api/activity/')
      .then(response => {
        context.commit('setActivity', response.data);
      })
      .catch(error => console.log(error))
    }
  },
  modules: {},
});
