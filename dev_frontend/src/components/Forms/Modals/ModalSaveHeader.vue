<template>
  <modal
    name          = "ModalSaveHeader"
    width         = "140px"
    height        = "auto"
    :classes      = "[ 'info-modal', 'v--modal' ]">

    <div class = "header">

      <div class = "left">
        <div class = "title">Header saved</div>
      </div>

    </div>

    <!-- TODO: content gif -->
    <div class="content">

      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <title>saved</title>
        <circle style="fill:#35e8c6;" cx="50" cy="50" r="50"/>
        <rect style="fill:#fff;" x="26.56" y="55.63" width="20" height="5" transform="translate(51.81 -8.83) rotate(45)"/>
        <rect style="fill:#fff;" x="33.8" y="47.5" width="43" height="5" transform="translate(129.76 46.25) rotate(135)"/>
      </svg>

    </div>

  </modal>
</template>

<script>
export default {

  name: 'ModalSaveHeader',

}
</script>