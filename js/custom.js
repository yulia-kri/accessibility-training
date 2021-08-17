(function () {
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('#' + burger.dataset.target);
  burger.addEventListener('click', function () {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  });
})();

document.querySelectorAll('#nav li').forEach(function (navEl) {
  navEl.onclick = function () {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll('#nav li');

  navEls.forEach(function (navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add('is-active');
    } else {
      if (navEl.classList.contains('is-active')) {
        navEl.classList.remove('is-active');
      }
    }
  });

  var tabs = document.querySelectorAll('.tab-pane');

  tabs.forEach(function (tab) {
    if (tab.id == targetId) {
      tab.style.display = 'block';
    } else {
      tab.style.display = 'none';
    }
  });
}

const menuEl = document.querySelector('.dropMenu-menu');

document.querySelector('.skip-to-link').addEventListener('click', () => {
  if (menuEl.classList.contains('open')) {
    menuEl.classList.remove('open');
  } else {
    menuEl.classList.add('open');
  }
});

menuEl.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    menuEl.classList.remove('open');
  }
});

document.querySelector('.navbar-brand > a').addEventListener('focus', () => {
  menuEl.classList.remove('open');
});
