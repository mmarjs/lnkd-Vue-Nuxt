import Vue from 'vue'

Vue.mixin({
  methods: {
    checkPro() {
      let pro = this.$store.getters['auth/user'].pro;
      if(pro) {
        return true;
      } 
      else {
        this.$dialog.confirm({
            message: 'This feature is only available in the PRO plan.<br> Please consider upgrading and unlocking all our features, while supporting the continued development of this tool',
            onConfirm: () => window.location.href = '/upgrade',
            size: 'is-medium',
            confirmText: 'Become PRO',
  
        })
        return false;
      }
    }
  }
})