<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/oldmaid">Old Maid</router-link>
      <router-link to="/blackjack">Blackjack</router-link>
    </div>
    <router-view/>
    <div class="footer">
  <div class="github-url">
    <a href="https://github.com/EskeletoInd/cs260/tree/master/project3">
      https://github.com/EskeletoInd/cs260/tree/master/project3
    </a>
  </div>
</div>
  </div>
</template>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.footer {
  position: relative;
  clear: both;
  width: 100%;
  height: 2.5rem;
  flex-grow: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
