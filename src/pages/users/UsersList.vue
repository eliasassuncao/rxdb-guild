<template>
  <qas-list-view v-model:fields="fields" v-model:results="results" :entity="entity" :use-filter="false">
    <template #header>
      <qas-page-header title="Lista de usuários" :use-breadcrumbs="false">
        <qas-btn icon="o_add" label="Cadastrar novo usuário" padding="md" :to="{ name: 'UsersCreate' }" :use-label-on-small-screen="false" />
      </qas-page-header>
    </template>

    <template #default>
      <qas-table-generator :fields="fields" :results="results" :columns="columns">
        <template #body-cell-actions="{ row }">
          <div class="flex justify-end no-wrap q-gutter-x-sm">
            <qas-btn dense flat icon="o_edit" rounded size="sm" :to="{ name: 'UsersEdit', params: { id: row.uuid } }" />
          </div>
        </template>
      </qas-table-generator>
    </template>
  </qas-list-view>
</template>

<script>
export default {
  name: 'UsersList',

  data () {
    return {
      fields: {},
      results: []
    }
  },

  computed: {
    entity () {
      return 'users'
    },

    columns () {
      return [
        'name',
        'company',
        { align: 'right', name: 'actions' }
      ]
    }
  }
}
</script>
