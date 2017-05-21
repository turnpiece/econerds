<?php get_header();?>
<div id="content"><?php
	if (have_posts()) {	while (have_posts()) { the_post();?>

	<div class="postFrame">
		<span class="postFrameTop"><span class="IEFix"></span></span>
		<div class="postContent"><?php

			the_title('<h2 class="postTitle"><a rel="attachment" href="'.get_permalink($post->post_parent).'">'.get_the_title($post->post_parent).'</a> <span class="rightArrow">&raquo;</span> ','</h2>');?>
			<div class="postMeta">
				<span class="postDate"><?php the_date("",__("Posted ", 'grassland'));?></span>
				<?php _e("By", 'grassland');?> <a href="<?php echo get_author_posts_url(get_the_author_meta('ID')); ?>"><?php the_author();?></a>
				<?php if (comments_open() && !(is_single() || is_page())){
					_e(" and has ");
					comments_popup_link(__("no comments yet.", 'grassland'), __("1 comment.", 'grassland'), __("% comments.", 'grassland'),"","");
				}
				edit_post_link(__("Edit", 'grassland'),'<span class="editMeLink">(',')</span>');?>
			</div>
			<a class="aligncenter" href="<?php echo wp_get_attachment_url($post->ID); ?>"><?php echo wp_get_attachment_image( $post->ID,'original'); ?></a>
			<?php
			if (!empty($post->post_excerpt)){
				echo '<div style="text-align:center">';
				the_excerpt();
				echo '</div>';
			}?>
			<div class="clear"></div>
		</div>
		<span class="postFrameBottom"><span class="IEFix"></span></span>
	</div>
	<?php
	} } else { /* If nothing found the this is what will show. */ ?>

	<div class="postFrame">
		<span class="postFrameTop"><span class="IEFix"></span></span>
			<div class="postContent">
				<h2><?php _e("Sorry", 'grassland');?>:</h2>
				<h3><?php _e("We couldn't find what you were looking for.", 'grassland');?></h3>
				<?php include (TEMPLATEPATH . "/searchform.php"); ?>
				<div style="clear:both;"></div>
			</div>
		<span class="postFrameBottom"><span class="IEFix"></span></span>
	</div>

	<?php /* Foot of the content column.  */
	}?>
</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
