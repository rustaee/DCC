import axios from 'axios';
import { createStore } from "vuex";

export default createStore({
  state: {
    activities: [],
  },
  mutations: {
    setFavoriteActivities(state, data){
      if(data) state.activities = data;
    },
    updateActivities(state, data){
      state.activities = data;
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
    },

    removeFromFavorite({commit, state}, activity){
      
      const foundActivity = state.activities.findIndex(
        (element: Record<string, unknown>) => element.key == activity.key
      );
      if (foundActivity || foundActivity == 0){
        const newArray = state.activities;
        newArray.splice(foundActivity, 1);
        localStorage.setItem('favorites', JSON.stringify(newArray));
        commit('updateActivities', newArray);
      }
      
    }
  },
  modules: {},
});
