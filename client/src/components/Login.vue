<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <h2>Login to Transactions</h2>
            </v-flex>

            <v-spacer></v-spacer>

            <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                label="E-mail"
                v-model="email"
                v-bind:rules="emailRules"
                required>
                </v-text-field>
            </v-flex>

            <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                label="Password"
                v-model="password"
                v-bind:rules="passwordRules"
                v-bind:type="'password'"
                required>
                </v-text-field>
            </v-flex>

            <v-flex xs12 sm6 offset-sm3>
                <v-btn @click="cancel">Cancel</v-btn>
                <v-btn color="primary" @click="login">Login</v-btn>
            </v-flex>
        </v-layout>

        <v-snackbar
        :timeout="6000"
        :top="true"
        v-model="showAlert">
            {{ loginError }}
        </v-snackbar>
    </v-container>
</template>

<style scoped>

</style>

<script>
export default {
  data () {
    return {
      showAlert: false,
      message: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    loginError() {
      return this.$store.getters.loginError
    }
  },
  methods: {
    login () {
      const vm = this
      // if (vm.password === 'test111') {
      //   this.$router.push({ path: '/' })
      // } else {
      //   // Show alert to user
      //   this.showAlert = true,
      //   this.message = 'E-mail or Password is invalid'
      // }
      const payload = { 
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('logInUser', payload)
        .then(() => {
          if(vm.isLoggedIn) {
            this.$router.push({ path: '/' })
          } else {
            vm.showAlert = true
          }
        })
    },
    cancel () {
      console.log('Cancelled')
    }
  }
}
</script>
