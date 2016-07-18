var fullURL = window.location.href;
var lastSlash = fullURL.lastIndexOf('/');
var subURL = fullURL.substring(0, lastSlash);
lastSlash = subURL.lastIndexOf('/');
var baseURL = fullURL.substring(0, lastSlash+1); // +1 to keep the 2nd last '/' but cut off 'kwlab/'

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
		"iconURL":baseURL + "/assets/img/kwlab/JB19766_KW-Joan.png",
    "biography1":"My role is to guide the projects from beginning to end&nbsp;– to act as liaison with the Capital One head office and to provide necessary support for our co-op students. It’s amazing to play such an important role in our digital journey.",
    "biography2":"I bring a lot of positive energy to the team. And I love to code while listening to Taylor Swift’s music, especially “1989.”"
  },
	{
		"name":"Steve Frensch",
		"role":"Senior Manager",
		"iconURL":baseURL + "/assets/img/kwlab/JB19766_KW-Steve.png",
    "biography1":"My role is to take care of all areas of the Lab&nbsp;– I manage the team, project development, industry relationships and even the office supplies! However, my goal is to bring out the best in people, so they can deliver the best work.",
    "biography2":"Outside of work, I spend most of my time playing with my kids. My seven-month-old daughter especially enjoys the ‘slap-dad-in-the-face’ game. And she’s really good at it!"
	},
	{
		"name":"Faisal Dosani",
		"role":"Data Scientist, Manager",
		"iconURL":baseURL + "/assets/img/kwlab/JB19766_KW-Faisal.png",
		"biography1":"I think I bring some wisdom to the team&nbsp;– I look at data and use technology to tell stories that will help us achieve our mission. At the Lab, we have the freedom to experiment and the freedom of time. We can be fearless.",
		"biography2":"Few people know that I lived in Hong Kong for 15 years when I was a kid. The best part of my time there was when I participated in a game show on TV ... and won!"
	},
	{
		"name":"David Tsenter",
		"role":"Co-op Student",
		"iconURL":baseURL + "/assets/img/kwlab/JB19766_KW-David.png",
		"biography1":"This is my 1<sup>st</sup> co-op placement. I really enjoy working with a small team, all the while learning the development cycles of a big company like Capital One. I like that the work we do here matters!",
		"biography2":"My twin sister is two minutes younger than me. If I can’t win an argument with her, I say, “Respect your elders.” Surprisingly, it works sometimes ..."
	},
	{
		"name":"Jasmine Ren",
		"role":"Co-op Student",
		"iconURL":baseURL + "/assets/img/kwlab/JB19766_KW-Jasmine.png",
		"biography1":"This is my 3<sup>rd</sup> co-op placement. I was really excited about the prospect of working at the Capital One Lab as I had friends who told me that during their previous assignments here, they were really able to hone their skills. I study statistics and this co-op experience is giving me a powerful insight into how to use math in a business application. I now have a better understanding of what skills I should learn for my career development.",
		"biography2":"Funny story, while in my 1<sup>st</sup> year of University&nbsp;– in between moving from one residence to another&nbsp;– I crashed in the lounge of the math building. I did this for three whole days."
	},
	{
		"name":"Eric Hardy",
		"role":"Co-op Student",
		"iconURL":baseURL + "/assets/img/kwlab/JB19766_KW-Eric.png",
		"biography1":"This is my 5<sup>th</sup> co-op placement. I study computer science and I’m into big data, so the Capital One Lab is the perfect opportunity for me. The infrastructure is great&nbsp;– it’s nice to collaborate with the Toronto office, yet we still work independently. It’s inspiring to know that the company will actually use our work.",
		"biography2":"For a month or so, I’ve been teaching a robot how to play Mario Bros. Hmm, I just realized Mario has a name, but my robot doesn’t. Mario-nette?"
	},
];

/*
Handle swipe motions to close the profile lightboxes. Note: vertical swipe down to close
Variable yCoord is used to check y-axis swipe motions
Function handleTouchStart(e) registers the y-coordinate at the beginning of swipe.
Funciton handleTouchMove(e) checks the new y-coordinates, and executes the commands depending on what swipe was done

In the future: try using jQuery mobile.
*/
var yCoord = null;
var xCoord = null;
var yDelta = 0;
var beganAtTop = false; // true -> enable swipe-to-close
var isSwipe = false;
var doSwipeClose = false;
var currentScroll = 0;
var didntSwipeDownYet = true;

function handleTouchStart(e) { // touchstart
	// store original coordinates at touchstart
	yCoord = e.originalEvent.touches[0].pageY;
	xCoord = e.originalEvent.touches[0].pageX;
	beganAtTop = $(".profile-lightbox.show").scrollTop() == 0;
	currentScroll = $(".profile-lightbox.show").scrollTop();
}

function handleTouchMove(e) { // touchmove
	yDelta = yCoord - e.originalEvent.touches[0].pageY;
	isSwipe = yDelta != 0 || xCoord - e.originalEvent.touches[0].pageX != 0; // as long as yCoord OR xCoord is different, count as swipe
	if (yDelta < 0) { // swipe down (small y to large y)
		if (beganAtTop && didntSwipeDownYet) {
			doSwipeClose = yDelta < -125;
			// do slide up/down animation
			$(".profile-lightbox.show").addClass("disable-transition");
			$(".profile-lightbox.show").css("top", 10 - yDelta);
		} else {
			$(".profile-lightbox.show").scrollTop(yDelta - 20 + currentScroll); // scroll the div. -20 to make scroll (up) a bit faster
		}
	} else if (yDelta > 0) { // swipe up (large y to small y)
		$(".profile-lightbox.show").scrollTop(yDelta + 20 + currentScroll); // scroll the div. +20 to make scroll (down) a bit faster
		if (didntSwipeDownYet) { // try to save some code execution. Already false -> no need to set false again
			didntSwipeDownYet = false;
		}
	}
}

function handleTouchEnd(e) { // touchend
	$(this).removeClass("disable-transition");
	if (isSwipe && doSwipeClose) { // close lightbox
		$(this).addClass("hide").removeClass("show");
		resetBackground();
		$(this).attr("style", ""); // removes all inline styles. If this conflicts with any future changes, try to simply remove the inline-css "top" value
	} else {
		$(this).css("top", 10);
	}
	// reset values
	yCoord = null;
	xCoord = null;
	yDelta = 0;
	beganAtTop = false;
	isSwipe = false;
	doSwipeClose = false;
	didntSwipeDownYet = true;
}

/*
When the lightbox close button is clicked
Or, when any shaded area outside the lightbox is clicked
close the lightbox
1-> set the lightbox modal's opacity to 0 (completely transparent). This initializes the opacity-fade transition
2-> remove the .show class from the overlay modal. This pushes it back in the z-index. Delay until the modal completely fades out
3-> allow the window to scroll again

Note, overflow-y to disable background scroll does not work on actual iOS devices. Works on desktop browsers.
*/
function resetBackground() {
	$("#lightbox-modal").css("opacity", "0");
  setTimeout(function() {
    // hide darkened background overlay after 800ms (when lightbox finishes transition)
    $("#lightbox-modal").removeClass("show");
  }, 800);
  setTimeout(function() {
    // re-enable window scrolling after 500ms (when lightbox exists screen)
    $("body").css("overflow-y", "visible");
		$("body, html").unbind('touchmove');
  }, 500);
}

function hideLightbox(index) {
	var prefix = "#kwlab-container #who-we-are .item:eq("+index+") ";
	$(prefix + ".profile-lightbox").addClass("hide").removeClass("show");
	$(prefix + ".profile-lightbox").attr("style", ""); // clear the inline-css added by touchevent handlers
  resetBackground();
};

/*
Inject the lightbox into the page, set the values of the fields (name, role, bios)
After the first injection, the lightbox will not be deleted when closed
So, when opened a second time, injection should not re-occur
CSS .show and .hide on div.profile-lightbox should take care of open/close
Open and close animation (if any) are done in kwlab.css
*/
function showLightbox(ele) {
	// get the index of the clicked profile icon
	var index = ele.index("#kwlab-container #who-we-are .item .open-lightbox");
	// jquery selector prefix, which includes the unique index
	var prefix = "#kwlab-container #who-we-are .item:eq("+index+") ";
	// inject a new lightbox only if the lightbox doesn't exist yet
	// when a lightbox is closed, it does not get deleted
	if ($(prefix + ".profile-lightbox").length == 0) {
		// create the lightbox
		// css for the lightbox can be found in kwlab.css
		var lightbox = [
			'<div class="profile-lightbox hide">',
				'<div class="lb-name"></div>',
				'<a href="#"><span id="lb-close"><span class="close">CLOSE</span>&nbsp<strong>X</strong></span></a>',
				'<hr></hr>',
				'<div class="lb-role"></div>',
				'<div class="lb-content mobile">',
					'<div class="right">',
						'<div class="icon-wrapper"><img class="lb-image" /></div>',
					'</div>',
					'<div class="left">',
						'<div class="text-wrapper">',
							'<div class="lb-bio"></div>',
							'<div class="lb-bio"></div>',
						'</div>',
					'</div>',
				'</div>',
				'<div class="lb-content desktop">',
					'<div class="left">',
						'<div class="text-wrapper">',
							'<div class="lb-bio"></div>',
							'<div class="lb-bio"></div>',
						'</div>',
					'</div>',
					'<div class="right">',
						'<div class="icon-wrapper"><img class="lb-image" /></div>',
					'</div>',
				'</div>',
			'</div>'
		];
		// inject the lightbox onto the page
		$("#kwlab-container .open-lightbox:eq("+index+")").after(lightbox.join(""));
		// set lightbox fields using employee json and given index
		$(prefix + ".lb-name").text(employees[index].name);
		$(prefix + ".lb-role").text(employees[index].role);
		$(prefix + ".lb-image").attr("src", employees[index].iconURL);
		$(prefix + ".lb-bio:eq(0)").html(employees[index].biography1); // mobile
		$(prefix + ".lb-bio:eq(1)").html(employees[index].biography2);
		$(prefix + ".lb-bio:eq(2)").html(employees[index].biography1); // desktop
		$(prefix + ".lb-bio:eq(3)").html(employees[index].biography2);

		// set the close button to hide the lightbox on click
		$(prefix + ".profile-lightbox span#lb-close").click(function(e) {
			e.preventDefault();
			hideLightbox(index);
		});
		$("#lightbox-modal").click(function(e) {
			e.preventDefault();
			hideLightbox(index);
		});

		/*
		Attach custom handlers for touch events to the lightbox, since we disabled the default touchmove in
		order to prevent the background from scrolling while a lightbox is open.
		These events (see functions above) manually scroll the lightbox (if necessary) on swipe and
		also checks if the lightbox is swiped-down (to close it).

		Note: In reality, these events should only need to be attached in mobile viewports,
		but it shouldn't have any effect on desktop views.
		*/
    $(prefix + ".profile-lightbox").on('touchstart', handleTouchStart);
    $(prefix + ".profile-lightbox").on('touchmove', handleTouchMove);
    $(prefix + ".profile-lightbox").on('touchend', handleTouchEnd);
	}
	// set the lightbox to be visible (default)
	// async delay to ensure the lightbox is rendered (so transitions can be performed)
	setTimeout(function() {
		$(prefix + ".profile-lightbox").addClass("show").removeClass("hide");
	}, 50);
	$("#lightbox-modal").addClass("show");
	$("#lightbox-modal").css("opacity", "0.6");
	// prevent background from scrolling
	$("body").css("overflow-y", "hidden");
	$("body, html").bind('touchmove', function(e) { e.preventDefault(); });
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
		$("#kwlab-container #who-we-are .item:eq("+i+") .icon").attr("src", employees[i].iconURL);
		// set name text
		$("#kwlab-container #who-we-are .item:eq("+i+") .name").text(employees[i].name);
		// set role text
		$("#kwlab-container #who-we-are .item:eq("+i+") .role").text(employees[i].role);
		// set each icon to open lightbox on click
    $("#kwlab-container #who-we-are .item .open-lightbox:eq("+i+")").click(function(e) {
			e.preventDefault();
			showLightbox($(this));
		});
	}

}); // end $(document).ready(...)
