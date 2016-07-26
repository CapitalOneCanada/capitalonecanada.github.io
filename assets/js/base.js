var startReset = [false, false, false, false];
$(document).ready(function(){
	// moving clouds
	var durations = [14, 10, 6.5, 7.5]; // seconds
	var pixelsPerSec = [0, 0, 0, 0]; // pixels per second ... beginning pos / duration
	var endX = [0, 0, 0, 0];
	$('img.cloud').each(function(i) {
		$(this).css('transition-duration', durations[i] + "s");
		endX[i] = $(this).width() * -1 - 100;
		pixelsPerSec[i] = (parseInt($(this).css('right')) - endX[i]) / durations[i];
		$(this).addClass('transition').css('right', endX[i]);

		// start looping them back and forth
		setLoopingTimeout(i);
	});

	function setLoopingTimeout(i) {
	  var internalCallback = function() {
	    return function() {
				var ele = $('img.cloud:eq('+i+')');
				ele.css('transition-duration', "0s");
				ele.css('right', window.innerWidth + ele.width() + 100); // put back to start position
				setTimeout(function() { // give the processor enough time to put back to start position with disabled transition
					if (!startReset[i]) {
						durations[i] = (window.innerWidth + ele.width() + 100) / pixelsPerSec[i]; // new, longer duration based on pps speed
						startReset[i] = true;
					}
					ele.css('transition-duration', durations[i] + "s"); // reset duration
					ele.css('right', endX[i]);
					window.setTimeout(internalCallback, durations[i] * 1000);
				}, 150);
	    }
	  }();
	  window.setTimeout(internalCallback, durations[i] * 1000);
	};

	// open the menu
	$('#main_nav .menu').click(function(e){
		e.preventDefault();
		$('#mobile_nav').addClass('show');
	});

	// close the menu
	$('#mobile_nav .close').click(function(e){
		e.preventDefault();
		$('#mobile_nav').removeClass('show');
	});

	// open the search field
	$('.show_search').click(function(e){
		e.preventDefault();
		$(this).siblings('input').toggleClass('show');
		setTimeout(function(){
			$('#search_posts').focus();
		},205);
	});

	// press esc key in search box to close
	$('#search_posts').keyup(function(e){
		var search_box = $(this);
		if ( e.keyCode == 27 ) {
			$(search_box).removeClass('show');
			setTimeout(function(){
				$(search_box).val('');
				$('#post_list article').slideDown();
			},205);
		}
		else {
			var string1 = search_box.val().toLowerCase();
			if ( string1 == '' ) {
				$('#post_list article').slideDown();
			}
			$('#post_list article').each(function(){
				var string2 = $(this).html().toLowerCase();
				var yesno = string2.indexOf(string1);
				if ( yesno == '-1' ) {
					$(this).slideUp();
				}
				else {
					$(this).slideDown();
				}
			});
		}
	});

});
