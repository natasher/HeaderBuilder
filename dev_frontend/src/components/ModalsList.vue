<template>
  <section name="modals">
    <mfn-generic-modal  />
    <modal-save-header  />
    <modal-button       />
    <modal-grid         />
    <modal-action-bar   />
    <modal-first-row    />
    <modal-second-row   />
    <modal-icon         />
    <modal-image        />
    <modal-logo         />
    <modal-menu         />
    <modal-social-media />
    <modal-text         />
    <modal-cart         />
    <modal-search       />
    <modal-wpml         />
  </section>
</template>

<script>
import MfnGenericModal  from './Forms/MfnGenericModal.vue';
import ModalSaveHeader  from './Forms/Modals/ModalSaveHeader.vue';
import ModalButton      from './Forms/Modals/ModalButton.vue';
import ModalGrid        from './Forms/Modals/ModalGrid.vue';
import ModalActionBar   from './Forms/Modals/ModalActionBar.vue';
import ModalFirstRow    from './Forms/Modals/ModalFirstRow.vue';
import ModalSecondRow   from './Forms/Modals/ModalSecondRow.vue';
import ModalIcon        from './Forms/Modals/ModalIcon.vue';
// TODO: change name ModalImage to different name (Picture??), non html related, it couses warn
import ModalImage       from './Forms/Modals/ModalImage.vue';
import ModalLogo        from './Forms/Modals/ModalLogo.vue';
import ModalMenu        from './Forms/Modals/ModalMenu.vue';
import ModalSocialMedia from './Forms/Modals/ModalSocialMedia.vue';
import ModalText        from './Forms/Modals/ModalText.vue';
import ModalCart        from './Forms/Modals/ModalCart.vue';
import ModalSearch      from './Forms/Modals/ModalSearch.vue';
import ModalWpml        from './Forms/Modals/ModalWPML.vue';

export default {

  name: 'ModalsList',

  components: {
    MfnGenericModal,
    ModalSaveHeader,
    ModalButton,
    ModalGrid,
    ModalActionBar,
    ModalFirstRow,
    ModalSecondRow,
    ModalIcon,
    ModalImage,
    ModalLogo,
    ModalMenu,
    ModalSocialMedia,
    ModalText,
    ModalCart,
    ModalSearch,
    ModalWpml,
  },

}
</script>
