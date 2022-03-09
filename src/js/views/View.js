import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the received object to the dom
   * @param {Object | Object[]} data  the data to be rendered(e.g recipe)
   * @param {boolean} {render=true } if false, create markup string instead of rendering to the dom
   * @returns {undefined | string } A markup string is returned if render = false
   *@this Object} View objek
   *@author Roihan Sori
   *@todo Finish Implemention

   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);

    const newElement = Array.from(newDom.querySelectorAll('*'));
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));
    newElement.forEach((newEl, i) => {
      const curEl = curElement[i];
      // console.log(curEl, newEl.isEqualNode(curEl));
      // Update change text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('🛑', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }
      // Update change atributte
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    // Kosongkan Html
    this._clear();
    // Menambahkan Html Spinner
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
       </div>
    `;
    // Kosongkan Html
    this._clear();
    // Menambahkan Html Spinner
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
       </div>
    `;
    // Kosongkan Html
    this._clear();
    // Menambahkan Html Spinner
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
