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
		"biography2":"Funny story, while in my 1st year of University&nbsp;– in between moving from one residence to another&nbsp;– I crashed in the lounge of the math building. I did this for three whole days."
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
*/
var yCoord = null;
var xCoord = null;
var yDelta = 0;
var swipedClosed = false;
var didSwipe = false;
var enableSwipeToClose = false;

function handleTouchStart(e) {
  // flag to check if the lightbox is fully scrolled-to-top
  // if not, then don't enable swipe-down-to-close
  enableSwipeToClose = $(".profile-lightbox.show").scrollTop() == 0;
  yCoord = e.originalEvent.touches[0].pageY;
  xCoord = e.originalEvent.touches[0].pageX;
}

function handleTouchMove(e) {
  if (!enableSwipeToClose || !yCoord || $(".profile-lightbox.show").length == 0) { // do nothing if yCoord is not originally set or not lightbox open
    return;
  } else {
    //$(".profile-lightbox.show").addClass("disable-transition");
    yDelta = yCoord - e.originalEvent.touches[0].pageY;
		didSwipe = yDelta != 0 || xCoord - e.originalEvent.touches[0].pageX != 0;
    //if (yDelta < 0) { // is swipe down
			//$(".profile-lightbox.show").css("overflow", "hidden");
      //$(".profile-lightbox.show").css("top", 10 + yDelta * -1);
      swipedClosed = yDelta < -125;
    //}
  }
}

function handleTouchEnd(e) {
	if (didSwipe) {
	  if (swipedClosed) {
	    swipedClosed = true;
	    $(this).addClass("hide").removeClass("show");
	    //$(this).attr("style", "");
	    resetBackground();
			//$(".profile-lightbox").removeClass("disable-transition");
	  }// } else { // reset lightbox position
		// 	$(".profile-lightbox.show").css("overflow", "auto");
	  //   $(".profile-lightbox.show").css("top", 10);
	  // }
	}
  //$(this).attr("style", "");
	swipedClosed = false; // reset swipedClosed
	yCoord = null;
	didSwipe = false;
	//$(".profile-lightbox").removeClass("disable-transition");
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
  }, 500);
}

function hideLightbox(index) {
	var prefix = "#kwlab-container #who-we-are .item:eq("+index+") ";
	$(prefix + ".profile-lightbox").addClass("hide").removeClass("show");
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
		$("#kwlab-container .open-lightbox:eq("+index+")").after(lightbox.join(""));
		// set lightbox fields using employee json and given index
		$(prefix + ".lb-name").text(employees[index].name);
		$(prefix + ".lb-role").text(employees[index].role);
		$(prefix + ".lb-image").attr("src", employees[index].iconURL);
		$(prefix + ".lb-bio:eq(0)").html(employees[index].biography1);
		$(prefix + ".lb-bio:eq(1)").html(employees[index].biography2);

		// set the close button to hide the lightbox on click
		$(prefix + ".profile-lightbox span#lb-close").click(function(e) {
			e.preventDefault();
			hideLightbox(index);
		});
		$("#lightbox-modal").click(function(e) {
			e.preventDefault();
			hideLightbox(index);
		});

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
