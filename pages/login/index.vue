<template>
  <main class="container">
    <div class="trop-div"/>
    <div class="box">
      <p class="title">Login</p>
      <div class="barrel">
        <p class="quwi-title">Q</p>
        <div class="inp-field">
          <p
            class="common-msg"
            :class="{'show-common': auth.email || !!err.emailErr, 'error-msg': !!err.emailErr}"
          >
            {{!err.emailErr ? 'Email' : err.emailErr}}
          </p>
          <input
            v-model="auth.email"
            placeholder="email"
            class="inp inp-email"
            :class="{'inp-error': !!err.emailErr}"
            @input="changeEmail()"
            type="text"
          >
        </div>
        <div class="inp-field">
          <span
            class="common-msg"
            :class="{'show-common': auth.password || !!err.passwordErr, 'error-msg': !!err.passwordErr}"
          >
            {{!err.passwordErr ? 'Password' : err.passwordErr}}
          </span>
          <input
            v-model="auth.password"
            placeholder="password"
            class="inp inp-pass"
            :class="{'inp-error': !!err.passwordErr}"
            @input="changePassword()"
            type="password"
          >
        </div>
        <button
          @click="loginQuwi()"
          class="inp-button"
          type="button"
          value="Login"
        >
          <span
            v-if="loader"
            class="loader"
          ></span>
          <span v-if="!loader">Login</span>
        </button>
      </div>
     </div>
  </main>
</template>

<script>
export default {
  middleware: 'user',
  data() {
    return {
      auth: {
        email: '',
        password: '',
      },
      err: {
        emailErr: '',
        passwordErr: '',
      },
      loader: false,
    }
  },
  methods: {
    loginQuwi() {
      const _auth = this.auth;
      const _err = this.err;
      const data = {data: {email: _auth.email, password: _auth.password}};
      this.loader = true;

      this.$store.dispatch('modules/login/loginUser', data)
      .then(res => {
        res && res.email ? _err.emailErr = res.email : _err.emailErr = '';
        res && res.password ? _err.passwordErr = res.password : _err.passwordErr = '';

        this.loader = false;
      })
    },
    changeEmail() {
      const _err = this.err;
      const _auth = this.auth;

      _auth.email ? _err.emailErr = '' : null;
    },
    changePassword() {
      const _err = this.err;
      const _auth = this.auth;

      _auth.password ? _err.passwordErr = '' : null;
    },
  }
}
</script>

<style lang="scss">
.container {
  background: #f4f4f4;
  min-height: 100vh;

  .trop-div {
    height: 50px;
  }

  .box {
    width: 440px;
    text-align: center;
    margin: 0 auto;

    .title {
      color: black;
      text-align: center;
      font-size: 29px;
      margin-bottom: 29px;
    }

    .barrel {
      -webkit-box-shadow: 0 0 9px 0 rgba(0,0,0,.19);
      box-shadow: 0 0 9px 0 rgba(0,0,0,.19);
      padding: 25px 40px 35px;
      border: 1px solid #e7e7e7;
      border-radius: 7px;
      background: #fff;

      .quwi-title {
        color: black;
        font-weight: 700;
        font-family: Google Sans,sans-serif;
        font-size: 80px;
        text-align: center;
      }

      .inp-field {
        text-align: left;
        margin-top: 28px;
        position: relative;

        .inp {
          text-align: left;
          border: 1px solid #4b84da;
          border-radius: 5px;
          padding: 14px 15px;
          outline: none;
          width: 100%;
          font-size: 15px;
        }

        .common-msg {
          display:none;
          font-size: 14px;
          position: absolute;
          margin-top: -8px;
          margin-left: 15px;
          background-color: white;
          text-align: left;
          color: #4b84da;
          padding-left: 3px;
          padding-right: 3px;
        }
        .show-common {
          display: inline-block;
        }
        .error-msg {
          color: red;
        }

        .common-pad {
          margin-top: 20px;
          padding-top: 5px;
          padding-bottom: 16px;
        }

        .inp-error {
          border-color: red;
        }
      }

      .inp-button {
        text-align: center;
        margin-top: 27px;
        cursor: pointer;
        border: none;
        outline: none;
        color: white;
        background: #2668c1;
        height: 52px;
        width: 100%!important;
        text-transform: none;
        text-shadow: none;
        font-size: 18px;
        border-radius: 9px;
        font-weight: 400;
      }
      .inp-button:hover {
        opacity: .7;
      }
    }
  }
}

::placeholder {
  font-style: italic;
  color: #b4c7e1;
  opacity: 1; /* Firefox */
}
:-ms-input-placeholder { /* Internet Explorer 10-11; Microsoft Edge*/
  font-style: italic;
  color: #b4c7e1;
}

.loader {
  display: inline-block;
  border-radius: 50%;
  border: 2px solid #ffffff7a;
  border-top: 2px solid #2668c1;
  width: 18px;
  height: 18px;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media only screen and (max-width: 600px) {
  .container {
    
    .trop-div {
      height: 25px;
    }

    .box {
      width: 80%;

      .barrel {
        padding: 5px 20px 25px;

        .inp-field {
          margin-top: 15px;
        }

        .inp-button {
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
