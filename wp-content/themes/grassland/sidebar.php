<?php
global $post;
$exclude = get_option('page_on_front');
if ((is_home() and get_option('show_on_front') != 'page') or ((get_option('page_on_front') == $post->ID) and get_option('show_on_front') == 'page')) {
	$highlight = ' current_page_item';
}?>
<div id="sidebar"><?php
	if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('Sidebar') ) {?>

	<div class="widget">
		<span class="widgetTop"><span class="IEFix"></span></span>
		<div class="widgetCentre">

			<strong class="widgetTitle"><?php _e('Pages')?></strong>
			<ul>
				<?php wp_list_pages('sort_column=menu_order&title_li=&depth=3')?>
			</ul>

		</div>
		<span class="widgetBottom"><span class="IEFix"></span></span>
	</div>

	<div class="widget widget_categories">
		<span class="widgetTop"><span class="IEFix"></span></span>
		<div class="widgetCentre">
			<strong class="widgetTitle"><?php _e('Categories')?></strong>
			<ul>
				<?php wp_list_categories('hierarchical=1&use_desc_for_title=0&title_li=')?>
			</ul>
			<br/>
			<strong class="widgetTitle"><?php _e('Archives')?></strong>
			<ul>
				<?php  wp_get_archives('type=monthly&limit=12&format=html')?>
			</ul>
		</div>
		<span class="widgetBottom"><span class="IEFix"></span></span>
	</div>

	<div class="widget">
		<span class="widgetTop"><span class="IEFix"></span></span>
		<div class="widgetCentre">
			<ul>
				<?php wp_list_bookmarks(); ?>
			</ul>

		</div>
		<span class="widgetBottom"><span class="IEFix"></span></span>
	</div>

	<?php
	}?>
</div>
