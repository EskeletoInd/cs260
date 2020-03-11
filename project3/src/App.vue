<template>
<div id="app">
  <div class="content-container">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/oldmaid">Old Maid</router-link> |
      <router-link to="/blackjack">Blackjack</router-link>
    </div>
    <router-view />
  </div>
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
body {
  margin: 0px;
}

#app {
  min-width: 100vh;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;

  background-color: #308834;
  display: flex;
  flex-direction: column;
  margin: 0;
}


#nav {
  padding: 30px;
  flex-grow: 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.content-container {
  min-width: 100%;
  flex-grow: 1;
  padding-bottom: 2.5rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
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
  background-color: #1a4a1c;
}

.footer a {
  color: #fff;
}
</style>
