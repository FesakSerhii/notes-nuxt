<script lang="ts">

export default defineComponent({
  data: () => ({
    dialog: false,
    resolve: (result: boolean) => {},
    reject: (result: boolean) => {},
    text: '',
    title: '',
  }),
  methods: {
    open(title: string, text: string) {
      this.dialog = true;
      this.title = title;
      this.text = text;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.resolve(true);
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    }
  }
});

</script>

<template>
  <Teleport to="body">
    <div class="modal" v-if="dialog"
         @keydown.esc="cancel">
      <div class="modal-wrap">
        <div class="modal-title">
          {{title || ''}}
        </div>
        <div class="modal-text">
          {{text || ''}}
        </div>
        <div class="modal-footer">
          <button
              type="button"
              @click.native="cancel"
              class="cancel"
          >
            Cancel
          </button>
          <button
              type="button"
              @click.native="agree"
              class="agree"
          >
            Agree
          </button>

        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
@import "~/assets/scss/utils/_functions.scss";
.modal {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  &-wrap {
    width: clamp(300px , functions-vw(500px, 1920px), 500px);
    padding: clamp(15px , functions-vw(30px, 1920px), 30px);
    background-color: #fff;
    border-radius: clamp(8px , functions-vw(16px, 1920px), 16px);
  }
  &-title {
    text-align: center;
    font-size: clamp(18px , functions-vw(32px, 1920px), 32px);
    color: red;
  }
  &-text {
    text-align: center;
    font-size: clamp(14px , functions-vw(18px, 1920px), 18px);
    margin-top: clamp(8px , functions-vw(16px, 1920px), 16px);
  }
  &-footer {
    display: flex;
    justify-content: center;
    gap: clamp(10px , functions-vw(20px, 1920px), 20px);
    margin-top: clamp(15px , functions-vw(30px, 1920px), 30px);
    button {
      height: clamp(25px , functions-vw(34px, 1920px), 34px);
      padding: 0 clamp(8px , functions-vw(16px, 1920px), 16px);
      border-radius: clamp(6px , functions-vw(8px, 1920px), 8px);
      color: #fff;
      cursor: pointer;
      opacity: .8;
      transition: .3s;
      font-size: clamp(14px , functions-vw(18px, 1920px), 18px);
      &.agree {
        background-color: rgba(0, 128, 0, 1);
      }
      &.cancel {
        background-color: rgba(255, 0, 0, 1);
      }
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
