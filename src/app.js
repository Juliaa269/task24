$(() => {
    const galleryImageTemplate = $('#galleryImageTemplate').html();
    const $container = $('#container');

    let list = [];

    init();

    function init(){
        getListPhotos();
    }

    function getListPhotos() {
        return api.getListPhotos()
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