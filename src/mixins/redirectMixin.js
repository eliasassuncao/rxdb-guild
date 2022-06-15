export default {
  methods: {
    mx_redirect (id) {
      return this.$router.push({ name: this.redirectRouteName, params: { id } })
    },

    mx_submitSuccess ({ data }) {
      const id = data.metadata?.uuid || data.result?.uuid

      this.mx_redirect(id)
    }
  }
}
