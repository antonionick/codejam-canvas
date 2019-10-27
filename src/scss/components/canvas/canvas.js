export default class Canvas {
	constructor(id) {
		if (!id) throw new Error(`Id didn't passed!`);
		this._component = document.getElementById(id);
		this._ctx = null;
		this._isMouseDown = false;
		this._coords = [];
		this._position = this._component.getBoundingClientRect();

		this._component.width = 512;
		this._component.height = 512;

		this._radius = 3;
		this._lineWidth = 6;
		this._color = 'red';
	}

	start() {
		this._ctx = this._component.getContext('2d');
	}

	fill(array, type = 'hex') {
		const dividerX = array[0].length,
			dividerY = array.length,
			width = this._component.width / dividerX,
			height = this._component.height / dividerY;

		this.reset();

		for (let i = 0; i < dividerY; i++) {
			for (let j = 0; j < dividerX; j++) {
				this._setFillStyle(array[i][j], type);
				this._ctx.fillRect(j * width, i * height, width, height);
			}
		}
	}

	fillImage(image) {
		this._ctx.drawImage(image, 0, 0, this._component.width, this._component.height);
	}

	draw() {
		this.reset();
		this._component.addEventListener('mousedown', () => this._isMouseDown = true);
		this._component.addEventListener('mouseup', () => {
			this._isMouseDown = false;
			this._ctx.beginPath();
		});
		this._component.addEventListener('mousemove', (e) => {
			const hasClass = this._component.classList.contains('canvas_draw');
			if (!this._isMouseDown || !hasClass) return;
			this._ctx.lineWidth = this._lineWidth;
			this._ctx.strokeStyle = this._ctx.fillStyle = this._color;

			const x = e.clientX - this._position.left,
				y = e.clientY - this._position.top;

			this._coords.push({x, y});

			this._drawing(x, y);
		});
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

	set radius(r) {
		this._radius = r;
		this._lineWidth = r * 2;
	}

	get radius() {
		return this._radius;
	}

	_setFillStyle(color) {
		this._ctx.fillStyle = typeof color === 'object' ? `rgba(${color[0]},${color[1]}, ${color[2]}, ${color[3]})`
			: `#${color}`;
	}

	_drawing(x, y) {
		const ctx = this._ctx;

		ctx.lineTo(x, y);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(x, y, this._radius, 0, Math.PI * 2);
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(x, y);
	}
}