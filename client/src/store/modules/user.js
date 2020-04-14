const state = {
    email: '',
    userId: null,
    isLoggedIn: false,
    loginError: ''
}

const getters = {
    isLoggedIn: state => state.isLoggedIn,
    userId: state => state.userId,
    loginError: state => state.loginError
}

const actions = {
    logInUser ({ commit }, payload) {
        // Call into API
        if(payload.email === 'test@email.com' && payload.password === 'password') {
            // Simulate getting back a valid userId from API call
            payload.userId = 'test'
            commit('logInUser', payload)
        } else {
            commit('loginError')
        }

    }
}

const mutations = {
    logInUser (state, payload) {
        state.email = payload.email
        state.userId = payload.userId
        state.isLoggedIn = true
    },
    loginError (state) {
        state.isLoggedIn = false
        state.loginError = 'Invalid E-mail/Password. Login failed'
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}