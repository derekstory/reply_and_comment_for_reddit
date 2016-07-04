$(document).ready(function() {

	var postTable = $('#siteTable');
	var upvoteButton = postTable.find('.arrow');

	function upvoteReady() {
		$('.usertext-buttons').append('<label>Upvote Thread <input type="checkbox" class="upvote-original-reddit-post" checked /></label>');
	}

	function upvoted() {
		$('.upvote-original-reddit-post').closest('label').remove();
	}

	// If post hasn't been upvoted yet, add the upvote checkbox
	if(postTable.find('.unvoted .arrow.up').length > 0 ){
		upvoteReady();
	} else {
		upvoted();
	}

	// Post Upvote button clicked
	upvoteButton.on('click', function() {
		// Upvoted post
		if($(this).hasClass('up')) {
			upvoted();
		}
		// Retracted upvote
		if($(this).hasClass('upmod')) {
			upvoteReady();
		}
	});

	// "Save" button is clicked to submit a reply
	$(document).on('click', '.save', function(e) {
		var target   = $(e.currentTarget);
		var	parent   = target.closest('.child, .md-container');
		var	textarea = parent.find('textarea');
		var checkbox = parent.find('.upvote-original-reddit-post');

		// Only if the user is really submitting a comment (not empty text)
		if(textarea.val() && checkbox.is(':checked')) {
			postTable.find('.arrow.up').click();
			// chrome.runtime.sendMessage({action: "redditUpvote"});
		}

	});

});
