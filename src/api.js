const IMAGES_URL = 'https://jsonplaceholder.typicode.com/photos/?albumId=2';

const api = {
    getListPhotos: function () {
        return fetch(IMAGES_URL).then(function (res) {
            return res.json();
        });
    },
}