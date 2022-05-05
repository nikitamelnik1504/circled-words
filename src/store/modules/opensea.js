const getDefaultOpenSeaState = () => {
  return {
    opensea: {
      assets: [],
    },
  };
};

const state = getDefaultOpenSeaState();

const getters = {
  getAssets: (state) => {
    return state.opensea.assets;
  },
};

const mutations = {
  setAssets: (state, assets) => {
    state.opensea.assets = assets;
  },
};

const actions = {
  async setAssets({ getters, commit }) {
    const request_params = {
      owner: getters.getWalletAddress,
      collection: "circledwords-test-collection",
      order_direction: "desc",
      limit: 20,
      include_orders: false,
    };
    let request_string = "";
    for (let param in request_params) {
      if (request_string !== "") {
        request_string += "&";
      }
      request_string += param + "=" + encodeURIComponent(request_params[param]);
    }
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-KEY": "c53720a2d2324aca85614b30e3000a83",
      },
    };

    let next_id = "";
    let result = [];
    let request_url = "https://api.opensea.io/api/v1/assets?" + request_string;

    const getAssets = () => {
      if (next_id !== "") {
        request_url += "&cursor=" + next_id;
      }
      fetch(request_url, options)
        .then((response) => response.json())
        .then((response) => {
          Array.prototype.push.apply(result, response.assets);
          if (response.next !== null) {
            next_id = response.next;
            getAssets();
          }
        })
        .catch((err) => console.error(err));
    };
    getAssets();
    commit("setAssets", result);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
