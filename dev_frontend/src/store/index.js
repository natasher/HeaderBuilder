import Vue     from 'vue'
import Vuex    from 'vuex'
import { storeConfig } from './config'

Vue.config.devtools      = false
Vue.config.productionTip = false

Vue.use( Vuex )

const store = new Vuex.Store( storeConfig )

export default store