import Activity from '@/types/activity';
import axios from 'axios';
import { createStore } from "vuex";

export default createStore({
  state: {
    activities: [] as Activity[], /** Favorite activities saved in localStorage */
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
      const newActivityArray:Activity[] = state.activities;
      newActivityArray.push(activity);
      localStorage.setItem('favorites', JSON.stringify(newActivityArray))
    },

    removeFromFavorite({commit, state}, activity:Activity){
      
      const foundActivity = state.activities.findIndex(
        (element: Activity) => element.key == activity.key
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
