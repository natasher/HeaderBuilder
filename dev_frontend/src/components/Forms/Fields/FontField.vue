<template>
  <div class = "row">

    <div class = "col col-left">
      <span class = "title">{{ fieldName }}</span>
    </div>

    <div class = "col col-right">

      <div class = "mfn-field mfnf-upload mfnf-bgimage">

        <input
          type   = "text"
          :value = "storedImageUrl"
          @input = "value => storedImageUrl = value.target.value" />

        <button
          v-if  = "storedImageUrl === ''"
          class = "mfn-button-generic add"
          @click.prevent = "openWPMedia">
            Add Image
        </button>
        <button
          v-else
          class = "mfn-button-generic remove"
          @click.prevent = "removeImg">
            Remove
        </button>

        <v-select
          name = "positionVertical"
          :options = "[
            { label: 'top',    value: 'top'},
            { label: 'center', value: 'center'},
            { label: 'bottom', value: 'bottom'},
          ]"
          @input = "setSelectPV"
          :value = "getSelectPV" />

        <v-select
          name     = "positionHorizontal"
          :options = "[
            { label: 'left', value: 'left' },
            { label: 'center', value: 'center' },
            { label: 'right', value: 'right' },
          ]"
          @input = "setSelectPH"
          :value = "getSelectPH" />

        <v-select
          name     = "repeat"
          :options = "[
            { label: 'repeat', value: 'repeat' },
            { label: 'no-repeat', value: 'no-repeat' },
          ]"
          @input = "setSelectRepeat"
          :value = "getSelectRepeat" />

        <v-select
          name     = "size"
          :options = "[
            { label: 'auto', value: 'auto' },
            { label: 'cover', value: 'cover' },
            { label: 'contain', value: 'contain' },
          ]"
          @input = "setSelectSize"
          :value = "getSelectSize" />

        <img
          :src = "storedImageUrl"
          v-if = "(/\.(gif|jpg|jpeg|tiff|png)$/i).test(storedImageUrl)" />

      </div>

    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import vSelect from 'vue-select'

export default {

  name: 'BackgroundUploadField',

  components: {
    vSelect,
  },

  props: {
    /**
     * The name of the field.
     * Displayed on the left column.
     */
    fieldName: {
      type    : String,
      required: true,
    },
    /**
     * Name of the field used by WordPress internals.
     */
    wpId: {
      type   : String,
      require: true,
    },
    /**
     * Prop determinates type of Margin field,
     * possible values: **""**, **row**, **grid**.
     */
    as: {
      type    : String,
      required: false,
      default : '',
    },
    /**
     * When `as` prop is set to row, `row` indicates which one.
     * Then margin values will be set to given row.
     */
    row: {
      type    : String,
      required: false,
      default : '',
    },
  },

  methods: {
    ...mapActions( 'fields', [ 'setModalFieldValue' ]),

    /**
     * openWPMedia opens WordPress native media frame.
     */
    openWPMedia: function() {
      const that = this

      const upload_frame = (wp.media.frames.mfn_hb_gallery = wp.media({
        title  : 'Choose a File',
        library: {
          type: 'image',
        },
        button: {
          text: 'Select File',
        },
      }))

      upload_frame.on( 'select', function() {
        const attachment = upload_frame
          .state()
          .get( 'selection' )
          .first()
          .toJSON()

        that.setModalFieldValue({
          name    : that.wpId,
          value   : attachment.url,
          as      : that.as  || '',
          row     : that.row || '',
          position: 'bgImg',
        })
      })

      upload_frame.open()
    },

    removeImg: function() {
      this.setModalFieldValue({
        name    : this.wpId,
        value   : '',
        as      : this.as  || '',
        row     : this.row || '',
        position: 'bgImg',
      })
    },

    setSelectPV: function( event ) {
      this.setModalFieldValue({
        name    : this.wpId,
        value   : event,
        as      : this.as  || '',
        row     : this.row || '',
        position: 'positionVertical',
      })
    },

    setSelectPH: function( event ) {
      this.setModalFieldValue({
        name    : this.wpId,
        value   : event,
        as      : this.as  || '',
        row     : this.row || '',
        position: 'positionHorizontal',
      })
    },

    setSelectRepeat: function( event ) {
      this.setModalFieldValue({
        name    : this.wpId,
        value   : event,
        as      : this.as  || '',
        row     : this.row || '',
        position: 'repeat',
      })
    },

    setSelectSize: function( event ) {
      this.setModalFieldValue({
        name    : this.wpId,
        value   : event,
        as      : this.as  || '',
        row     : this.row || '',
        position: 'size',
      })
    },
  },

  computed: {
    ...mapGetters( 'fields', [ 'getUploadFieldValue' ]),

    storedImageUrl: {
      get() {
        const img = this.getUploadFieldValue(
          this.wpId,
          this.as,
          this.row,
          'bgImg'
        )

        return typeof img === 'undefined' ? '' : img
      },
      set( value ) {
        this.setModalFieldValue({
          name    : this.wpId,
          value   : value,
          as      : this.as  || '',
          row     : this.row || '',
          position: 'bgImg',
        })
      },
    },

    imageSelected: function() {
      return !jQuery.isEmptyObject( this.storedImageUrl )
    },

    getSelectPV: function() {
      return this.getUploadFieldValue(
        this.wpId,
        'grid',
        '',
        'positionVertical'
      )
    },

    getSelectPH: function() {
      return this.getUploadFieldValue(
        this.wpId,
        'grid',
        '',
        'positionHorizontal'
      )
    },

    getSelectRepeat: function() {
      return this.getUploadFieldValue(
        this.wpId,
        'grid',
        '',
        'repeat'
      )
    },

    getSelectSize: function() {
      return this.getUploadFieldValue(
        this.wpId,
        'grid',
        '',
        'size'
      )
    },
  },
}
</script>
