<template>
  <section class="container">
    <div class="idle-div">
      <button @click="logOut()">Logout</button>
    </div>
    <div class="useful-div">
      <div v-for="project in projects"
        class="box-home"
        :class="{'box-home-i': !project.is_active}"
        @click="chooseProject(project)"
      >
        <div class="block-img">
          <img
            v-if="project.logo_url"
            class="elem-image"
            :src="`${project.logo_url}`"
          >
          <div
            v-if="!project.logo_url"
            class="elem-image instead"
          >
            {{takeLetters(project.name)}}
          </div>
        </div>
        <div class="block-name">
          <span>{{getProjectName(project.name)}}</span>
        </div>
        <div class="block-active">
          <div class="active-field">
            <p :class="{'active-field-a': project.is_active, 'active-field-i': !project.is_active}">
              {{project.is_active ? 'Active' : 'Inactive'}}
            </p>
          </div>
        </div>
        <div class="block-list">
          <div class="list-field">
            <p>time this week</p>
            <p>{{secondsToHms(project.spent_time_week)}}</p>
          </div>
          <div class="list-field">
            <p>this month</p>
            <p>{{secondsToHms(project.spent_time_month)}}</p>
          </div>
          <div class="list-field">
            <p>total</p>
            <p>{{secondsToHms(project.spent_time_all)}}</p>
          </div>
        </div>
      </div>
    </div>

    <modal
      :status="modalStatus"
      :info="infoModal"
      :toggleModal="() => modalStatus = !modalStatus"
      :reProjects="() => reAllProjects()"
    />
  </section>
</template>

<script>
import modal from '~/components/modal';

export default {
  components: {
    modal
  },
  middleware: 'auth',
  asyncData({store}) {
    return new Promise((resolve, reject) => {
      store.dispatch('modules/home/getUserProjects')
      .then(res => {
        if (res) {
          resolve();
        }
      });
    })
  },
  data() {
    return {
      projects: [],
      modalStatus: false,
      infoModal: {},
    }
  },
  mounted() {
    const _projects = this.$store.getters['modules/home/getProjects'];

    this.projects = _projects;
  },
  methods: {
    logOut() {
      this.$cookies.remove('access_token');
      this.$router.push('/login');
    },
    secondsToHms(sec) {
      const num = Number(sec);
      const h = Math.floor(num / 3600);
      const m = Math.floor(num % 3600 / 60);
      const s = Math.floor(num % 3600 % 60);

      let hDisplay = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '00:';
      let mDisplay = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:';
      let sDisplay = s > 0 ? (s < 10 ? `0${s}` : `${s}`) : '00';

      return hDisplay + mDisplay + sDisplay; 
    },
    takeLetters(name) {
      const nameArr = name.split(" ");
      
      if (nameArr.length >= 2) {
        return `${nameArr[0][0].toUpperCase()}${nameArr[1][0].toUpperCase()}`;
      } else {
        return nameArr[0][0].toUpperCase();
      }
    },
    getProjectName(name) {
      if (name.length > 19) {
        return `${name.slice(0, 19)}...`;
      } else {
        return name;
      }
    },
    chooseProject(project) {
      this.infoModal = project;
      this.modalStatus = true;
    },
    reAllProjects() {
      const _projects = this.$store.getters['modules/home/getProjects'];

      this.projects = _projects;
    }
  }
}
</script>

<style lang="scss">
.container {
  background: #f4f4f4;
  height: 100vh;

  .idle-div {
    height: 50px;
    padding: 15px;
  }
  .idle-div button {
    cursor: pointer;
  }

  .useful-div {
    width: 600px;
    margin: 0 auto;

    .box-home {
      background: white;
      cursor: pointer;
      margin: 0 auto;
      border: 1px solid #dedede;
      padding: 18px 20px 20px 25px;
      margin-bottom: 7px;
      box-sizing: border-box;
      font-size: 13px;

      .block-img {
        width: 12%;
        display: inline-block;
      }
      .elem-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: block;
        margin: 0 auto;
        cursor: initial;
      }
      .instead {
        background: black;
        text-align: center;
        color: white;
        padding-top: 10px;
        font-size: 18px;
      }

      .block-name {
        font-weight: bold;
        width: 28%; 
        display: inline-block;
      }

      .block-active {
        font-weight: bold;
        width: 25%;
        display: inline-block;
      }
      .active-field {
        text-align: center;
      }
      .active-field-a {
        margin-bottom: 4px;
        color: green;
      }
      .active-field-i {
        margin-bottom: 4px;
        color: #b5b5b5;
      }

      .block-list {
        width: 30%;
        margin-left: 13px;
        display: inline-block;
      }
      .list-field {
        margin-top: 4px;
      }
      .list-field p:first-child {
        width: 65%;
        display: inline-block;
      }
      .list-field p:last-child {
        display: inline-block;
        font-weight: bold;
        text-align: right;
      }
    }

    .box-home > * {
      vertical-align: middle;
    }
    .box-home-i {
      opacity: 0.5;
    }
    .box-home:last-child {
      margin-bottom: 0;
    }
    .box-home:hover {
      background: #ececec;
      cursor: pointer;
      text-decoration: none;
    }

  }
}

@media only screen and (max-width: 600px) {
  .container {
    
    .useful-div {
      width: 80%;

      .box-home {
        padding: 8px 0px 12px 11px;

        .block-name {
          display: none;
        }

        .block-active {
          width: 28%;
        }

        .block-list {
          margin: 0;
          width: 52%;
        }

        .list-field p:first-child {
          width: 60%;
        }
      }
    }
  }
}
</style>