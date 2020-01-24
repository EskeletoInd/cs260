$(function () {
  var page = window.location.href.split('/');
  page = page[page.length - 1].split('.')[0];
  document.getElementById(page).classList.add('active');
  }
);
