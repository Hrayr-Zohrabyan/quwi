const state = () => ({
});

const getters = {
};

const actions = {
  async loginUser({commit}, payload) {
    const {data} = payload;
    const cookiConf = {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Client-Timezone-Offset": "60",
        "Client-Language": "en-EN",
        "Client-Company": "udimiteam",
        "Client-Device": "desktop"
      }
    };

    try {
      const user = await this.$axios.post(`${process.env.QUWI_API}auth/login?`, data, config);

      this.$cookies.set('access_token', user.data.token, cookiConf);
      this.$router.push('/home');
    } catch(error) {
      return error.response.data.first_errors;
    }
  }
};

const mutations = {
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};