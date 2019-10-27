import Tools from '../../components/tools/tools';
import Canvas from '../../components/canvas/canvas';
import smallArray from '../../../js/arrays/4x4';
import bigArray from '../../../js/arrays/32x32';

const image = new Image();
image.src = 'data/image.png';

const tool= new Tools('tools_canvas');
tool.start();

const canvas = new Canvas('canvas');
canvas.start();

tool.getComponent().addEventListener('click', changeCanvas);

function changeCanvas(e) {
	const data = tool.getData();
	canvas.getCanvas().classList.remove('canvas_draw');

	chooseArction(data);
}

function chooseArction(data) {
	if (data === '4') {
		canvas.fill(smallArray);
	} else if (data === '32') {
		canvas.fill(bigArray);
	} else if (data === '256') {
		canvas.fillImage(image);
	} else if (data === 'draw') {
		canvas.getCanvas().classList.add('canvas_draw');
		canvas.draw();
	} else if (data === 'clear') {
		clear();
	}
}

function clear() {
	canvas.reset();
}