<template>
  <qas-form-view v-model="values" v-model:errors="errors" v-model:fields="fields" entity="users" :mode="mx_mode" @submit-success="mx_submitSuccess">
    <template #header>
      <qas-page-header :breadcrumbs="breadcrumbs" :title="title">
        <qas-actions-menu v-if="mx_isEditMode" delete-label="Excluir usuário" :delete-props="deleteProps" />
      </qas-page-header>
    </template>
    <template #default>
      <qas-form-generator v-model="values" :columns="columns" :errors="errors" :fields="fields" />
    </template>
  </qas-form-view>
</template>

<script>
import { formMixin } from 'asteroid'
import { redirectMixin } from 'mixins'

export default {
  name: 'UsersForm',

  mixins: [formMixin, redirectMixin],

  data () {
    return {
      errors: [],
      fields: {},
      values: {}
    }
  },

  computed: {
    breadcrumbs () {
      return [
        { label: 'Lista de usuários', route: { name: 'UsersList' } },
        { label: this.mx_isEditMode ? 'Editar' : 'Novo usuário' }
      ]
    },

    columns () {
      return {
        name: { col: 6 },
        company: { col: 6 }
      }
    },

    deleteProps () {
      return {
        entity: 'users',
        customId: this.values.uuid,
        onSuccess: this.deleteSuccess
      }
    },

    redirectRouteName () {
      return 'UsersList'
    },

    title () {
      return this.mx_isEditMode ? 'Editar Usuário' : 'Criar novo usuário'
    }
  },

  methods: {
    deleteSuccess () {
      this.$router.push({ name: 'UsersList' })
    }
  }
}
</script>
