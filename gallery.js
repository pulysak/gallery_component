function Image(el, {imageSrc = null, isCurrent = false}) {

	this.imageSrc = imageSrc;
	this.el = el;


	this.render = () => {
		if (imageSrc) {
			const closeButton = isCurrent ? '<span class="closebtn">&times;</span>' : '';
			this.el.innerHTML = `<img src="${this.imageSrc}" class="hover-shadow image" > ${closeButton}`;
		}
	}

}

function Gallery(el, imagesList) {

	this.el = el;
	this.imagesList = imagesList;

	this.state = {
		'imageComponentsList': [],
		'currentImageComponent': null,
	}

	const createImageRow = () => {
		const row = document.createElement('div');
		row.className = 'row';
		el.appendChild(row);
		this.imagesList.forEach((imageSrc, i, arr) => {
			const imageElem = document.createElement('div');
			imageElem.className = `column`;
			row.appendChild(imageElem);
			this.state.imageComponentsList.push(new Image(imageElem, {imageSrc}));
		});
		return row;
	}

	const createCurrentImageComponent = () => {
		const currentImageElem = document.createElement('div')
		currentImageElem.className = 'container';
		currentImageElem.style.display = 'block';
		el.appendChild(currentImageElem);
		this.state.currentImageComponent = new Image(currentImageElem, {});
	}

	const renderRow = () => {
		this.state.imageComponentsList.forEach((imageComponent, i, arr) => {
			imageComponent.render();
		});
	}

	function setCurrentImage(event) {
		if (event.target.src) {
			this.state.currentImageComponent = new Image(this.state.currentImageComponent.el, {'imageSrc': event.target.src, isCurrent: true});
			this.state.currentImageComponent.render();
			const closeButton = this.state.currentImageComponent.el.querySelector('.closebtn');

			closeButton.onclick = closeCurrentImage.bind(this);
		}
	}

	function closeCurrentImage(event) {
		this.state.currentImageComponent.el.innerHTML = '';
	}

	this.init = () => {
		createCurrentImageComponent();
		const row = createImageRow();
		row.onclick = setCurrentImage.bind(this);
		renderRow();
	}
}



const IMAGES = [
	'https://www.w3schools.com/css/img_fjords.jpg',
	'https://www.w3schools.com/css/img_forest.jpg',
	'https://www.w3schools.com/css/img_mountains.jpg',
	'https://www.w3schools.com/howto/img_nature.jpg'
] 
let gallery = new Gallery(document.querySelector('.gallery'), IMAGES);
gallery.init();