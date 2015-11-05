/* Credit: http://www.templatemo.com */

var menuDisabled = false;

jQuery(function($) {

    $(window).load(function() { // makes sure the whole site is loaded
        // The slider being synced must be initialized first
        $('#carousel').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            itemWidth: 170,
            itemMargin: 5,
            asNavFor: '#slider'
        });

        $('#slider').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            sync: "#carousel",
            start: function(slider){
                $('#status').fadeOut(); // will first fade out the loading animation
                $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
                $('#main-wrapper').delay(350).css({'overflow':'visible'});
            }
        });
    
        
        document.querySelector('#calc').addEventListener('click', function () {
          console.log(checked());
        });
    });
    
    $(document).ready( function() {        

        if($(window).width() > 767) {
           var navWidth = $('.navbar .navbar-nav').width();

            $('hgroup').css("maxWidth",navWidth + "px");
            $('.templatemo-content').css("maxWidth",navWidth + "px");
            $('.footer-wrapper').css("maxWidth",navWidth + "px");
        }

        $('.site-name').click(function(){
            location.reload();
        });   
		
		
		
        // backstretch for background image
        var defaultImgSrc = $('img.main-img').attr('src');
        $.backstretch(defaultImgSrc, {speed: 400});

        $(".nav a").on('click',function(e){
            if( $(this).hasClass("external") ) {
                return;
            }
            e.preventDefault();
            if (menuDisabled == false) // check the menu is disabled?
            {
                menuDisabled = true; // disable the menu
                
                var name = $(this).attr('href');
                $('.nav li').removeClass('active');

                var menuClass = $(this).parent('li'); // .attr('class')
                $(menuClass).addClass('active');
                
                // get image url and assign to backstretch for background
                var imgSrc = $("img"+name+"-img").attr('src');
                $.backstretch(imgSrc, {speed: 400}); //backstretch for background fade in/out
                
                // content slide in/out
                $("section.active").animate({left:-$("section.active").outerWidth()}, 300,function(){
                    $(this).removeClass("active");
                    $(this).hide();
                    $(name+"-text").removeClass("inactive");
                    $(name+"-text").css({left:'703px', top:'0px'});
                    $(name+"-text").show();
                    $(name+"-text").animate({left:'0px'}, 300,function(){
                        $(this).addClass("active");
                        
                        google.maps.event.trigger(map, 'resize'); // resize map
                        $.backstretch("resize"); // resize the background image
                        $(window).resize();
                        
                        menuDisabled = false; // enable the menu
                    });
                });                
            }
            return;
        });

        loadGoogleMap();

    }); // document.ready

});

var map = '';

function initialize() {
    var mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(16.8496189,96.1288854)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),  mapOptions);
}

function loadGoogleMap(){
    // load google map
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
    'callback=initialize';
    document.body.appendChild(script);
}
function checked(){
  var inputElems = document.getElementsByTagName("input");
  var count = 0;
  for(var i = 0; i < inputElems.length; i++){
    if(inputElems[i].type === "checkbox" && inputElems[i].checked === true){
      count += Number(inputElems[i].value)
    }
  }
  count = Number(count);
  document.getElementById("demo").innerHTML = count;

  if(count === 0){
    document.getElementById("pkg-info").innerHTML = "No services have been selected";
  }
  if(count > 0 && count < 16){
    document.getElementById("pkg-info").innerHTML = "The Saphire Package would work best for you!!";
  }
  if(count > 15 && count < 31){
    document.getElementById("pkg-info").innerHTML = "The Ruby Package would be your best option!";
  }
  if(count > 30 && count < 46){
   document.getElementById("pkg-info").innerHTML = "The Emerald Package is the one for you";
  }
  if(count > 45){
    document.getElementById("pkg-info").innerHTML = "The Diamond Package, what more can be said!!!!";
  }
  return count;
}

