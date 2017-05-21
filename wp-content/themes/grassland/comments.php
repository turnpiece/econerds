<?php
if ('comments.php' == basename($_SERVER['SCRIPT_FILENAME'])) die (__("Please don't do that.", 'grassland'));
if (!empty($post->post_password) && $_COOKIE['wp-postpass_'.COOKIEHASH] != $post->post_password)
	return;

/*
	Make sure comments are only executed on pages and posts and not attachments.
	It's nice to be able to comment on attachments, it's not nice not being able
	to turn off the comments on them without cheating. Even when you do cheat,
	typing the post id into the edit URL, you end up breaking the page_parent
	connection. :( Most of the following code is in place to avoid redundant tags
	showing up when elements are disabled and to attach classes to tags under
	different circumstances.
*/

if ((comments_open() || get_comments_number() > 0) && (is_single() || is_page())) {?>
	<div id="commentsBlock">
		<a name="comments"></a>
		<?php
		/*
			If there are any comments, pings or track backs show
			them otherwise skip this bit to keep things tidy.
		*/

		if ((function_exists('have_comments') && have_comments()) || (!function_exists('have_comments') && $comments)) { // Cover WP all the way back to 2.1 with this.
			if (function_exists('wp_list_comments')){							// New >= 27 comments.
				if ($comments_by_type['pingback']||$comments_by_type['trackback']) {?>
					<strong class="commentTitle"><?php _e('Trackbacks', 'grassland')?></strong>
					<ul id="trackbackList">
						<?php wp_list_comments(array('max_depth' => 0,type => 'pings'));?>
					</ul>
					<?php
				}
				?>

				<strong class="commentTitle"><?php _e('Comments', 'grassland')?></strong>
				<ul id="commentlist">
					<?php wp_list_comments(array('max_depth'=> 10,type => 'comment'));?>
				</ul>

			<?php
			} else {															// Old <= 26 comments.?>
				<strong class="commentTitle"><?php _e('Comments', 'grassland')?></strong>
				<ul id="commentlist"><?php
				$commentalt = true;
				foreach ($comments as $count => $comment) {

					/*
						The following sets up the class attribute for the comments.
						Adding author, approval, alternate and first post allowing me
						to attach style to the comments as I see fit.
					*/
					$commentClass = array();
					$commentType = $commentClass[] = get_comment_type();

					if ($commentalt) {
						array_push($commentClass,'even');
						$commentalt = false;
					} else {
						array_push($commentClass,'odd');
						$commentalt = true;
					}

					if ($comment->user_id == $post->post_author)
						array_push($commentClass,'bypostauthor');

					if ($comment->comment_approved == 0)
						array_push($commentClass,'unapproved');

					if ($count == 0)
						array_push($commentClass,'first'); /* First post LOL!!!!!111 */

					if (is_array($commentClass) && count($commentClass) >= 1)
						$commentClass='class="'.implode(' ',$commentClass).' thread-even depth-1"';
					else
						unset ($commentClass)?>

					<li id="comment-<?php comment_ID()?>" <?php echo $commentClass?>>
					<div id="div-comment-<?php comment_ID()?>">
						<div class="comment-author vcard">
						<?php
						if (function_exists('get_avatar') && strtolower($commentType) == 'comment')
							echo '<a href="http://gravatar.com/site/login">'.get_avatar($comment, 32).'</a>'?>
							<cite class="fn"><?php comment_author_link()?></cite><span class="says"> <?php _e('says:', 'grassland')?></span>
						</div>

						<div class="comment-meta commentmetadata">
							<a href="<?php echo get_permalink()?>#comment-<?php comment_ID()?>"><?php comment_date(); _e(' at ');comment_time()?></a>
							<?php edit_comment_link(__('Edit', 'grassland'),'&nbsp;(',')')?>
							<? echo ($comment->comment_approved == 0 ? '<div class="approval"><em>'.__('Your comment is not yet approved.', 'grassland').'</em></div>' : '')?>
						</div>
						<?php comment_text()?>
						<div class="reply"></div>
					</div>
					</li>
					<?php
				}?>
				</ul><?php
			}

			if (function_exists('paginate_comments_links')) {?>

				<div id="commentPagination"><?php paginate_comments_links(array('next_text'=> '&raquo;', 'prev_text' => '&laquo;'));?></div><?php
			}
		}

		if(comments_open() && (is_page() || is_single())) {?>
                 <div id="respond">
			<div id="newComment">
				<div id="newCommentTitle">
				<?php
				if (function_exists('comment_form_title')) {
					comment_form_title(__('Leave a Comment', 'grassland'),__('Leave a Reply to %s', 'grassland'));
				} else {
					_e('Leave a Comment', 'grassland');
				}?>
				</div>
				<a name="respond"></a>

			<?php
			if (get_option('comment_registration') && !$user_ID ) {?>
				<a href="<?php echo get_option('siteurl')?>/wp-login.php?redirect_to=<?php echo urlencode(get_permalink())?>"><?php _e('You must be logged in to comment.', 'grassland')?></a><?php
			} else {?>

				<form action="<?php echo get_option('siteurl')?>/wp-comments-post.php" method="post" id="commentForm">
				<fieldset><?php

				if ($user_ID) { ?>
					<?php _e('Logged in as', 'grassland')?> <a href="<?php echo get_option('siteurl')?>/wp-admin/profile.php"><?php echo $user_identity?></a>. <a href="<?php echo wp_logout_url($_SERVER['REQUEST_URI']);?>" title="<?php _e('Log out of this account', 'grassland') ?>"><?php _e('Log Out', 'grassland')?></a>
					<?php
				} else { ?>
					<div>
						<input type="text" name="author" id="author" value="<?php echo $comment_author?>" size="30" tabindex="1"<?php echo ($req ? ' class="vital"' : '')?>/>
						<label for="author">
							<small><?php _e('Name', 'grassland')?> <?php if ($req) _e('(required)')?></small>
						</label>
					</div>
					<div>
						<input type="text" name="email" id="email" value="<?php echo $comment_author_email?>" size="30" tabindex="2"<?php echo ($req ? ' class="vital"' : '')?>/>
						<label for="email">
							<small><?php _e('Mail (will not be published)', 'grassland')?> <?php if ($req) _e('(required)')?></small>
						</label>
					</div>
					<div>
						<input type="text" name="url" id="url" value="<?php echo $comment_author_url?>" size="30" tabindex="3" />
						<label for="url">
							<small><?php _e('Website', 'grassland')?> </small>
						</label>
					</div><?php
				}?>

				<textarea name="comment" id="comment" cols="56" rows="10" tabindex="4" class="vital"></textarea>

				<div class="commentSubmit">
					<?php if(function_exists('cancel_comment_reply_link')) cancel_comment_reply_link();?>
					<input name="submit" type="submit" tabindex="5" value="<?php _e('Post your comment', 'grassland')?>" class="submit" />
				</div>

				<input type="hidden" name="comment_post_ID" value="<?php echo $id?>" /><?php
				if (function_exists('comment_id_fields')) {
					comment_id_fields();
				}
				do_action('comment_form', $post->ID)?>
				</fieldset>
				</form><?php
			}?>
			</div></div><?php
		}

	?>
	</div><?php
}?>
