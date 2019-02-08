<template>
  <modal
    name          = "ModalSaveHeader"
    height        = "auto"
    :classes      = "[ 'info-modal', 'v--modal' ]">

    <div class = "header">

      <div class = "left">
        <div class = "title">Header saved</div>
      </div>

    </div>

    <!-- TODO: content gif -->
    <div class="content">
      Your header has been saved.
    </div>

  </modal>
</template>

<script>
export default {

  name: 'ModalSaveHeader',

}
</script>