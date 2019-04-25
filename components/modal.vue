<template>
  <section>
    <div
      :class="{'modal': status, 'modal modal-b': !status}"
      @click="toggleModal()"
    >
      <div
        class="modal-content"
        @click.stop
      >
        <div class="modal-header">
          <span
            class="close"
            @click="toggleModal()"
          >
            &times;
          </span>
        </div>
        <div class="modal-body">
          <h3>Enter new name</h3>
          <label> Name
            <input
              ref="projectName"
              class="modal-inp-name"  
              type="text"
              :value="info.name"
            >
          </label>
          <button
            class="common-b"
            name="ok"
            @click="changeProjectName($event)"
          >
            OK
          </button>
        </div>
        <div class="modal-footer">
          <button
            class="common-b"
            name="send"
            @click="changeProjectName($event)"
          >
            Send
          </button>
          <button
            class="common-b"
            @click="toggleModal()"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const body = document.getElementsByTagName('body');

export default {
  props: {
    status: Boolean,
    info: Object,
    toggleModal: Function,
    reProjects: Function,
  },
  watch: {
    status: (newVal, oldVal) => {
      if (newVal) {
        body[0].style.overflow = 'hidden';
      } else {
        body[0].removeAttribute('style');
      }
    }
  },
  methods: {
    changeProjectName(elem) {
      const newName = this.$refs.projectName.value;
      const data = {name: newName, id: this.info.id};
      const elemName = elem.target.name;

      if (newName !== this.info.name) {
        this.$store.dispatch('modules/home/changeProjectName', data)
        .then(res => {
          if (res) {
            this.reProjects();
          }
        });
      }

      if (elemName === 'send') {
        this.toggleModal();
      }
    },
  }
}
</script>

<style lang="scss">
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);

  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 10px 20px 20px 20px;
    border: 1px solid #888;
    width: 300px;

    .common-b {
      padding: 5px;
      margin: 0;
      outline: 0;
      border: 0;
      background: #395378;
      color: white;
      border-radius: 3px;
      cursor: pointer;
    }
    .common-b:hover {
      opacity: 0.7;
    }

    .modal-header {
      text-align: right;

      .close {
        color: #aaaaaa;
        font-size: 28px;
        font-weight: bold;
      }
      .close:hover {
        color: #000;
        text-decoration: none;
        cursor: pointer;
      }
    }

    .modal-body {

      .modal-inp-name {
        outline: none;
        width: 175px;
      }
    }
    .modal-body h3 {
      text-align: center;
      margin-bottom: 15px;
    }

    .modal-footer {
      margin-top: 18px;
      text-align: right;
    }
  }
}

.modal-b {
  display: none;
}
</style>
