<?php
/**
 * Econerds News.
 *
 * This file adds the front page to the Econerds News Theme.
 *
 * @package News
 * @author  StudioPress
 * @license GPL-2.0+
 * @link    http://my.studiopress.com/themes/news/
 */

add_action( 'genesis_meta', 'news_home_genesis_meta' );
/**
 * Add widget support for homepage. If no widgets active, display the default loop.
 *
 * @since 3.0.0
 */
function news_home_genesis_meta() {

	if ( is_active_sidebar( 'home-top' ) || is_active_sidebar( 'home-middle-left' ) || is_active_sidebar( 'home-middle-right' ) || is_active_sidebar( 'home-bottom' ) ) {

		// Force content-sidebar layout setting.
		add_filter( 'genesis_pre_get_option_site_layout', '__genesis_return_content_sidebar' );

		// Add news-home body class.
		add_filter( 'body_class', 'news_body_class' );

		// Add content heading.
		add_action( 'genesis_before_loop', 'news_content_heading' );

	}

	if ( is_active_sidebar( 'home-top' ) ) {

		// Add excerpt length filter.
		add_action( 'genesis_before_loop', 'news_top_excerpt_length' );

		// Add homepage widgets.
		add_action( 'genesis_before_loop', 'news_homepage_top_widget' );

		// Remove excerpt length filter.
		add_action( 'genesis_before_loop', 'news_remove_top_excerpt_length' );

	}

	if ( is_active_sidebar( 'home-middle-left' ) || is_active_sidebar( 'home-middle-right' ) || is_active_sidebar( 'home-bottom' ) ) {

		// Remove the default Genesis loop.
		remove_action( 'genesis_loop', 'genesis_do_loop' );

		// Add homepage widgets.
		add_action( 'genesis_loop', 'news_homepage_widgets' );

	}

	// filter date and author display
	add_filter( 'genesis_post_info', 'news_post_info' );

	// remove tags
	add_filter( 'genesis_post_meta', 'news_post_meta' );

}

// Just display the date with posts
function news_post_info() {
	return '[post_date] ' . __( 'by', 'econerds-news' ) . ' [post_author_posts_link]';
}

function news_post_meta() {
	return '[post_categories]';
}

// Define econerds-news-home body class.
function news_body_class( $classes ) {

	$classes[] = 'econerds-news-home';

	return $classes;

}

// Define excerpt length.
function news_excerpt_length( $length ) {

	return 50; // Pull first 50 words.
	
}

// Add excerpt length filter.
function news_top_excerpt_length() {

	add_filter( 'excerpt_length', 'news_excerpt_length' );

}

// Remove excerpt length filter.
function news_remove_top_excerpt_length() {

	remove_filter( 'excerpt_length', 'news_excerpt_length' );

}

// Output Main Content heading.
function news_content_heading() {

	echo '<h2 class="screen-reader-text">' . __( 'Main Content', 'econerds-news' ) . '</h2>';

}

// Output the home-top widget area.
function news_homepage_top_widget() {

	genesis_widget_area( 'home-top', array(
		'before' => '<div class="home-top widget-area">',
		'after'  => '</div>',
	) );

}

// Output the home-middle and home-bottom widget areas.
function news_homepage_widgets() {

	if ( is_active_sidebar( 'home-middle-left' ) || is_active_sidebar( 'home-middle-right' ) ) {

		echo '<div class="home-middle">';

		genesis_widget_area( 'home-middle-left', array(
			'before' => '<div class="home-middle-left widget-area">',
			'after'  => '</div>',
		) );

		genesis_widget_area( 'home-middle-right', array(
			'before' => '<div class="home-middle-right widget-area">',
			'after'  => '</div>',
		) );

		echo '</div>';

	}

	genesis_widget_area( 'home-bottom', array(
		'before' => '<div class="home-bottom widget-area">',
		'after'  => '</div>',
	) );

}

// Run the Genesis loop.
genesis();
