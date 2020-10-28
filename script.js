$(() => {
    const IMAGES_URL = 'https://jsonplaceholder.typicode.com/photos/?albumId=2';
    const galleryImageTemplate = $('#galleryImageTemplate').html();
    const $container = $('#container');

    list = [];

    init();

    function init(){
        getListPhotos();
    }

    function getListPhotos() {
        return fetch(IMAGES_URL)
            .then((res) => res.json())
            .then((data) => (list = data))
            .then(renderList);
    }

    function renderList(data) {
        $container.html(data.map(getImageHtml).join(''));
    }

    function getImageHtml(galleryItem) {
        return galleryImageTemplate
            .replace('{{id}}', galleryItem.id)
            .replace('{{imageUrl}}', galleryItem.url)
            .replace('{{imageSource}}', galleryItem.thumbnailUrl)
            .replace('{{imageTitle}}', galleryItem.title);
        }
});