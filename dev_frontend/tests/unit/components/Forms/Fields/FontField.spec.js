import { shallowMount, createLocalVue } from '@vue/tetst-utils'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import merge         from 'lodash.merge'
import FontField      from '../../../../../src/components/Forms/Fields/FormField.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

function createStore( overrides ) {
    const defaultStoreConfig = {
        modules: {
        }
    }

    return new Vuex.Store(
        merge( defaultStoreConfig, overrides )
    )
}

function createWrapper( overrides ) {
    const defaultMountingOptions = {
        localVue,
        store: createStore(),
        propsData: {
            fieldName: 'Test Field',
            wpId     : 'testField',
        }
    }

    return shallowMount( FontField, merge( defaultMountingOptions, overrides ))
}

describe( 'snapshots:', () => {
    test.skip( 'should match snapshot', () => {

    })
})