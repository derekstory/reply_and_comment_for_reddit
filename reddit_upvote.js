$(document).ready(function() {
	var firstButtons = $('.usertext-buttons').append('<label><span class="reply-upvote-text">Upvote Thread</span> <input type="checkbox" class="upvote-original-reddit-post" checked /></label>');
	var postTable 	 = $('#siteTable');
	var upvoteButton = postTable.find('.arrow');

	firstButtons.css('font-size', '9px');

	function threadUpvoteReady() {
		firstButtons.find('label').show();
	}

	function threadUpvoted() {
		firstButtons.find('label').hide();
	}

	// If post hasn't been upvoted yet, add the upvote checkbox
	(postTable.find('.unvoted .arrow.up').length ? threadUpvoteReady : threadUpvoted)();

	// Post Upvote button clicked
	upvoteButton.on('click', function() {
		// Upvoted post
		if($(this).hasClass('up')) {
			threadUpvoted();
		}
		// Retracted upvote
		if($(this).hasClass('upmod')) {
			threadUpvoteReady();
		}
	});

	// "Save" button is clicked to submit a reply
	$(document).on('click', '.save', function(e) {
		var target   = $(e.currentTarget);
		var parent   = target.closest('.child, .md-container');
		var textarea = parent.find('textarea');
		var checkbox = parent.find('.upvote-original-reddit-post');
		var label    = checkbox.closest('label').find('.reply-upvote-text');

		// Upvote the thread
		if(textarea.val() && checkbox.is(':checked') && !label.hasClass('upvote-reply')) {
			postTable.find('.arrow.up').click();
			chrome.runtime.sendMessage({action: "upvoteThread"});
		}

		// Upvote the parent Reply
		if(textarea.val() && checkbox.is(':checked') && label.hasClass('upvote-reply')) {
			var container = target.closest('.child');
			var buttons   = container.siblings('.midcol.unvoted');
			var upvote    = buttons.find('.arrow.up');

			upvote.click();
			chrome.runtime.sendMessage({action: "upvoteReply"});
		}

	});

	// Prepare the "upvote reply" checkbox/label
	$(document).on('click', '.reply-button', function(e) {
		var target    = $(e.currentTarget);
		var parent    = $('.entry').has(target);
		var uncle     = parent.next('.child');
		var labelText = uncle.find('.reply-upvote-text');
		var label     = $('label').has(labelText);

		if(parent.hasClass('unvoted')) {
			labelText.addClass('upvote-reply').text('Upvote Reply');
			label.find('input').prop('checked', true);
			label.show();
		} else {
			label.hide();
		}
	});

});
