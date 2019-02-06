<template>
  <transition name="saved-header-info">
    <modal
      name          = "ModalSaveHeader"
      @before-open  = "beforeOpen"
      height        = "auto"
      :classes      = "[ 'info-modal', 'v--modal' ]"
      :clickToClose = "closeOnClick" >

      <div class = "header">

        <div class = "left">
          <div class = "title"></div>
        </div>

      </div>

      <!-- TODO: content gif -->
      <img src="../../../../public/images/check.gif" >

    </modal>
  </transition>
</template>

<script>
export default {

  name: 'MfnGenericModal',

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
    /** TODO: możebyć dobre miejsce na leave transition */
    },
  }
}
</script>
