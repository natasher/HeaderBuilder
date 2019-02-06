import Vue     from 'vue'
import Vuex    from 'vuex'
import { storeConfig } from './config'

Vue.config.devtools      = true
Vue.config.productionTip = true

Vue.use( Vuex )

const store = new Vuex.Store( storeConfig )

export default store