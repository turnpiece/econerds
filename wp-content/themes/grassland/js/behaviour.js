var trackbackShowText	= behaviourL10n.trackbackShowText,
	trackbackHideText	= behaviourL10n.trackbackHideText,
	errorText 			= behaviourL10n.searchError,
	searchText			= behaviourL10n.searchPrompt+' '; //Stick a space on the end so someone can search for the search prompt if they need to.

jQuery(document).ready(function($){
	//Search Widget
	$("#searchform").addClass("searchForm").find("#s").addClass("searchInput"); // Change WP2.5 search widget to match in with wp2.6+

	$("form.searchForm input[name=s]").each(function(){
		if ($(this).attr("value") === "" || $(this).attr("value") === undefined) {
			$(this).attr({value:searchText});
		}

		$(this).focus(function(){
			if ($(this).attr("value") == searchText){
				$(this).attr({value:""});
			}
			$(this).addClass("focused");
		});

		$(this).blur(function(){
			if ($(this).attr("value") === "" || $(this).attr("value") === undefined){
				$(this).attr({value:searchText});
			}
			$(this).removeClass("focused");
		});
	});

	// Stop search submission if nothing has been entered in the search box
	$("form.searchForm").submit(function(){
		var currentValue = $(this).find("input[name=s]").attr("value");

		if (currentValue === "" || currentValue === searchText || currentValue === undefined) {
			$(this).append('<p class="errorMessage">'+errorText+'</p>').children(".errorMessage").animate({top:"-50px",opacity:0},1000,"swing",function(){
					$(this).remove();
				});

			return false;
		} else {
			return true;
		}
	});
	// Stop you from hitting submit on comments until all important fields are filled.
	$("#commentForm").submit(function(){
		var blankFields = false;
		$(this).find(".vital").each(function(){
			var value = $(this).attr("value");
			if (value === undefined || value ===  "") {
				blankFields = true;
				$(this).css({borderColor:"#f00"}).fadeOut(250).fadeIn(250);
			} else {
				$(this).css({borderColor:"#ccc"});
			}
		});

		if (blankFields) {
			return false;
		} else {
			return true;
		}
	});
	
	// Hide trackbacks from view if they take up too much space. Too much is 250px in my opinion but then I don't really like them. :P
	var trackbackHeight = $("#trackbackList").height(),
		subordinateLevels = $("#commentlist").width() - 20;

	if (trackbackHeight > 250) {
		$("#trackbackList").css({height:trackbackHeight}).hide().after('<strong class="trackbackToggle">'+trackbackShowText+'</strong>').next(".trackbackToggle").click(function(){
			$(this).prev("#trackbackList").slideToggle('500',function(){
				if ($(this).css('display') === 'none'){
					$(this).next(".trackbackToggle").html(trackbackShowText);
				} else {
					$(this).next(".trackbackToggle").html(trackbackHideText);
				}
			});
		});
	}

	$(".depth-2 ul.children").each(function(){
		var posterName = $(this).prev("div").find("cite").text(),
			replyQuant = $(this).children("li").css({marginLeft:"0"}).length,
			replyText = '';
		
		if (replyQuant == 1) {
			replyText = replyQuant+' reply to <span class="posterName">'+posterName+"'s</span> comment.";
		} else {
			replyText = replyQuant+' replies to <span class="posterName">'+posterName+"'s</span> comment.";
		}
		$(this).hide().before('<div class="toggle">Click to show '+replyText+"</div>").append('<li class="toggle">'+replyText+'<span class="upArrow"></span></li>');

		$(this).children("li").css({marginLeft:"0"}).not(".toggle").css({width:subordinateLevels}); /* Remove indentation from subordinate elements */
	});

	$(".depth-2 .toggle").click(function() {
		var target = $(this).next("ul.children");
		if (target.length != 1) {
			target = $(this).parent("ul.children");
		}

		target.toggleClass("expanded").slideToggle("slow");
	});

	$(".widget_categories ul li > ul").hide().parent("li").prepend('<span class="expandToggle"></span>');
	$(".widget_categories .expandToggle").click(function(){
		$(this).toggleClass("active").siblings("ul").slideToggle("fast");
	});

	$("input[type='submit']").addClass("submit"); // Add a submit class to all submit buttons. Makes styling submit buttons easier in IE.
	$(".postBody table tr:odd").addClass("alternate"); // Zebra stripe tables the easy way.
	$(".postBody li").hover(
								 function(){$(this).addClass("highlight");},
								 function(){$(this).removeClass("highlight");}
								 ); // Add a highlight class to all LI on mouse over. Again this is for IE benefit.

	// Fix some IE 6 problems. The sooner ie6 dies the better
	$.each($.browser, function(i, val) {
		if(i=="msie" && val === true && $.browser.version.substr(0,1) == 6){
			// Add IE6 specific stuff here.
			$("#commentlist li.odd > div:not(.toggle)").addClass("commentOdd");
			$("#commentlist li.even > div:not(.toggle)").addClass("commentEven");
		}
		if(!$.boxModel){
			var theBody = document.getElementsByTagName("BODY");
			theBody[0].className+=" quirky";
		}
	});
});
