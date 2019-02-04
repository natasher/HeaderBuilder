import ui            from './modules/Common/UI'
import endpoint      from './modules/Common/Endpoint'
import uuid          from './modules/Common/UUID'
import devices       from './modules/Common/Devices'
import items         from './modules/Common/Items'
import inactiveItems from './modules/Common/InactiveItems'
import cell          from './modules/Common/Cell'
import fields        from './modules/Common/Fields'
import modals        from './modules/Common/Modals'
import general       from './modules/Common/General'
import grid          from './modules/Common/Grid'

import DesktopModule       from './modules/Desktop/'
import DesktopStickyModule from './modules/DesktopSticky'
import TabletModule        from './modules/Tablet/'
import TabletStickyModule  from './modules/TabletSticky'
import MobileModule        from './modules/Mobile/'
import MobileStickyModule  from './modules/MobileSticky'

export const storeConfig = {

  strict: true,

  modules: {
    ui,
    endpoint,
    uuid,
    devices,
    items,
    inactiveItems,
    cell,
    fields,
    modals,
    general,
    grid,

    DesktopModule,
    DesktopStickyModule,
    TabletModule,
    TabletStickyModule,
    MobileModule,
    MobileStickyModule,
  }
}