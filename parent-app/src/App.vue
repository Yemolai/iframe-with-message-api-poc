<template>
  <div id="app">
    <h1>Parent APP</h1>
    <p>{{childUrl}}</p>
    <iframe
        class="iframe"
        ref="iframe"
        :src="childUrl"
        frameborder="0"
        width="600px"
        height="600px"
    />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      listenerRef: null,
      childUrl: process.env.VUE_APP_CHILD_URL || 'http://localhost:8076'
    }
  },
  mounted () {
    const listener = (event) => {
      const { data } = event
      try {
        const hasType = Object.prototype.hasOwnProperty.call(data,'type')
        if (hasType && data.type === 'authRequest') {
          console.log({ message: data })
          const iframe = this.$refs.iframe
          const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MjExOTQwMz
          csImV4cCI6MTY1MjczMDAzNywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6
          IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZW
          N0IEFkbWluaXN0cmF0b3IiXX0.Z3sYfIBqtAY-9UAKf2425CuHLVo-VYvFxDoRcpdPhhs`.replace(/(\n|(\s+))/, '')
          const data = {
            token,
            firstName: 'Gabriel',
            username: 'yemolai',
            baseURL: 'https://test.1mc.co'
          }
          const message = { type: 'authData', data }
          iframe.contentWindow.postMessage(message, '*')
        }
      } catch (err) {
        console.error('failed to answer message:', err.message)
      }
    }
    window.addEventListener('message', listener)
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
.iframe {
  border: solid 1px rgba(0,0,0,0.5);
}
</style>
