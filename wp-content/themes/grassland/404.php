<?php get_header();?>
<div id="content">
	<div class="postFrame">
		<span class="postFrameTop"><span class="IEFix"></span></span>
			<div class="postContent">
				<h2><?php _e("It would seem you have found the unfindable.", 'grassland');?></h2>
				<?php include (TEMPLATEPATH . "/searchform.php"); ?>
				<div style="clear:both;"></div>
			</div>
		<span class="postFrameBottom"><span class="IEFix"></span></span>
	</div>
</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
