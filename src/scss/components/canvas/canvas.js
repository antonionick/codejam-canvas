export default class Canvas {
	constructor(id) {
		if (!id) throw new Error(`Id didn't passed!`);
		this._component = document.getElementById(id);
		this._ctx = null;

		this._component.width = 512;
		this._component.height = 512;
	}

	start() {
		this._ctx = this._component.getContext('2d');
	}

	draw(array, type = 'hex') {
		const dividerX = array[0].length,
			dividerY = array.length,
			width = this._component.width / dividerX,
			height = this._component.height / dividerY;

		this.reset();

		for (let i = 0; i < dividerX; i++) {
			for (let j = 0; j < dividerY; j++) {
				this._setFillStyle(array[i][j], type);
				this._ctx.fillRect(j * width, i * height, width, height);
			}
		}
	}

	drawImage(image) {
		this._ctx.drawImage(image, 0, 0, this._component.width, this._component.height);
	}

	reset() {
		this._ctx.fillStyle = 'white';
		this._ctx.fillRect(0, 0, this._component.width, this._component.height);
	}

	getCanvas() {
		return this._component;
	}

	getContext() {
		return this._ctx;
	}

	_setFillStyle(color) {
		this._ctx.fillStyle = typeof color === 'object' ? `rgba(${color[0]},${color[1]}, ${color[2]}, ${color[3]})`
			: `#${color}`;
	}
}