import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Home from "@/views/Home.vue";

describe("Home", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Home);
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Search button exists", () => {
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("Search click shows activity", async () => {
    await wrapper.find("button").trigger("click");
    expect(wrapper.find("#loading").exists()).toBe(true);
  });
});
