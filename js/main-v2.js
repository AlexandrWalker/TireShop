(() => {
  document.addEventListener('DOMContentLoaded', () => {

    /**
     * Инициализация таба карточки товара.
     */
    (function () {
      const block__nav = document.querySelector('.block__nav');
      if (block__nav) {
        const blockBtn = document.querySelectorAll('.block__nav-item')
        const blockItem = document.querySelectorAll('.block__item')

        blockBtn.forEach(blockClick);

        function blockClick(item) {
          item.addEventListener('click', function () {
            let currentBtn = item;
            let blockId = currentBtn.getAttribute('data-tab');
            let currentTab = document.querySelector(blockId);

            if (!currentBtn.classList.contains('block__nav-item--active')) {

              blockBtn.forEach(function (item) {
                item.classList.remove('block__nav-item--active');
              });

              blockItem.forEach(function (item) {
                item.classList.remove('block__item--active');
              });

              currentBtn.classList.add('block__nav-item--active');
              currentTab.classList.add('block__item--active');
            }
          })
        }
      }
    })();

    /**
     * Новая валидация
     */
    (function () {
      const requiredValue = document.querySelector('.required');
      if (requiredValue) {
        var reqBtn = document.querySelectorAll('button');
        var required = document.getElementsByClassName('required');

        Array.from(reqBtn).forEach(function (reqItem, i, reqBtn) {
          reqItem.addEventListener('click', function (e) {
            for (var i = 0; i < required.length; i++) {
              if (required[i].value !== '' && required[i].checked !== true) {
                required[i].parentNode.parentNode.classList.remove('error');
              } else {
                required[i].parentNode.parentNode.classList.add('error');
              }
            }
          });
        });
      }
    })();

    /**
     * Скрипты для страницы оформления заказа
     */
    (function () {
      const orders__payments = document.querySelector('.orders__payments');
      if (orders__payments) {
        var ordersPayment = document.querySelectorAll('.orders__payments-item'),
          ordersPaymentActive = document.getElementsByClassName('orders__payments-item--active'),
          ordersListPayment = document.querySelector('.orders__list-payment');

        Array.from(ordersPayment).forEach(function (ordersPaymentsItem, i, ordersPayment) {
          ordersPaymentsItem.addEventListener('click', function (e) {
            if (ordersPaymentActive.length > 0 && ordersPaymentActive[0] !== this)
              ordersPaymentActive[0].classList.remove('orders__payments-item--active');

            this.classList.toggle('orders__payments-item--active');
            ordersListPayment.dataset.value = this.dataset.value;
            ordersListPayment.innerHTML = ordersListPayment.dataset.value;
          });
        });
      }
    })();

    (function () {
      const orders__change = document.querySelector('.orders__list-change');
      if (orders__change) {
        var ordersChange = document.querySelectorAll('.orders__list-change'),
          ordersChangeActive = document.getElementsByClassName('orders__list-change--active');

        Array.from(ordersChange).forEach(function (ordersChangeItem, i, ordersChange) {
          ordersChangeItem.addEventListener('click', function (e) {
            if (ordersChangeActive.length > 0 && ordersChangeActive[0] !== this)
              ordersChangeActive[0].parentNode.classList.remove('orders__list-change--active')

            // this.classList.toggle('orders__list-change--active');
            this.parentNode.classList.toggle('order__payments--active');
          });
        });
      }
    })();

    /**
     * Иницилизация Fancybox
     */
    $('[data-fancybox="gallery"]').fancybox({
      loop: true,
    });

  });
})();