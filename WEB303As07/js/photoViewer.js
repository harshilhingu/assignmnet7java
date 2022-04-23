$.fn.customPhotoViewer = function() {
    
    var request; 
    var $current; 
    var cache = {}; 
    var $frame = $('.photo-box');
    var $thumbs = $('.thumbnail-anchor'); 

    function crossfade($img) { // New image as parameter
        if ($current) { // If image showing
            $current.stop().fadeOut('slow'); // Stop animation & fade out
        }

        $img.css({ 
            marginLeft: -$img.width() / 2, 
            marginTop: -$img.height() / 2 
        });
        $img.stop().fadeTo('slow', 1); // Stop animation & fade in
        $current = $img; // New image is current one
    }

    this.on('click', '.thumbnail-anchor', function (e) { // Click on thumb
        var $img; // Local var called $img
        var src = this.href; // Store path to image
        var request = src; // Store latest image
        
        e.preventDefault(); // Stop default link behavior
        $thumbs.removeClass('active'); // Remove active from thumbs
        $(this).addClass('active'); // Add active to clicked one

        let p = $('.active').parent().attr('href');

        $('.photo-frame').children().attr('src', p);
       
        if (cache.hasOwnProperty(src)) { // If cache contains this img
            if (cache[src].isLoading === false) { // and it's not loading
                crossfade(cache[src].$img); // Call crossfade() function
            }
        } else { // Otherwise it is not in the cache
            $img = $('<img/>'); // Store empty <img/> in $img
            cache[src] = { // Store this image in cache
                $img: $img, // Add the path to the image
                isLoading: true // Set isLoading to false
            };
        
            // When image has loaded this code runs
            $img.on('load', function () { // When image loaded
                $img.hide(); // Hide it
                // Remove is-loading class & append image
                $frame.removeClass('is-loading').append($img);
                cache[src].isLoading = false; // Update isLoading in cache
                // If still most recently requested image then
                if (request === src) {
                    crossfade($img); // Call crossfade() function
                }
            });
            $frame.addClass('is-loading'); // Add is-loading to frame
            
            $img.attr({ // Set attributes on <img>
                'src': src, // src attribute loads image\
                'alt': this.title || '' // Add title if one given
            });
        }
    });
    return this;
}