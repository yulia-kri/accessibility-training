(function () {
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('#' + burger.dataset.target);
  burger.addEventListener('click', function () {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  });
})();

const tabs = document.querySelectorAll('[role="tab"]');

tabs.forEach(function (tab) {
  tab.addEventListener('click', toggleTab);
  tab.addEventListener('keyup', toggleTab);
  tab.addEventListener('keydown', toggleTab);
});

function toggleTab(event) {
  const { code, type } = event;
  const currentTab = document
    .querySelector('[role="tablist"]')
    .querySelector('[aria-selected="true"]');

  if (type.match('click')) {
    const selectedTab = event.currentTarget.id;

    tabs.forEach((tab) => {
      tab.id === selectedTab ? activateTab(tab) : deactivateTab(tab);
    });
    toggleTabPanels(event.currentTarget);
  }

  if (type.match('keyup')) {
    if (code === 'ArrowLeft' || code === 'ArrowRight') {
      const direction = {
        ArrowLeft: -1,
        ArrowRight: 1,
      };

      event.preventDefault();
      const index = currentTab.id - 1;

      deactivateTab(currentTab);

      if (tabs[index + direction[code]]) {
        activateTab(tabs[index + direction[code]]);
      } else if (code === 'ArrowRight') {
        activateFirst();
      } else {
        activateLast();
      }
    }

    if (code === 'Space' || code === 'Enter') {
      toggleTabPanels(event.currentTarget);
    }
  }

  if (type.match('keydown')) {
    if (code === 'Home' || code === 'End') {
      event.preventDefault();
      deactivateTab(currentTab);

      switch (code) {
        case 'Home':
          activateFirst();
          break;
        case 'End':
          activateLast();
          break;
      }
    }
  }
}

function activateFirst() {
  activateTab(tabs[0]);
}

function activateLast() {
  activateTab(tabs[tabs.length - 1]);
}

function activateTab(tab) {
  tab.removeAttribute('tabindex');
  tab.setAttribute('aria-selected', 'true');
  tab.focus();
}

function deactivateTab(tab) {
  tab.setAttribute('tabindex', '-1');
  tab.setAttribute('aria-selected', 'false');
  tab.blur();
}

function toggleTabPanels(selected) {
  document.querySelectorAll('[role="tabpanel"]').forEach((el) => {
    el.style.display = 'none';
  });

  const controls = selected.getAttribute('aria-controls');
  document.getElementById(controls).style.display = 'block';
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

function displayRandomImage() {
  const container = document.querySelector('.image-container');

  fetch(`https://source.unsplash.com/1600x900/?people`).then((response) => {
    container.innerHTML = `
      <img src="${response.url}" alt=""/>
      <p>Image was changed!</p>
    `;
  });
}

setInterval(displayRandomImage, 60000);

const toggleExpandedMenu = document.getElementById('toggle-expanded-menu');
const expandedMenu = document.getElementById('expanded-menu');
const expandedMenuItems = document.querySelectorAll(
  '#expanded-menu [role="menuitem"]'
);
const expanded = () =>
  toggleExpandedMenu.getAttribute('aria-expanded') === 'true';

toggleExpandedMenu.addEventListener('click', toggleMenu);

toggleExpandedMenu.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'Enter') {
    e.preventDefault();
    openMenu();
  }
  if (e.code === 'Tab' && expanded()) {
    closeMenu();
  }
});

expandedMenuItems.forEach((item) =>
  item.addEventListener('keydown', handleMenuItemKeyDown)
);

function toggleMenu() {
  if (expanded()) {
    closeMenu();
  } else {
    openMenu();
  }
}

function openMenu() {
  toggleExpandedMenu.setAttribute('aria-expanded', 'true');
  expandedMenu.style.display = 'flex';
  expandedMenuItems[0].focus();
}

function closeMenu() {
  toggleExpandedMenu.setAttribute('aria-expanded', 'false');
  expandedMenu.style.display = 'none';
}

function handleMenuItemKeyDown(e) {
  const { code } = e;

  switch (code) {
    case 'Space':
    case 'Enter':
      e.preventDefault();
      closeMenu();
      break;
    case 'Escape':
    case 'Tab':
      e.preventDefault();
      closeMenu();
      break;
    case 'ArrowRight':
      e.preventDefault();
      closeMenu();
      document.querySelector('#navbarMenu > ul > li:nth-child(3) > a').focus();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      closeMenu();
      document.querySelector('#navbarMenu > ul > li:nth-child(1) > a').focus();
      break;
    case 'ArrowDown':
      if (expanded()) {
        e.preventDefault();

        const current = document.activeElement;
        const index = +current?.dataset?.index;
        const { length } = expandedMenuItems;

        current.blur();

        const target =
          index + 1 < length
            ? expandedMenuItems[index + 1]
            : expandedMenuItems[0];
        target.focus();
      }
      break;
    case 'ArrowUp':
      if (expanded()) {
        e.preventDefault();

        const current = document.activeElement;
        const index = +current?.dataset?.index;
        const { length } = expandedMenuItems;

        current.blur();

        const target =
          index - 1 >= 0
            ? expandedMenuItems[index - 1]
            : expandedMenuItems[length - 1];
        target.focus();
      }
      break;
    case 'Home':
      if (expanded()) {
        e.preventDefault();

        const current = document.activeElement;
        current.blur();

        expandedMenuItems[0].focus();
      }
      break;
    case 'End':
      if (expanded()) {
        e.preventDefault();

        const current = document.activeElement;
        current.blur();

        expandedMenuItems[expandedMenuItems.length - 1].focus();
      }
      break;
  }
}
