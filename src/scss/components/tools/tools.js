export default class Tools {
	constructor (id) {
		if (!id) throw new Error(`Id didn't passed!`);
		this._component = document.getElementById(id);
		this._current = null;
	}

	start () {
		this._component.addEventListener('click', this._changeCurrent.bind(this));
	}

	getData () {
		return this._current.dataset.size;
	}

	getComponent() {
		return this._component;
	}

	_changeCurrent (e) {
		const elem = e.target.closest('.tools__item');
		if (this._current) {
			this._current.classList.remove('tools__item_active');
		}
		elem.classList.add('tools__item_active');
		this._current = elem;
	}
}