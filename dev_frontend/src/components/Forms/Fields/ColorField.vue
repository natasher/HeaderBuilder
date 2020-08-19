<template>
  <div class = 'row'>

    <div class = 'col col-left'>
      <span class = 'title'>{{ fieldName }}</span>
    </div>

    <div class = 'col col-right'>
      <div class = 'mfn-field mfnf-color'>

        <input class     = 'mfn-color-field'
              :id        = "wpId + '_ColorField'"
              type       = 'text'
              data-alpha = 'true'
              :value     = 'getCurrentColor'
              @change    = 'updateColorField' />

      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  name: 'ColorField',

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
    /**
     * Each field should has its own default color,
     * it cannt be restored from the state (due to its mutable nature)
     */
    default: {
      type    : String,
      required: true,
    },
  },

  methods: {
    ...mapActions( 'fields', [ 'setModalFieldValue' ]),

    /**
     * updateColorField is triggered by wpColorPicker Event::change() hook.
     */
    updateColorField( event ) {
      if ( _.isString( event ) ) {
        this.setModalFieldValue({
          name : this.wpId,
          value: event,
          as   : this.as,
          row  : this.row,
        })
      }
    },

  },

  computed: {
    ...mapGetters( 'fields', [ 'getColorFieldValue' ]),

    getCurrentColor() {
      return this.getColorFieldValue( this.wpId, this.as, this.row )
    },
  },

  /** Lifecycle methods: */
  mounted() {
    /**!
     * wp-color-picker-alpha
     *
     * Overwrite Automattic Iris for enabled Alpha Channel in wpColorPicker
     * Only run in input and is defined data alpha in true
     *
     * Version: 2.1.4
     * https://github.com/kallookoo/wp-color-picker-alpha
     * Licensed under the GPLv2 license.
     */
    /* eslint-disable-next-line */
    !function(t){if(!t.wp.wpColorPicker.prototype._hasAlpha){var o="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAAHnlligAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHJJREFUeNpi+P///4EDBxiAGMgCCCAGFB5AADGCRBgYDh48CCRZIJS9vT2QBAggFBkmBiSAogxFBiCAoHogAKIKAlBUYTELAiAmEtABEECk20G6BOmuIl0CIMBQ/IEMkO0myiSSraaaBhZcbkUOs0HuBwDplz5uFJ3Z4gAAAABJRU5ErkJggg==";Color.fn.toString=function(){if(this._alpha<1)return this.toCSS("rgba",this._alpha).replace(/\s+/g,"");var t=parseInt(this._color,10).toString(16);return this.error?"":(t.length<6&&(t=("00000"+t).substr(-6)),"#"+t)},t.widget("wp.wpColorPicker",t.wp.wpColorPicker,{_hasAlpha:!0,_create:function(){if(t.support.iris){var i=this,e=i.element;if(wpColorPickerL10n={defaultLabel:"Color value",pick:"Select color",defaultString:"Default",clear:"Clear"},t.extend(i.options,e.data()),"hue"===i.options.type)return i._createHueOnly();i.close=t.proxy(i.close,i),i.initialValue=e.val(),e.addClass("wp-color-picker"),e.parent("label").length||(e.wrap("<label></label>"),i.wrappingLabelText=t('<span class="screen-reader-text"></span>').insertBefore(e).text(wpColorPickerL10n.defaultLabel)),i.wrappingLabel=e.parent(),i.wrappingLabel.wrap('<div class="wp-picker-container" />'),i.wrap=i.wrappingLabel.parent(),i.toggler=t('<button type="button" class="button wp-color-result" aria-expanded="false"><span class="wp-color-result-text"></span></button>').insertBefore(i.wrappingLabel).css({backgroundColor:i.initialValue}),i.toggler.find(".wp-color-result-text").text(wpColorPickerL10n.pick),i.pickerContainer=t('<div class="wp-picker-holder" />').insertAfter(i.wrappingLabel),i.button=t('<input type="button" class="button button-small" />'),i.options.defaultColor?i.button.addClass("wp-picker-default").val(wpColorPickerL10n.defaultString):i.button.addClass("wp-picker-clear").val(wpColorPickerL10n.clear),i.wrappingLabel.wrap('<span class="wp-picker-input-wrap hidden" />').after(i.button),i.inputWrapper=e.closest(".wp-picker-input-wrap"),e.iris({target:i.pickerContainer,hide:i.options.hide,width:i.options.width,mode:i.options.mode,palettes:i.options.palettes,change:function(e,a){i.options.alpha?(i.toggler.css({"background-image":"url("+o+")"}),i.toggler.css({position:"relative"}),0==i.toggler.find("span.color-alpha").length&&i.toggler.append('<span class="color-alpha" />'),i.toggler.find("span.color-alpha").css({width:"30px",height:"100%",position:"absolute",top:0,left:0,"border-top-left-radius":"2px","border-bottom-left-radius":"2px",background:a.color.toString()})):i.toggler.css({backgroundColor:a.color.toString()}),t.isFunction(i.options.change)&&i.options.change.call(this,e,a)}}),e.val(i.initialValue),i._addListeners(),i.options.hide||i.toggler.click()}},_addListeners:function(){var o=this;o.wrap.on("click.wpcolorpicker",function(t){t.stopPropagation()}),o.toggler.click(function(){o.toggler.hasClass("wp-picker-open")?o.close():o.open()}),o.element.on("change",function(i){(""===t(this).val()||o.element.hasClass("iris-error"))&&(o.options.alpha?o.toggler.find("span.color-alpha").css("backgroundColor",""):o.toggler.css("backgroundColor",""),t.isFunction(o.options.clear)&&o.options.clear.call(this,i))}),o.button.on("click",function(i){t(this).hasClass("wp-picker-clear")?(o.element.val(""),o.options.alpha?o.toggler.find("span.color-alpha").css("backgroundColor",""):o.toggler.css("backgroundColor",""),t.isFunction(o.options.clear)&&o.options.clear.call(this,i),o.element.trigger("change")):t(this).hasClass("wp-picker-default")&&o.element.val(o.options.defaultColor).change()})}}),t.widget("a8c.iris",t.a8c.iris,{_create:function(){if(this._super(),this.options.alpha=this.element.data("alpha")||!1,this.element.is(":input")||(this.options.alpha=!1),void 0!==this.options.alpha&&this.options.alpha){var o=this,i=o.element,e=t('<div class="iris-strip iris-slider iris-alpha-slider"><div class="iris-slider-offset iris-slider-offset-alpha"></div></div>').appendTo(o.picker.find(".iris-picker-inner")),a=e.find(".iris-slider-offset-alpha"),r={aContainer:e,aSlider:a};void 0!==i.data("custom-width")?o.options.customWidth=parseInt(i.data("custom-width"))||0:o.options.customWidth=100,o.options.defaultWidth=i.width(),(o._color._alpha<1||-1!=o._color.toString().indexOf("rgb"))&&i.width(parseInt(o.options.defaultWidth+o.options.customWidth)),t.each(r,function(t,i){o.controls[t]=i}),o.controls.square.css({"margin-right":"0"});var n=o.picker.width()-o.controls.square.width()-20,l=n/6,s=n/2-l;t.each(["aContainer","strip"],function(t,i){o.controls[i].width(s).css({"margin-left":l+"px"})}),o._initControls(),o._change()}},_initControls:function(){if(this._super(),this.options.alpha){var t=this;t.controls.aSlider.slider({orientation:"vertical",min:0,max:100,step:1,value:parseInt(100*t._color._alpha),slide:function(o,i){t._color._alpha=parseFloat(i.value/100),t._change.apply(t,arguments)}})}},_change:function(){this._super();var t=this,i=t.element;if(this.options.alpha){var e=t.controls,a=parseInt(100*t._color._alpha),r=t._color.toRgb(),n=["rgb("+r.r+","+r.g+","+r.b+") 0%","rgba("+r.r+","+r.g+","+r.b+", 0) 100%"],l=t.options.defaultWidth,s=t.options.customWidth,p=t.picker.closest(".wp-picker-container").find(".wp-color-result");e.aContainer.css({background:"linear-gradient(to bottom, "+n.join(", ")+"), url("+o+")"}),p.hasClass("wp-picker-open")&&(e.aSlider.slider("value",a),t._color._alpha<1?(e.strip.attr("style",e.strip.attr("style").replace(/rgba\(([0-9]+,)(\s+)?([0-9]+,)(\s+)?([0-9]+)(,(\s+)?[0-9\.]+)\)/g,"rgb($1$3$5)")),i.width(parseInt(l+s))):i.width(l))}(i.data("reset-alpha")||!1)&&t.picker.find(".iris-palette-container").on("click.palette",".iris-palette",function(){t._color._alpha=1,t.active="external",t._change()}),i.trigger("change")},_addInputListeners:function(t){var o=this,i=function(i){var e=new Color(t.val()),a=t.val();t.removeClass("iris-error"),e.error?""!==a&&t.addClass("iris-error"):e.toString()!==o._color.toString()&&("keyup"===i.type&&a.match(/^[0-9a-fA-F]{3}$/)||o._setOption("color",e.toString()))};t.on("change",i).on("keyup",o._debounce(i,100)),o.options.hide&&t.on("focus",function(){o.show()})}})}}(jQuery);

    const that    = this
    const colorId = `#${ this.wpId }_ColorField`

    jQuery( colorId ).wpColorPicker({
      /**
       * When color change on the `wpColorPicker`,
       * invoke `updateColorField` methods.
       *
       * @event change
       * @type {wpColorPicker}
       * @param {object} ui wpColorPicker ui object
       */
      change: function( event, ui ) {
        that.updateColorField( ui.color.toString() )
      },
      clear: function () {
        that.updateColorField( that.default )
      },
      defaultColor: that.default,
      mode        : 'hsl',
      width       : 275,
    }, true)
  },
}
</script>
