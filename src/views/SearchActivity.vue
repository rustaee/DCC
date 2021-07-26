<template>
  <div class="search-container">
    <h2>Change options to get more accurate results.</h2>
    <form class="search-form" @submit.prevent="findActivity()">
      <div class="search-form--left-column">
        <div class="search-form__field search-form__type">
          <div
            class="checkbox-container"
            v-for="(value, index) in types"
            :key="index"
          >
            <input
              type="checkbox"
              v-model="type"
              :name="index"
              :id="index"
              :value="value"
            />
            <div class="search-form__checkbox"></div>
            <label :for="index">{{ value }}</label>
          </div>
        </div>
      </div>
      <div class="search-form--right-column">
        <div class="search-form__field accessibility">
          <label>Accessibility</label>
          <input
            type="range"
            class="slider"
            v-model="accessibility"
            min="0"
            max="1"
            step="0.1"
          />
        </div>

        <div class="search-form__field price">
          <label>Price</label>
          <input
            class="slider"
            type="range"
            v-model="price"
            min="0"
            max="1"
            step="0.1"
          />
        </div>

        <div class="search-form__field participants">
          <label>Participants</label>
          <select name="participants" v-model="participants">
            <option v-for="n in 10" :value="n" :key="n">{{ n }}</option>
          </select>
        </div>

        <div class="search-form__field submit">
          <base-button>Search</base-button>
        </div>
      </div>
    </form>
    <!-- Loading -->
    <BaseLoading v-if="loading" />
    <!-- Search Result -->
    <transition name="fade">
      <show-activity
        v-if="activity && !error"
        :activity="activity"
      ></show-activity>
    </transition>

    <!-- ERROR! not found a result -->
    <base-alert v-if="error" class="alert fail">
      <p>We couldn't find an activity with selected options.</p>
      <p>please try again</p>
    </base-alert>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import ShowActivity from "@/components/ShowActivity.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseAlert from "@/components/ui/BaseAlert.vue";
import BaseLoading from "@/components/ui/BaseLoading.vue";

export default defineComponent({
  components: { ShowActivity, BaseButton, BaseAlert, BaseLoading },
  setup() {
    const activity = ref(null);
    const accessibility = ref(1);
    const type = ref([]);
    const types = ref([
      "education",
      "recreational",
      "social",
      "diy",
      "charity",
      "cooking",
      "relaxation",
      "music",
      "busywork",
    ]);
    const participants = ref(1);
    const price = ref(0);
    const error = ref(false);
    const loading = ref(false);
    const findActivity = () => {
      activity.value = null;
      loading.value = true;
      error.value = false;
      let randomType;

      if (type.value.length > 0) {
        randomType = type.value[Math.trunc(Math.random() * type.value.length)];
      } else {
        randomType =
          types.value[Math.trunc(Math.random() * types.value.length)];
      }

      axios
        .get(
          `http://www.boredapi.com/api/activity?minaccessibility=${
            1 - accessibility.value
          }&maxaccessibility=1&participants=${
            participants.value
          }&min-price=0&max-price=${price.value}&type=${randomType}`
        )
        .then((response) => {
          loading.value = false;
          if (response.data.error) error.value = true;
          else {
            activity.value = response.data;
            error.value = false;
          }
        })
        .catch((error) => {
          error.value = error;
        });
    };
    return {
      activity,
      accessibility,
      type,
      types,
      price,
      participants,
      error,
      loading,
      findActivity,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-container {
  width: 90%;
  @extend %flex-column;

  h2 {
    margin: 20px 0;
    font-size: 1.2rem;
  }
}

.search-form {
  @extend %flex-row;
  min-width: 320px;
  padding: 10px;
  margin-bottom: 20px;
  background-color: rgba(shade($primary-color, 50), 0.5);
  border-radius: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
}

.search-form--left-column {
  width: 100px;
}

.search-form__field {
  position: relative;
}

.search-form__type {
  @extend %flex-column;
  align-items: flex-start;

  input {
    position: relative;
    margin-right: 10px;
    position: relative;
    left: 50px;
    visibility: hidden;

    &:checked + div {
      background: $secondary-color;
    }
  }
}

.checkbox-container {
  position: relative;

  label {
    position: absolute;
    left: 0;
    padding-left: 20px;
    cursor: pointer;
  }
}

.search-form__checkbox {
  position: absolute;
  width: 13px;
  height: 13px;
  left: 0;
  top: 3px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid tint($primary-color, 80);
  -webkit-transition: 0.2s;
  transition: all 0.2s;
}

.search-form--right-column {
  text-align: left;
}

.alert {
  min-width: 300px;
  margin: 20px 0;
}

.slider {
  width: 100%;
  height: 25px;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
}

select {
  width: 30%;
  margin-left: 10px;
  opacity: 0.7;
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (min-width: 600px) {
  .search-form--left-column {
    width: 150px;
  }

  .alert {
    max-width: 600px;
  }
}
</style>
