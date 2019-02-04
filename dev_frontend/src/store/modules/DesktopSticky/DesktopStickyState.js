export default {

  layoutPosition: 'top',
  grid: {
    status : 'auto',
    options: {
      backgroundColor: '#ffffff',
      layout: {
        label: 'Wrap into grid',
        value: 'wrap_into_grid',
      },
      backgroundImage: {
        bgImg: '',
        positionVertical: {
          label: 'top',
          value: 'top',
        },
        positionHorizontal: {
          label: 'left',
          value: 'left',
        },
        repeat: {
          label: 'repeat',
          value: 'repeat',
        },
        size: {
          label: 'auto',
          value: 'auto',
        },
      }
    }
  },
  actionBar: {
    active : false,
    options: {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      height: '40',
    },
    items: {
      all   : [],
      left  : [],
      center: [],
      right : [],
    }
  },
  firstRow: {
    options: {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      height: '80',
    },
    items: {
      left  : [],
      center: [],
      right : [],
    },
  },
  secondRow: {
    active : false,
    options: {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      height: '80',
    },
    items: {
      all   : [],
      left  : [],
      center: [],
      right : [],
    }
  },

}