<template>
  <div id="app">
    <h1>Child app</h1>
    <p>Username: {{username}}</p>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      listenerRef: null,
      username: 'unknown',
      token: null
    }
  },
  mounted () {
    const listener = (event) => {
      const { data: message } = event
      try {
        if ('type' in message && message.type === 'authData') {
          const { data = {} } = message
          const { token, username } = data
          this.username = username
          this.token = token
        }
      } catch (err) {
        console.error('failed to parse message', err.message)
      }
    }
    window.addEventListener('message', listener)
    this.listenerRef = listener
    if ('parent' in window) {
      window.parent.postMessage({ type: 'authRequest' }, '*')
    }
  },
  beforeDestroy () {
    if (this.listenerRef) {
      window.removeEventListener('message', this.listenerRef)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
