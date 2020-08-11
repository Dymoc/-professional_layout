let abobePhotozhab = {
    container: null,
    canvas: null,
    tools: null,
    coordinates: null,
    ctx: null,
    x: 0,
    y: 0,
    editor: {
        currentTool: null,
        currentColor: '#000',
        currentBrushSize: 10
    },
    init() {
        this.container = document.querySelector('#app');
        this.canvas = document.querySelector('#canv');
        this.tools = document.querySelector('#tools');
        this.coordinates = document.querySelector('#coordinates');

        this.ctx = this.canvas.getContext('2d');

        this.handleEvents();
    },
    handleEvents() {
        this.canvas.addEventListener('mousemove', this._moveHandler.bind(this));
        this.canvas.addEventListener('mousedown', this._start.bind(this));
        document.addEventListener('mouseup', this._end.bind(this));

        this.tools.addEventListener('click', this._clickHandler.bind(this));
        this.tools.addEventListener('change', this._changeHandler.bind(this));
    },
    _moveHandler(evt) {
        this.x = evt.offsetX;
        this.y = evt.offsetY;
        this._renderCoordinates();
    },
    _clickHandler(evt) {
        if (evt.target.name === 'tool') {
            this.editor.currentTool = evt.target.dataset.tool;
        }

        if (evt.target.id === 'save-img') {
            this._save();
        }
    },
    _changeHandler(evt) {
        if (evt.target.name === 'tool-input') {
            this.editor[`current${evt.target.dataset.tool}`] = evt.target.value;
        }
    },
    _start() {
        this.ctx.fillStyle = this.editor.currentColor;
        this[`_${this.editor.currentTool}`]();

    },
    _end() {
        this.canvas.onmousemove = null;
    },
    _pencil() {
        let size = this.editor.currentBrushSize;
        this.canvas.onmousemove = () => {
            this.ctx.fillRect(this.x, this.y, size, size);
        }
    },
    _fill() {
        let width = this.canvas.width;
        let height = this.canvas.height;
        this.canvas.onmousemove = () => {
            this.ctx.fillRect(0, 0, width, height);
        }
    },
    _eraser() {
        let size = this.editor.currentBrushSize;
        this.ctx.fillStyle = '#fff';
        this.canvas.onmousemove = () => {
            this.ctx.fillRect(this.x, this.y, size, size);
        }
    },
    _square() {
        this.canvas.onmousedown = () => {
            startX = this.x;
            startY = this.y;
        }

        this.canvas.onmousemove = () => {
             endX =  0 + (this.x - startX);
             endY = 0 + (this.y - startY);                       
        }

        this.canvas.onmouseup = () => {
            this.ctx.rect(startX, startY,endX, endY);
            this.ctx.stroke();
        }
    },
    // _clearCnv() {
    //     let width = this.canvas.width;
    //     let height = this.canvas.height;
    //     this.ctx.fillStyle = '#fff';
    //     this.canvas.onmousemove = () => {
    //         this.ctx.fillRect(0, 0, width, height);
    //     }
    // },
    _renderCoordinates() {
        this.coordinates.querySelector('#xCoord').innerText = this.x;
        this.coordinates.querySelector('#yCoord').innerText = this.y;
    },
    _save() {
        let img = new Image();
        img.src = this.canvas.toDataURL();

        let link = document.createElement('a');
        link.setAttribute('href', img.src);
        link.setAttribute('download', 'canvas_image');

        link.click();
    }
}

abobePhotozhab.init();