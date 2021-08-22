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

const toggleExpandedMenuElem = document.getElementById('expanded-menu-item');
const expandedMenuElem = document.querySelector('#expanded-menu-item > ul');
const expandedMenuItemsElems = document.querySelectorAll(
  '#expanded-menu-item [role="menuitem"]'
);

toggleExpandedMenuElem.addEventListener('click', toggleMenu);

toggleExpandedMenuElem.addEventListener('keydown', (e) => {
  const { code } = e;

  const expanded =
    toggleExpandedMenuElem.getAttribute('aria-expanded') === 'true';

  switch (code) {
    case 'Space':
    case 'Enter':
      e.preventDefault();
      if (!expanded) {
        openMenu();
      } else {
        alert(document.activeElement.textContent);
        closeMenu();
      }
      break;
    case 'Escape':
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
      if (expanded) {
        e.preventDefault();

        const current = document.activeElement;
        const index = +current?.dataset?.index;
        const { length } = expandedMenuItemsElems;

        current.blur();

        const target =
          index + 1 < length
            ? expandedMenuItemsElems[index + 1]
            : expandedMenuItemsElems[0];
        target.focus();
      }
      break;
    case 'ArrowUp':
      if (expanded) {
        e.preventDefault();

        const current = document.activeElement;
        const index = +current?.dataset?.index;
        const { length } = expandedMenuItemsElems;

        current.blur();

        const target =
          index - 1 >= 0
            ? expandedMenuItemsElems[index - 1]
            : expandedMenuItemsElems[length - 1];
        target.focus();
      }
      break;
    case 'Home':
      if (expanded) {
        e.preventDefault();

        const current = document.activeElement;
        current.blur();

        expandedMenuItemsElems[0].focus();
      }
      break;
    case 'End':
      if (expanded) {
        e.preventDefault();

        const current = document.activeElement;
        current.blur();

        expandedMenuItemsElems[expandedMenuItemsElems.length - 1].focus();
      }
      break;
  }
});

function toggleMenu() {
  if (toggleExpandedMenuElem.getAttribute('aria-expanded') === 'true') {
    closeMenu();
  } else {
    openMenu();
  }
}

function openMenu() {
  toggleExpandedMenuElem.setAttribute('aria-expanded', 'true');
  expandedMenuElem.style.display = 'block';
  expandedMenuItemsElems[0].focus();
}

function closeMenu() {
  toggleExpandedMenuElem.setAttribute('aria-expanded', 'false');
  expandedMenuElem.style.display = 'none';
}
