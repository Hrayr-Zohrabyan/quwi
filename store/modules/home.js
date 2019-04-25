const state = () => ({
  projects: [],
});

const getters = {
  getProjects: state => state.projects,
};

const actions = {
  async getUserProjects({commit}) {
    const config = {
      headers: {
        "Authorization": `Bearer ${this.$cookies.get('access_token')}`,
      }
    };

    try {
      const projects = await this.$axios.get(`${process.env.QUWI_API}projects-manage/index`, config);

      await commit('CHANGE_PROJECT', projects.data.projects);
    } catch(error) {
      console.error(error)
    }
    return true;
  },
  async changeProjectName({commit, state}, data) {
    const {projects} = state;
    const config = {
      headers: {
        "Authorization": `Bearer ${this.$cookies.get('access_token')}`,
      }
    };

    try {
      await this.$axios.post(`${process.env.QUWI_API}projects-manage/update?id=${data.id}`, {name: data.name}, config);

      let _projects = JSON.stringify(projects);
      _projects = JSON.parse(_projects);

      _projects.forEach((project, i) => {
        if (project.id === data.id) {
          project.name = data.name;
        }
      });

      commit('CHANGE_PROJECT', _projects)
    } catch(error) {
      console.error(error)
    }
    return true;
  }
};

const mutations = {
  CHANGE_PROJECT: (state, playload) => state.projects = playload,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};