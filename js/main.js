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
        } else {
          scrollTop.removeClass("show");
        }
      }
    });

  });
})();