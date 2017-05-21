<?php get_header();?>
<div id="content"><?php
	if (have_posts()) { while (have_posts()) { the_post();?>

	<div class="postFrame">
		<span class="postFrameTop"><span class="IEFix"></span></span>
		<div class="postContent">
			<?php if ($post->post_type != 'page') {?>
			<div class="postDate">
				<span class="postMonth"><?php the_time('M');?></span>
				<span class="postDay"><?php the_time('d');?></span>
				<span class="postYear"><?php the_time('Y');?></span>
			</div><?php
			}

			echo $theTitle = the_title( '<h2 class="postTitle">'.(is_single() || is_page()? '' : '<a href="'.get_permalink().'">'),(is_single() || is_page()? '' : '</a>').($page >= 2 ? __(' &raquo; Page').' '.$page: '').'</h2>',false );
			if (strtolower($post->post_type) == "post" && $theTitle) { ?>
			<div class="postMeta">
				<?php _e('By', 'grassland');?> <a href="<?php echo get_author_posts_url(get_the_author_meta('ID')); ?>"><?php the_author();?></a>
				<?php if (comments_open() && !(is_single() || is_page())){
					_e(' and has ', 'grassland');
					comments_popup_link(__('no comments yet.', 'grassland'), __('1 comment.', 'grassland'), __('% comments.', 'grassland'),'','');
				}
				edit_post_link(__('Edit', 'grassland'),'<span class="editMeLink">(',')</span>');?>
			</div><?php
			}?>

			<div class="postBody">

            <?php if( is_date() || is_search() || is_tag() || is_author() ) { ?>

<?php if(function_exists('the_post_thumbnail')) { ?><?php if(get_the_post_thumbnail() != "") { ?><div class="alignleft">
<?php the_post_thumbnail(); ?></div><?php } } ?>
<?php the_excerpt();?>
<?php if (function_exists('wp_ozh_wsa')) { wp_ozh_wsa("336280nocolor"); } ?>
<?php } else { ?>

<?php the_content();
wp_link_pages(array('before' => '<div class="pageLinks"><strong>'.__('Pages: ').'</strong>', 'after' => '</div>', 'next_or_number' => 'number', 'pagelink' => '%', 'link_before' => '<span class="page-numbers">', 'link_after' => '</span>'));?>
<?php if (function_exists('wp_ozh_wsa')) { wp_ozh_wsa("336280nocolor"); } ?>
<?php } ?>







				<div class="clear"></div>
			</div>

			<?php
			if(strtolower($post->post_type) == "post" ) {?>
			<div class="postFooter">
				<div class="postCategories">
					<strong><?php _e('Categories:', 'grassland')?></strong>
				<?php the_category(', ');?>
				</div>

				<?php
				if (function_exists('the_tags'))
					the_tags('<div class="postTags"><strong>'.__('tags:', 'grassland').'</strong> ',', ','</div>');?>

				<div class="clear"></div>
			</div><?php
			}

			comments_template('/comments.php',true);?>

		</div>
		<span class="postFrameBottom"><span class="IEFix"></span></span>
	</div><?php
	} } else { /* If nothing found the this is what will show. */ ?>
	<div class="postFrame">
		<span class="postFrameTop"><span class="IEFix"></span></span>
			<div class="postContent">
				<h2><?php _e('Sorry', 'grassland');?>:</h2>
				<h3><?php _e("We couldn't find what you were looking for.", 'grassland');?></h3>
				<?php include (TEMPLATEPATH . '/searchform.php'); ?>
				<div style="clear:both;"></div>
			</div>
		<span class="postFrameBottom"><span class="IEFix"></span></span>
	</div><?php
	}
	if (function_exists('paginate_archives'))
		paginate_archives(array('next_text'=> '&raquo;', 'prev_text' => '&laquo;')); // If my function exists do it that way otherwise do it the old way.
	else {
		global $wp_query;
		if ( $wp_query->max_num_pages > 1 && !is_singular()) {?>
			<div id="pageNavigation">
				<div id="previousPosts"><?php previous_posts_link(__('&laquo; Previous page', 'grassland'));?></div>
				<div id="nextPosts"><?php next_posts_link(__('Next page &raquo;', 'grassland'));?></div>
			</div><?php
		}
	}?>
</div>
<?php get_sidebar()?>
<?php get_footer() ?>
