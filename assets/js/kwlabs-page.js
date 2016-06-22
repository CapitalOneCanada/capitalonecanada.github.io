var fullURL = window.location.href;
var lastSlash = fullURL.lastIndexOf('/');
var subURL = fullURL.substring(0, lastSlash);
lastSlash = subURL.lastIndexOf('/');
var baseURL = fullURL.substring(0, lastSlash+1); // +1 to keep the 2nd last '/' but cut off 'kwlabs/'

/*
JSONs to dynamically keep track of people in the Who We Are section
Also makes the lightbox creation smoother
The JS can support any number of employees but the HTML page and CSS can
only support 8
*/
var employees = [
	{
		"name":"Joan Qiu",
		"role":"Senior Data Scientist",
		"iconURL":baseURL + "/assets/img/kwlabs/JB19766_KW-Joan.png",
    "biography1":"",
    "biography2":""
	},
	{
		"name":"Steve Frensch",
		"role":"Senior Manager",
		"iconURL":baseURL + "/assets/img/kwlabs/JB19766_KW-Steve.png",
    "biography1":"",
    "biography2":""
	},
	{
		"name":"Faisal Dosani",
		"role":"Data Scientist, Manager",
		"iconURL":baseURL + "/assets/img/kwlabs/JB19766_KW-Faisal.png",
		"biography1":"",
		"biography2":""
	},
	{
		"name":"David Tsenter",
		"role":"Co-op Student",
		"iconURL":baseURL + "/assets/img/kwlabs/JB19766_KW-David.png",
		"biography1":"",
		"biography2":""
	},
	{
		"name":"Jasmine Ren",
		"role":"Co-op Student",
		"iconURL":baseURL + "/assets/img/kwlabs/JB19766_KW-Jasmine.png",
		"biography1":"",
		"biography2":""
	},
	{
		"name":"Eric Hardy",
		"role":"Co-op Student",
		"iconURL":baseURL + "/assets/img/kwlabs/JB19766_KW-Eric.png",
		"biography1":"",
		"biography2":""
	},
];

/*
When the lightbox close button is clicked
Or, when any shaded area outside the lightbox is clicked
close the lightbox
1-> set the lightbox modal's opacity to 0 (completely transparent). This initializes the opacity-fade transition
2-> remove the .show class from the overlay modal. This pushes it back in the z-index. Delay until the modal completely fades out
3-> allow the window to scroll again

Note, overflow-y to disable background scroll does not work on actual iOS devices. Works on desktop browsers.
*/
function hideLightbox(index) {
	var prefix = "#kwlabs-container #who-we-are .item:eq("+index+") ";
	$(prefix + ".profile-lightbox").addClass("hide").removeClass("show");
	$("#lightbox-modal").css("opacity", "0");
	// after the transition duration ends, remove show (pushes background modal backwards)
	setTimeout(function() {
		// hide darkened background overlay after 800ms (when lightbox finishes transition)
		$("#lightbox-modal").removeClass("show");
	}, 800);
	setTimeout(function() {
		// re-enable window scrolling after 500ms (when lightbox exists screen)
		$("body").css("overflow-y", "visible");
	}, 500);
};

/*
Inject the lightbox into the page, set the values of the fields (name, role, bios)
After the first injection, the lightbox will not be deleted when closed
So, when opened a second time, injection should not re-occur
CSS .show and .hide on div.profile-lightbox should take care of open/close
Open and close animation (if any) are done in kwlabs.css
*/
function showLightbox(ele) {
	// get the index of the clicked profile icon
	var index = ele.index("#kwlabs-container #who-we-are .item .open-lightbox");
	// jquery selector prefix, which includes the unique index
	var prefix = "#kwlabs-container #who-we-are .item:eq("+index+") ";
	// inject a new lightbox only if the lightbox doesn't exist yet
	// when a lightbox is closed, it does not get deleted
	if ($(prefix + ".profile-lightbox").length == 0) {
		// create the lightbox
		// css for the lightbox can be found in kwlabs.css
		var lightbox = [
			'<div class="profile-lightbox hide">',
				'<div class="lb-name"></div>',
				'<a href="#"><span id="lb-close"><span class="close">CLOSE</span>&nbsp<strong>X</strong></span></a>',
				'<hr></hr>',
				'<div class="lb-role"></div>',
				'<div class="right">',
					'<div class="icon-wrapper"><img class="lb-image" /></div>',
				'</div>',
				'<div class="left">',
					'<div class="text-wrapper">',
						'<div class="lb-bio"></div>',
						'<div class="lb-bio"></div>',
					'</div>',
				'</div>',
			'</div>'
		];
		// inject the lightbox onto the page
		$("#kwlabs-container .open-lightbox:eq("+index+")").after(lightbox.join(""));
		// set lightbox fields using employee json and given index
		$(prefix + ".lb-name").text(employees[index].name);
		$(prefix + ".lb-role").text(employees[index].role);
		$(prefix + ".lb-image").attr("src", employees[index].iconURL);
		$(prefix + ".lb-bio:eq(0)").text(employees[index].biography1);
		$(prefix + ".lb-bio:eq(1)").text(employees[index].biography2);

		// set the close button to hide the lightbox on click
		$(prefix + ".profile-lightbox span#lb-close").click(function(e) {
			e.preventDefault();
			hideLightbox(index);
		});
		$("#lightbox-modal").click(function(e) {
			e.preventDefault();
			hideLightbox(index);
		});
	}
	// set the lightbox to be visible (default)
	// async delay to ensure the lightbox is rendered (so transitions can be performed)
	setTimeout(function() {
		$(prefix + ".profile-lightbox").addClass("show").removeClass("hide");
	}, 50);
	$("#lightbox-modal").addClass("show");
	$("#lightbox-modal").css("opacity", "0.6");
	$("body").css("overflow-y", "hidden");
};

/*
Debounce function
*/
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this;
		var args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/*
Dynamically set the name and role of icons in the Who We Are section
Allows easier lightbox creation/injection (no repeat of static data)
Allows easier updating should the section data text need to be changed
Attachs click functions to icons (their anchors)
*/
$(document).ready(function() {
	// parse through employee json
	var size = employees.length;
	for (var i = 0; i < size; i++) {
		// set icon url
		$("#kwlabs-container #who-we-are .item:eq("+i+") .icon").attr("src", employees[i].iconURL);
		// set name text
		$("#kwlabs-container #who-we-are .item:eq("+i+") .name").text(employees[i].name);
		// set role text
		$("#kwlabs-container #who-we-are .item:eq("+i+") .role").text(employees[i].role);
		// set each icon to open lightbox on click
    /*
    $("#kwlabs-container #who-we-are .item .open-lightbox:eq("+i+")").click(function(e) {
			e.preventDefault();
			showLightbox($(this));
		});
    */
	}

}); // end $(document).ready(...)
