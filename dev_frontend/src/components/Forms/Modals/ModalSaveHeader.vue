<template>
  <!-- <transition name="saved-header-info"> -->
    <modal
      name          = "ModalSaveHeader"
      height        = "auto"
      width         = "100"
      :classes      = "[ 'info-modal', 'v--modal' ]">

      <div class = "header">

        <div class = "left">
          <div class = "title">Header saved</div>
        </div>

      </div>

      <!-- TODO: content gif -->
      <div class="content">
        <img src="../../../../public/images/check.gif" >
      </div>

    </modal>
  <!-- </transition> -->
</template>

<script>
export default {

  name: 'ModalSaveHeader',

  methods: {
    /**
     * Before open modal hook. If openHook is provided, then set item
     * as currenlty used.
     *
     * @event beforeOpen
     * @type {vue-js-modal}
     * @param {event} passes grid item related data
     */
    // beforeOpen ( event ) {
    /** TODO: możebyć dobre miejsce na leave transition */
      // return true
    // },
  }
}
</script>
