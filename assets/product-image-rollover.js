$(document).ready(function() { 
//Begin Wrapper
$('div#images div#thumbs').delegate('a', 'click', function(ev) {
    ev.preventDefault();
    var link = this;
    $('div#thumbs a.active').removeClass('active');
    $(link).addClass('active');

    $('div#image img')
        .fadeTo(500, 0, function() {
            $(this).attr('src', link.href);
        })
        .bind('load', function() {
            $(this).fadeTo(500, 1).unbind('load');            
        });
});
//End Wrapper    
});
