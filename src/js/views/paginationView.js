class PaginationView {
  #parentElement = document.querySelector('.pagination');
  #data;

  render(data) {
    this.#data = data;
  }
  addHandlerEvent(handle) {
    this.#parentElement.addEventListener('click', function (e) {
      if (e.target.closest('.btn-inline')) {
        handle();
      }
    });
  }

  #generateHTML() {
    const currentPage = this.#data.page;
    const endPage = Math.ceil(this.#data.results.length / this.#data.perPage);
    const btnPre = `<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page 1</span>
          </button>`;
    const btnNext = `<button class="btn--inline pagination__btn--next">
    <span>Page 3</span>
    <svg class="search__icon">
      <use href="src/img/icons.svg#icon-arrow-right"></use>
    </svg>
  </button> 
    `;
    if (currentPage > 1) {
      this.#parentElement.insertAdjacentHTML('afterbegin', btnPre);
    }
    if (endPage < currentPage) {
      this.#parentElement.insertAdjacentHTML('afterbegin', btnNext);
    }
  }
}

export default new PaginationView();
