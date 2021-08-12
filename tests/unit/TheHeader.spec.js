import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import TheHeader from "@/components/ui/TheHeader.vue";

const store = createStore({
  state() {
    return {
      activities: [],
    };
  },
});

function factory() {
  return mount(TheHeader, {
    global: {
      plugins: [store],
    },
  });
}

describe("TheHeader", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory();
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
    console.log(wrapper.html());
  });

  it("shows favorite activities counter", () => {
    expect(wrapper.find(".favorite__counter").text()).not.toBe("");
  });
});
