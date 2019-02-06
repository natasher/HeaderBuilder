<template>
  <modal
    name          = "MfnGenericModal"
    @before-open  = "beforeOpen"
    height        = "auto"
    :classes      = "[ 'info-modal', 'v--modal' ]"
    :clickToClose = "closeOnClick" >

    <div class = "header">

      <div class = "left">
        <div class = "title">{{ title }}</div>
      </div>

    </div>

    <div class = "content"
        v-html = "text" ></div>

    <button
      v-for = "( btn, index ) in buttons"
      @click = "btn.handler"
      class = "mfn-button-generic"
      :key = "index">
        {{ btn.text }}
    </button>

  </modal>
</template>

<script>
export default {

  name: 'MfnGenericModal',

  data () {
    return {
      title        : '',
      text         : '',
      buttons      : [],
      closeOnClick : false
    }
  },

  methods: {
    /**
     * Before open modal hook. If openHook is provided, then set item
     * as currenlty used.
     *
     * @event beforeOpen
     * @type {vue-js-modal}
     * @param {event} passes grid item related data
     */
    beforeOpen ( event ) {
      this.title        = event.params.title
      this.text         = event.params.text
      this.buttons      = event.params.buttons
      this.closeOnClick = event.params.closeOnClick
    },
  }
}
</script>
