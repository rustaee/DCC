import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Home from "@/views/Home.vue";

let mockGet = jest.fn();
jest.mock("axios", () => ({
  get: () => mockGet(),
}));

describe("Home", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Home);
    mockGet = jest.fn(); //reset the mock
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Search button exists", () => {
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("Search button works", async () => {
    await wrapper.find("button").trigger("click");
    expect(wrapper.find("#loading").exists()).toBe(true);
  });

  it("makes an api call", async () => {
    await wrapper.find("button").trigger("click");
    
    expect(mockGet).toHaveBeenCalled();
  });
});
