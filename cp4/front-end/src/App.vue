<template>
<div id="app">
  <div class="page">
    <div class="header">
      <router-link to="/">
        <div class="logo">
          <img src="/swap.png">
        </div>
      </router-link>
      <div class="title">
        <h1>Picture Swap</h1>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <router-link to="/admin">Admin</router-link>
      <router-link to="https://github.com/EskeletoInd/cs260/tree/master/cp4">
        https://github.com/EskeletoInd/cs260/tree/master/cp4</router-link>
      <router-link to="https://www.flaticon.com/authors/smashicons">Icon From Smashicon</router-link>
    </div>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 0;
  background-color: #200094;
  color: black;
  flex-grow: 0;
  min-width: 100%;
  justify-content: center;
  align-items: center;
}

.logo,
.logo img {
  height: 50px;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

.content {
  min-width: 100%;
  padding: 3.5rem 0px;
  min-height: 500px;
  padding-bottom: 2.5rem;
  flex-grow: 1;
}

/* Footer */
.footer {
  position: relative;
  clear: both;
  height: 3.5rem;
  width: 100%;
  padding: 0;
  flex-grow: 0;
  background: #e3e3e3;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
}

.footer a {
  color: #000;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}

.page {
  position: relative;
  min-height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}
</style>
