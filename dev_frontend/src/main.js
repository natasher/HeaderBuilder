import Vue     from 'vue'
import VModal  from 'vue-js-modal'
import shortid from 'shortid'
import App     from './components/App.vue'
import store from './store'

Vue.prototype.$genid = shortid

Vue.use(VModal)

new Vue({
  el: '#mfnHeaderBuilder',
  store,
  render: h => h( App ),
})

window.onbeforeunload = function () {
  if ( store.state.general.editorHasChanged ) {
    return 'This page is asking you to confirm that you want to leave - data you have entered may not be saved.'
  }
}