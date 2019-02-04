<template>
  <section name="modals">
    <mfn-generic-modal  />
    <modal-button       />
    <modal-grid         />
    <modal-action-bar   />
    <modal-first-row    />
    <modal-second-row   />
    <modal-extras       />
    <modal-icon         />
    <modal-image        />
    <modal-logo         />
    <modal-menu         />
    <modal-menu-icon    />
    <modal-social-media />
    <modal-text         />
  </section>
</template>

<script>
import MfnGenericModal  from './Forms/MfnGenericModal.vue';
import ModalButton      from './Forms/Modals/ModalButton.vue';
import ModalGrid        from './Forms/Modals/ModalGrid.vue';
import ModalActionBar   from './Forms/Modals/ModalActionBar.vue';
import ModalFirstRow    from './Forms/Modals/ModalFirstRow.vue';
import ModalSecondRow   from './Forms/Modals/ModalSecondRow.vue';
import ModalExtras      from './Forms/Modals/ModalExtras.vue';
import ModalIcon        from './Forms/Modals/ModalIcon.vue';
// TODO: change name ModalImage to different name (Picture??), non html related, it couses warn
import ModalImage       from './Forms/Modals/ModalImage.vue';
import ModalLogo        from './Forms/Modals/ModalLogo.vue';
import ModalMenu        from './Forms/Modals/ModalMenu.vue';
import ModalMenuIcon    from './Forms/Modals/ModalMenuIcon.vue';
import ModalSocialMedia from './Forms/Modals/ModalSocialMedia.vue';
import ModalText        from './Forms/Modals/ModalText.vue';

export default {

  name: 'ModalsList',

  components: {
    MfnGenericModal,
    ModalButton,
    ModalGrid,
    ModalActionBar,
    ModalFirstRow,
    ModalSecondRow,
    ModalExtras,
    ModalIcon,
    ModalImage,
    ModalLogo,
    ModalMenu,
    ModalMenuIcon,
    ModalSocialMedia,
    ModalText,
  },

}
</script>
