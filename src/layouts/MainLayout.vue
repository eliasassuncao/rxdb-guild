<template>
  <qas-layout v-model="menuDrawer" :app-bar-props="appBarProps" :app-menu-props="appMenuProps" />
</template>

<script>
const menuList = [
  {
    label: 'Usuários',
    icon: 'o_person',
    to: { name: 'UsersList' }
  }
]

export default {
  name: 'MainLayout',

  data () {
    return {
      menuDrawer: this.$q.screen.gt.sm
    }
  },

  computed: {
    brand () {
      return 'https://via.placeholder.com/150x50'
    },

    appBarProps () {
      return {
        id: 'layout-header',
        title: 'Guilda'
      }
    },

    appMenuProps () {
      return {
        items: menuList
      }
    }
  }
}
</script>
