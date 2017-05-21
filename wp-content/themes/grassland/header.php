<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en:gb">
<head profile="http://gmpg.org/xfn/11">
	<title><?php bloginfo('name'); wp_title(); ?><?php if (isset($page) && $page >= 2) { ?> Page <?php echo $page;?><?php }?></title>
	<base href="<?php bloginfo('url'); ?>"></base>

	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
	<meta http-equiv="imagetoolbar" content="no" />
	<meta name="MSSmartTagsPreventParsing" content="TRUE" />
<?php wp_get_archives('type=monthly&format=link'); ?>
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

<!-- favicon.ico location -->
<?php if(file_exists( WP_CONTENT_DIR . '/favicon.ico')) { //put your favicon.ico inside wp-content/ ?>
<link rel="icon" href="<?php echo WP_CONTENT_URL; ?>/favicon.ico" type="images/x-icon" />
<?php } elseif(file_exists( WP_CONTENT_DIR . '/favicon.png')) { //put your favicon.png inside wp-content/ ?>
<link rel="icon" href="<?php echo WP_CONTENT_URL; ?>/favicon.png" type="images/x-icon" />
<?php } elseif(file_exists( TEMPLATEPATH . '/favicon.ico')) { ?>
<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico" type="images/x-icon" />
<?php } elseif(file_exists( TEMPLATEPATH . '/favicon.png')) { ?>
<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/favicon.png" type="images/x-icon" />
<?php } ?>
	<link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name');?> &raquo; <?php _e('global feed')?>" href="<?php bloginfo('rss2_url');?>" />

	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url');?>" type="text/css" media="screen" />
	<!--[if !IE]>-->
	<link rel="stylesheet" href="<?php bloginfo('template_directory');?>/iphone.css" type="text/css" media="only screen and (max-device-width: 480px)"/>
	<!--<![endif]-->
	<!--[if lt IE 7]>
	<link rel="stylesheet" href="<?php bloginfo('template_directory');?>/ie.css" type="text/css" media="screen"/>
	<style media="screen" type="text/css">
		.postFrame .IEFix {filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='<?php bloginfo('template_directory');?>/images/post.png'), sizingMethod='image'}
		.widget .IEFix    {filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='<?php bloginfo('template_directory');?>/images/widget.png'), sizingMethod='image'}
		#headerRSS        {filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='<?php bloginfo('template_directory');?>/images/rss.png'), sizingMethod='image'}
	</style>
	<![endif]-->
 <?php remove_action( 'wp_head', 'wp_generator' ); ?>
<?php if ( is_singular() ) wp_enqueue_script( 'comment-reply' ); ?>
<?php wp_head(); ?>

<?php if( get_background_image() || get_theme_mod('preset_bg') ) { ?>
<style>
#documentBody, #layer1 {
    background: transparent none !important;
}
</style>
<?php } ?>
</head>

<body id="<?php echo strtolower(date('M'));?>" <?php body_class();?>>




<div id="layer1">

<div id="container">

           <div id="custom">
        <div id="custom-navigation">
<?php if ( function_exists( 'wp_nav_menu' ) ) { // Added in 3.0 ?>
<?php if ( has_nav_menu( 'main-nav' ) ) { ?>
<ul id="nav">
<?php echo bp_wp_custom_nav_menu($get_custom_location='main-nav', $get_default_menu='revert_wp_menu_page'); ?>
</ul>
<?php } ?>
<?php } else { ?>
<ul id="nav">
<?php wp_list_pages('title_li=&depth=1'); ?>
</ul>
<?php } ?>
</div>       </div>


	<div id="header">
		<div id="titles">
			<h1 id="siteTitle"><a href="<?php echo get_option('home'); ?>"><?php bloginfo('name') ?></a></h1>
			<h2 id="tagline"><?php bloginfo('description') ?></h2>
		</div>
		<div class="login"><?php wp_loginout(); wp_register('&nbsp;&nbsp;/&nbsp;&nbsp;','');?></div>



	</div>

	<div id="documentBody">
		<div id="navigationBar">




			<a href="<?php bloginfo('rss2_url');?>" id="headerRSS"><img src="<?php bloginfo('template_directory');?>/images/rss.png" alt="<?php _e('Site wide RSS feed.', 'grassland');?>"/></a>
			<div id="headerSearcher">
				<form method="get" action="<?php bloginfo('url'); ?>/" class="searchForm">
					<fieldset>
					<input type="text" class="searchInput" value="<?php the_search_query(); ?>" name="s" />
					<input type="image" class="searchSubmit" alt="<?php _e('Search', 'grassland')?>" src="<?php bloginfo('template_directory')?>/images/search.gif"/>
					</fieldset>
				</form>
			</div>
		</div>


