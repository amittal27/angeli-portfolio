$(function() {

	var marker = [], infowindow = [], image = 'img/marker.png', maps = [];

	function addMarker(location,name,contentstr,map){
        marker[name] = new google.maps.Marker({
            position: location,
            map: map,
			icon: image
        });
        marker[name].setMap(map);
		
		infowindow[name] = new google.maps.InfoWindow({
			content: '<div class="scrollfix">'+contentstr+'</div>'
		});
		
		google.maps.event.addListener(marker[name], 'click', function() {
			infowindow[name].open(map,marker[name]);
		});
    }

    function moveto_region(location,zoom_level) {
		map.setZoom(zoom_level);
		map.setCenter(location);
		$('body, html').animate({'scrollTop': $('#map-canvas').offset().top - $('header').outerHeight()});
	}

	$('.marker').on('click', function(){
		var coord1 = $(this).attr('data-lng');
		var coord2 = $(this).attr('data-lat');
		var location = new google.maps.LatLng(coord2,coord1);
		moveto_region(location, 18);
	});
	
	function initialize(mapInst, index) {

		var lat = mapInst.attr("data-lat");
		var lng = mapInst.attr("data-lng");

		var myLatlng = new google.maps.LatLng(lat,lng);

		var setZoom = parseInt(mapInst.attr("data-zoom"));

		var styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});

		var mapOptions = {
			zoom: setZoom,

			scrollwheel: false,
			
			center: myLatlng,

			disableDefaultUI: true
		
		};
		maps[index] = new google.maps.Map(document.getElementById(mapInst.attr('id')), mapOptions);
		
		maps[index].mapTypes.set('map_style', styledMap);
  		maps[index].setMapTypeId('map_style');
		

		$('.addresses-block[data-rel="'+mapInst.attr('id')+'"] a.marker').each(function(){
			var mark_lat = $(this).attr('data-lat');
			var mark_lng = $(this).attr('data-lng');
			var this_index = $('.addresses-block a').index(this);
			var mark_name = 'template_marker_'+this_index;
			var mark_locat = new google.maps.LatLng(mark_lat, mark_lng);
			var mark_str = $(this).attr('data-string');
			addMarker(mark_locat,mark_name,mark_str,maps[index]);	
		});
		
	}

	$(window).load(function(){
		setTimeout(function(){
			var index = 0;
			$('.map-inst').each(function(){
				initialize($(this), index);
				index = index + 1;
			});
		}, 500);
	});

});
