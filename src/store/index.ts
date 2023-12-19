import { createStore } from "vuex";

export default createStore({
  state: {
    loginStatus: "logout", // login
    usernameState: "alex123",
  },
  mutations: {
    SET_LOGINSTATUS_STATE(state, loginStatus) {
      console.log("SET_LOGINSTATUS_STATE = ", loginStatus);

      state.loginStatus = loginStatus;
    },
    SET_USERNAME_STATE(state, username) {
      state.usernameState = username;
    },
  },
  actions: {
    handleLoginStatus({ commit }, loginStatus) {
      console.log("handleLoginStatus = ", loginStatus);
      if (loginStatus === "logout") {
        localStorage.clear();
      }
      commit("SET_LOGINSTATUS_STATE", loginStatus);
    },
    handleUsernameState({ commit }, username) {
      commit("SET_USERNAME_STATE", username);
    },
  },
  getters: {
    getloginStatus: (state) => state.loginStatus,
    usernameState: (state) => state.usernameState,
  },
  modules: {},
});
