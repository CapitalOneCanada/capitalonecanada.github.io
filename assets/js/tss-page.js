/*
JSONs to dynamically keep track of people in the Who We Are section
Also makes the lightbox creation smoother
The JS can support any number of employees but the HTML page and CSS can
only support 8
*/

var fullURL = window.location.href;
var lastSlash = fullURL.lastIndexOf('/');
var subURL = fullURL.substring(0, lastSlash);
lastSlash = subURL.lastIndexOf('/');
var baseURL = fullURL.substring(0, lastSlash+1); // +1 to keep the 2nd last '/' but cut off 'tss/'
var employees = [
	{
		"name":"Vesna Vukovic‑Dzodan",
		/* NON-BREAKING HYPHEN: ‑ */
		"role":"Scrum Master",
		"iconURL":baseURL + "/assets/img/tss/Vesna-V.jpg",
		"biography1":"I am very observant and intuitive. My role is to make sure that everybody on the team understands the work that’s to be done – but I go further! By reading people and situations, I can pick up on tensions and prevent outbursts from occurring – I work pro-actively.",
		"biography2":"I love music, especially jazz. And I cringe when people crunch ice with their teeth."
	},
	{
		"name":"John Cavan",
		"role":"Team Lead",
		"iconURL":baseURL + "/assets/img/tss/John-C.jpg",
		"biography1":"I help my teams make stuff happen. It’s about enabling – that is, providing skills, equipment, information, access and strategy. The business is committed to an agile journey and I get everyone engaged, emotionally engaged.",
		"biography2":"Despite my appearance, I’ve never been in a rock band. I did, however, spend some time in the army. My chili is famous or infamous, depending on your tolerance for spices."
	},
	{
		"name":"Joe Moscatielo",
		"role":"Senior Software Engineer",
		"iconURL":baseURL + "/assets/img/tss/Joe-M.jpg",
		"biography1":"Technology excites me – that’s what makes a geek. I’m knowledgeable. I read and follow what’s going on in the field, so I’m among the first to know. It’s pretty useful here because we can initiate projects using new developments as we see fit.",
		"biography2":"Geek moment: I recently found my incomplete 90s fictional species card collection in my closet (you know, the Japanese ones). I immediately went online to order the missing cards. $400 later, the collection was complete."
	},
	{
		"name":"Tahmina Khan",
		"role":"Senior Software Engineer",
		"iconURL":baseURL + "/assets/img/tss/Tahmina-K.jpg",
		"biography1":"I turn challenges and pressure – that may scare others off – into exciting opportunities. We love to take on big projects, like creating an app from scratch and making it accessible for tons of our customers.",
		"biography2":"In my personal life, I like eating authentic food and I love photography. One of my best shots was taken from my balcony – an HDR of Toronto’s skyline."
	},
	{
		"name":"Damjan Pelemis",
		"role":"Team Lead",
		"iconURL":baseURL + "/assets/img/tss/Damjan-P.jpg",
		"biography1":"I bring conceptual thinking to the team. I like to look beyond the present – I dig deeper and take a step back at the same time – this allows me to think of creative solutions that others working too closely on a project might miss.",
		"biography2":"Also, I have a super sense of balance. I’m not really sporty but I love to ski and surf."
	},
	{
		"name":"Irina Courante",
		"role":"Senior Software Engineer",
		"iconURL":baseURL + "/assets/img/tss/Irina-C.jpg",
		"biography1":"I like to provide a voice to the things that other people are thinking. It’s usually a great starting point to a discussion – it helps us share our different points of view and come up with ways to improve situations.",
		"biography2":"Speaking of talking, I used to be very shy. Now I’m making up for it by speaking extra loudly and at double the speed!"
	},
	{
		"name":"Damon Sotoudeh",
		"role":"Senior Software Engineer",
		"iconURL":baseURL + "/assets/img/tss/Damon-S.jpg",
		"biography1":"It turns out that I’m a good teacher. People tell me they can learn easily when I’m around. It’s a lot of fun! Everyone in the studio is so keen on learning and self-improvement.",
		"biography2":"It’s a good thing we like each other, because I often send an instant message to the wrong person at work and then get mad at them for being confused ... when I'm the one who was confused :-S"
	},
	{
		"name":"Jae Hee Roh",
		"role":"Senior Software Engineer",
		"iconURL":baseURL + "/assets/img/tss/Jae-Hee-Roh.jpg",
		"biography1":"I love to investigate. I always go the extra mile to find out more about the projects we’re working on and the technology we’re using. That’s how our team can make things better!",
		"biography2":"One of my idiosyncrasies ... I don’t like bridges and I never drive across them. In the last 15 years, I’ve done it only once – and that was at a driving lesson."
	}
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
    $(".profile-lightbox.show").addClass("disable-transition");
    var yNew = e.originalEvent.touches[0].pageY;
    yDelta = yCoord - yNew;
		didSwipe = yDelta != 0 || xCoord - e.originalEvent.touches[0].pageX != 0;
    if (yDelta < 0) { // is swipe down
			$(".profile-lightbox.show").css("overflow", "hidden");
      $(".profile-lightbox.show").css("top", 10 + yDelta * -1);
      swipedClosed = yDelta < -125;
    }
  }
}

function handleTouchEnd(e) {
	if (didSwipe) {
	  if (swipedClosed) {
	    swipedClosed = true;
	    $(this).addClass("hide").removeClass("show");
	    $(this).attr("style", "");
	    resetBackground();
			$(".profile-lightbox").removeClass("disable-transition");
	  } else { // reset lightbox position
			$(".profile-lightbox.show").css("overflow", "auto");
	    $(".profile-lightbox.show").css("top", 10);
	  }
	}
  $(this).attr("style", "");
	swipedClosed = false; // reset swipedClosed
	yCoord = null;
	didSwipe = false;
	$(".profile-lightbox").removeClass("disable-transition");
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
	var prefix = "#tss-container #who-we-are .item:eq("+index+") ";
	$(prefix + ".profile-lightbox").addClass("hide").removeClass("show");
  resetBackground();
};

/*
Inject the lightbox into the page, set the values of the fields (name, role, bios)
After the first injection, the lightbox will not be deleted when closed
So, when opened a second time, injection should not re-occur
CSS .show and .hide on div.profile-lightbox should take care of open/close
Open and close animation (if any) are done in tss.css
*/
function showLightbox(ele) {
	// get the index of the clicked profile icon
	var index = ele.index("#tss-container #who-we-are .item .open-lightbox");
	// jquery selector prefix, which includes the unique index
	var prefix = "#tss-container #who-we-are .item:eq("+index+") ";
	// inject a new lightbox only if the lightbox doesn't exist yet
	// when a lightbox is closed, it does not get deleted
	if ($(prefix + ".profile-lightbox").length == 0) {
		// create the lightbox
		// css for the lightbox can be found in tss.css
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
		$("#tss-container .open-lightbox:eq("+index+")").after(lightbox.join(""));
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

		//$(prefix + ".profile-lightbox").on('touchstart', handleTouchStart);
		//$(prefix + ".profile-lightbox").on('touchmove', handleTouchMove);
		//$(prefix + ".profile-lightbox").on('touchend', handleTouchEnd);
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
		$("#tss-container #who-we-are .item:eq("+i+") .icon").attr("src", employees[i].iconURL);
		// set name text
		$("#tss-container #who-we-are .item:eq("+i+") .name").text(employees[i].name);
		// set role text
		$("#tss-container #who-we-are .item:eq("+i+") .role").text(employees[i].role);
		// set each icon to open lightbox on click
		$("#tss-container #who-we-are .item .open-lightbox:eq("+i+")").click(function(e) {
			e.preventDefault();
			showLightbox($(this));
		});
	}

}); // end $(document).ready(...)
