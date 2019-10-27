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

	if (data === '4') {
		canvas.draw(smallArray);
	} else if (data === '32') {
		canvas.draw(bigArray);
	} else if (data === '256') {
		canvas.drawImage(image);
	}
}

