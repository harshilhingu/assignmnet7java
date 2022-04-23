$(function () {
    $('#photo-viewer').customPhotoViewer().show().on('click', '.photo-box', function (e) {
        var $content = $(this).clone().find('img').css({
            marginLeft: 0,
            marginTop: 0,
            width: '100%',
            height: 'auto'
        });
        e.preventDefault();

        let modal = new Modal();

        modal.open({
            content: $content,
            width: 800,
            height: 450,
        });
        
    });;
});

