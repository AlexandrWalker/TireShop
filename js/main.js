(() => {
  document.addEventListener('DOMContentLoaded', () => {

    var nav = priorityNav.init();

    /**
     * Инициализация слайдера.
     */
    var banner__slider = new Swiper(".banner__slider-init", {
      spaceBetween: 0,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      breakpoints: {
        500: {
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        }
      }
    });

    var reviews__slider = new Swiper(".reviews__slider-init", {
      spaceBetween: 30,
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        500: {
          slidesPerView: 1,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        },
        991: {
          slidesPerView: 2,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        }
      }
    });

    var reviews__slider = new Swiper(".rec__slider-init", {
      spaceBetween: 0,
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        500: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 5,
        }
      }
    });

    /**
     * Управляет поведением меню-бургера.
     */
    document.querySelector(".burger").addEventListener("click", function () {
      document.querySelector(".mob__body").classList.toggle("show");
      document.body.classList.toggle("no-scroll");
    });

    document.querySelector(".mob__container").addEventListener('click', event => {
      event._isClickWithInMenu = true;
    });
    document.querySelector(".burger").addEventListener('click', event => {
      event._isClickWithInMenu = true;
    });
    document.body.addEventListener('click', event => {
      if (event._isClickWithInMenu) return;
      document.querySelector(".mob__body").classList.remove("show");
      document.body.classList.remove("no-scroll");
    });

    /**
     * Управляет переключением вкладок на странице.
     * Добавляет и удаляет классы активности для кнопок и панелей вкладок.
     * Поддерживает вложенные табы любой глубины и сохраняет активное состояние у вложенных табов при переключении внешних.
     */
    document.querySelectorAll('.tabs').forEach((tabsContainer) => {
      tabsContainer.addEventListener('click', (event) => {
        const tabsBtn = event.target.closest('.tabs__btn');
        if (!tabsBtn || !tabsContainer.contains(tabsBtn)) return;

        // Останавливаем всплытие, чтобы вложенные табы не влияли на родительские
        event.stopPropagation();

        // Ищем ближайший контейнер, к которому принадлежит нажатая кнопка
        const currentTabsContainer = tabsBtn.closest('.tabs');
        if (!currentTabsContainer) return;

        // Сбрасываем активные состояния кнопок и панелей только внутри текущего уровня
        const tabsBtns = Array.from(currentTabsContainer.querySelectorAll('.tabs__btn'));
        const tabsPanels = Array.from(currentTabsContainer.querySelectorAll('.tabs__panel'));

        tabsBtns.forEach((btn) => {
          if (btn.closest('.tabs') === currentTabsContainer) {
            btn.classList.remove('tabs__btn--active');
          }
        });

        tabsPanels.forEach((panel) => {
          if (panel.closest('.tabs') === currentTabsContainer) {
            currentTabsContainer.classList.remove('tabs--active');
            panel.parentNode.classList.remove('active');
            panel.classList.remove('tabs__panel--active');
          }
        });

        // Устанавливаем активное состояние для выбранной вкладки
        tabsBtn.classList.add('tabs__btn--active');
        const targetPanel = currentTabsContainer.querySelector(
          `.tabs__panel[data-tab="${tabsBtn.dataset.tab}"]`,
        );
        if (targetPanel) {
          currentTabsContainer.classList.add('tabs--active');
          targetPanel.parentNode.classList.add('active');
          targetPanel.classList.add('tabs__panel--active');
        }
      });
    });

    // back
    (function () {
      var menuLink = document.querySelectorAll('.mob__nav-back'),
        active = document.getElementsByClassName('active'),
        activeTabs = document.getElementsByClassName('tabs--active'),
        activeTabsBtn = document.getElementsByClassName('tabs__btn--active'),
        activeTabsPanel = document.getElementsByClassName('tabs__panel--active');

      Array.from(menuLink).forEach(function (item, i, menuLink) {
        item.addEventListener('click', function (e) {
          if (active.length > 0 && active[0] !== this)
            active[0].classList.remove('active');

          if (activeTabs.length > 0 && activeTabs[0] !== this)
            activeTabs[0].classList.remove('tabs--active');

          if (activeTabsBtn.length > 0 && activeTabsBtn[0] !== this)
            activeTabsBtn[0].classList.remove('tabs__btn--active');

          if (activeTabsPanel.length > 0 && activeTabsPanel[0] !== this)
            activeTabsPanel[0].classList.remove('tabs__panel--active');
        });
      });
    })();

    $(function () {
      let scrollTop = $("#scroll-top");
      let header = $("#header");
      let headerH = header.innerHeight();
      let scrollPos = $(window).scrollTop();

      checkScroll(scrollPos, headerH);

      $(window).on("scroll load resize", function () {
        headerH = header.innerHeight();
        scrollPos = $(this).scrollTop();

        checkScroll(scrollPos, headerH);
      });

      function checkScroll(scrollPos, headerH) {
        if (scrollPos > headerH) {
          scrollTop.addClass("show");
          header.addClass("fixed");
        } else {
          scrollTop.removeClass("show");
          header.removeClass("fixed");
        }
      }
    });

    // inputmask
    let inputs = document.querySelectorAll('input[type="tel"]');
    let im = new Inputmask('+7 (999) 999-99-99');
    im.mask(inputs);

    // validate
    const callback = document.querySelector('.callback');
    if (callback) {
      var button = document.querySelector('.callback__btn');
      var required = document.querySelectorAll('.required');
      button.addEventListener('click', function () {
        for (var i = 0; i < required.length; i++) {
          if (required[i].value !== '') {
            required[i].parentNode.classList.remove('error');
          } else {
            required[i].parentNode.classList.add('error');
          }
        }
      })
    }

    /**
     * Инициализирует аккордеоны на странице.
     * Обрабатывает переключение видимости элементов и кнопки закрытия.
     */
    (function () {
      var accBtn = document.querySelectorAll('.accardion__btn');
      // opened = document.getElementsByClassName('opened');

      Array.from(accBtn).forEach(function (accItem, i, accBtn) {
        accItem.addEventListener('click', function (e) {
          // if (opened.length > 0 && opened[0] !== this)
          //   opened[0].classList.remove('opened');
          this.parentNode.classList.toggle('opened');
        });
      });
    })();

    (function () {
      var filterHead = document.querySelectorAll('.filter__item-head');
      // opened = document.getElementsByClassName('opened');

      Array.from(filterHead).forEach(function (filterItem, i, filterHead) {
        filterItem.addEventListener('click', function (e) {
          // if (opened.length > 0 && opened[0] !== this)
          //   opened[0].classList.remove('opened');
          this.parentNode.classList.toggle('opened');
        });
      });
    })();

    // filter dropdown
    let catalogCounter = document.querySelector('.catalog__counter');
    if (!catalogCounter) {
      return;
    } else {
      // Убавляем кол-во по клику
      document.querySelectorAll('.catalog__counter .minus').forEach(function (element) {
        element.addEventListener('click', function (event) {
          event.preventDefault();
          let input = this.parentElement.querySelector('.catalog__counter-quantity');
          let count = parseInt(input.value) - 1;
          count = count < 1 ? 1 : count;
          input.value = count;
        });
      });

      // Прибавляем кол-во по клику
      document.querySelectorAll('.catalog__counter .plus').forEach(function (element) {
        element.addEventListener('click', function (event) {
          event.preventDefault();
          let input = this.parentElement.querySelector('.catalog__counter-quantity');
          let count = parseInt(input.value) + 1;
          count = count > parseInt(input.dataset.maxCount) ? parseInt(input.dataset.maxCount) : count;
          input.value = parseInt(count);
        });
      });

      // Убираем все лишнее и невозможное при изменении поля
      document.querySelectorAll('.catalog__counter .catalog__counter-quantity').forEach(function (element) {
        element.addEventListener("change", function (event) {
          event.preventDefault();
          if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
          }
          if (this.value == "") {
            this.value = 1;
          }
          if (this.value > parseInt(this.dataset.maxCount)) {
            this.value = parseInt(this.dataset.maxCount);
          }
        });
      });
    }

    /* sorting */
    (function () {
      var sortBtn = document.querySelectorAll('.sort__filter-btn');
      sortBtnActive = document.getElementsByClassName('sort__filter-btn--active');

      Array.from(sortBtn).forEach(function (sortItem, i, sortBtn) {
        sortItem.addEventListener('click', function (e) {
          if (sortBtnActive.length > 0 && sortBtnActive[0] !== this)
            sortBtnActive[0].classList.remove('sort__filter-btn--active');

          this.classList.add('sort__filter-btn--active');
        });
      });
    })();

    (function () {
      var sortUp = document.querySelectorAll('.sort__filter-btn');
      sortUpBtn = document.getElementsByClassName('up');

      Array.from(sortUp).forEach(function (sortUpItem, i, sortUp) {
        sortUpItem.addEventListener('click', function (e) {
          if (sortUpBtn.length > 0 && sortUpBtn[0] !== this)
            sortUpBtn[0].classList.remove('up');

          this.classList.toggle('up');
        });
      });
    })();

    (function () {
      var displayBtn = document.querySelectorAll('.sort__display-btn'),
        displayBtnActive = document.getElementsByClassName('active'),
        catalogItems = document.querySelector('.catalog__items');

      Array.from(displayBtn).forEach(function (displayItem, i, displayBtn) {
        displayItem.addEventListener('click', function (e) {
          if (displayBtnActive.length > 0 && displayBtnActive[0] !== this)
            displayBtnActive[0].classList.remove('active');

          this.classList.add('active');

          catalogItems.classList.remove('block');
          catalogItems.classList.remove('list');
          catalogItems.classList.remove('table');

          catalogItems.classList.add(this.dataset.value);
        });
      });
    })();

    // catalog icons
    (function () {
      var iconsItem = document.querySelectorAll('.catalog__icons-item');
      iconsActive = document.getElementsByClassName('catalog__icons-item--active');

      Array.from(iconsItem).forEach(function (iItem, i, iconsItem) {
        iItem.addEventListener('click', function (e) {
          this.classList.toggle('catalog__icons-item--active');

          // if (iconsActive.length > 0 && iconsActive[0] !== this) {
          //   iconsActive[0].parentNode.classList.add('catalog__icons--active');
          // } else {
          //   iconsActive[0].parentNode.classList.remove('catalog__icons--active');
          // }
        });
      });
    })();

    document.querySelectorAll('.select').forEach(function (dropDownWrapper) {
      const dropDownBtn = dropDownWrapper.querySelector('.select__button');
      const dropDownList = dropDownWrapper.querySelector('.select__list');
      const dropDownListItems = dropDownList.querySelectorAll('.select__list-item');
      const dropDownInput = dropDownWrapper.querySelector('.select__input-hidden');
      const dropDownReset = document.querySelector('.filter__reset');
      const defaultItem = document.querySelectorAll('.select__list-item--first');

      defaultItem.forEach(function (defaultItem) {
        dropDownReset.addEventListener('click', function (e) {
          e.stopPropagation();
          defaultItem.click();
        });
      });

      dropDownBtn.addEventListener('click', function (e) {
        dropDownList.classList.toggle('select__list--visible');
        this.classList.add('select__button--active');
      });

      dropDownListItems.forEach(function (listItem) {
        listItem.addEventListener('click', function (e) {
          e.stopPropagation();
          dropDownBtn.innerHTML = this.innerHTML;
          dropDownBtn.value = this.dataset.value;
          dropDownBtn.focus();
          dropDownInput.value = this.dataset.value;
          dropDownList.classList.remove('select__list--visible');
        });
      });

      document.addEventListener('click', function (e) {
        if (e.target !== dropDownBtn) {
          dropDownBtn.classList.remove('select__button--active');
          dropDownList.classList.remove('select__list--visible');
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
          dropDownBtn.classList.remove('select__button--active');
          dropDownList.classList.remove('select__list--visible');
        }
      });
    });

  });
})();