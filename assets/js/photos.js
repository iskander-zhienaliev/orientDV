export default class Photos {
    _postData = (url = '') => {
        // TODO переписать на xhr
        return fetch(url, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'OAuth AgAAAAAtO2_VAAXRvhWPPrdeP0f-m9MLELBLCQk'
            },
        })
            .then(response => response.json());
    };

    createNode = (el) => {
        return document.createElement(el);
    };

    append = (parent, el) => {
        return parent.appendChild(el);
    };

    renderPhotos = (data) => {
        return data.map(photo => {
            let li = this.createNode('li'),
                img = this.createNode('img');
                // span = this.createNode('span');
            img.src = photo.preview;
            // span.innerHTML = photo.name;
            this.append(li, img);
            // this.append(li, span);
            this.append(this.block, li);
        })
    };

    getPhotos = () => {
        this._postData('https://cloud-api.yandex.net:443/v1/disk/resources/files?media_type=image')
            .then(data => this.renderPhotos(data.items))
            .catch(error => console.error(error));
    };

    init = (block) => {
        this.getPhotos();
        this.block = block;
    }
}
