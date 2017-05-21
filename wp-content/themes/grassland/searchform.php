<form method="get" action="<?php bloginfo('url'); ?>/" class="searchForm">
	<fieldset>
		<input type="text" class="searchInput" value="<?php the_search_query(); ?>" name="s" />
		<input type="submit" class="searchSubmit" value="<?php _e('Search', 'grassland')?>" />
	</fieldset>
</form>
