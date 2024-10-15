(() => {
  document.addEventListener('DOMContentLoaded', () => {

    // validate
    const callback = document.querySelector('.callback__form');
    if (callback) {
      var button = document.querySelector('.callback__btn');
      var required = document.querySelectorAll('.required');
      button.addEventListener('click', function () {
        for (var i = 0; i < required.length; i++) {
          if (required[i].value !== '') {
            required[i].parentNode.parentNode.classList.remove('error');
          } else {
            required[i].parentNode.parentNode.classList.add('error');
          }
        }
      })
    }

  });
})();