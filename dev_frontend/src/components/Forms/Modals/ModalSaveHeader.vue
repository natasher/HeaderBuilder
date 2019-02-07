<template>
  <modal
    name          = "ModalSaveHeader"
    height        = "auto"
    width         = "130"
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
</template>

<script>
export default {

  name: 'ModalSaveHeader',

}
</script>