$(document).ready(function(){

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