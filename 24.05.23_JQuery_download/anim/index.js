$(document).ready(function() {
    $("<button id=anim>Hide & Show</button>").insertAfter("ul");
    $('#anim').click(function() {
        $('ul').toggle("slow");
        // if($('ul').css('display') !== 'none'){
        //     $('ul').hide(1000);
        // } else {
        //     $('ul').show(1000);
        // }
    });

    $("<button id=fade>Fade In & Fade Out</button>").insertAfter("#anim");
    $('#fade').click(function() {
        if($('ul').css('display') !== 'none'){
            $('ul').fadeOut(1500);
        } else {
            $('ul').fadeIn(1500);
        }
    })

    $("<button id=slide>Slide down & Slide up</button>").insertAfter("#fade");
    $('#slide').click(function() {
        if($('ul').css('display') !== 'none'){
            $('ul').slideUp(1500);
        } else {
            $('ul').slideDown(1500);
        }
    })

    $("<button id=font>Animate font</button>").insertAfter("#slide");
    $('#font').click(function() {
        if($('ul').css('font-size') !== '20px'){
            $('ul').animate({'font-size': '20px'}, 1000);
            $('ul li').animate({color: '#ff0800'}, 1000);
        } else {
            $('ul').animate({'font-size': '16px'}, 1500);
            $('ul li').animate({color: 'pink'}, 1000);
        }
    })




})