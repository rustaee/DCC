import axios from 'axios';
import { createStore } from "vuex";

export default createStore({
  state: {
    activities: [],
  },
  mutations: {
    setFavoriteActivities(state, data){
      if(data) state.activities = data;
    }
  },
  actions: {
    getFavoriteActivities(context){
      if (localStorage.getItem("favorites")) {
        try {
          const data = localStorage.getItem("favorites");
          if (data) {
            context.commit('setFavoriteActivities',JSON.parse(data));
          }
        } catch (e) {
          localStorage.removeItem("favorites");
        }
      }
    },

    addToFavorite({state}, activity){
      const newActivityArray:Array<string> = state.activities;
      newActivityArray.push(activity);
      localStorage.setItem('favorites', JSON.stringify(newActivityArray))
    }
  },
  modules: {},
});
