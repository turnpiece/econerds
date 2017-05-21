			<div id="footer">
				<span class="footerLink">&copy; <?php echo gmdate(__('Y')); ?>  <?php bloginfo('name'); ?><?php if( SHOW_AUTHORS != 'false') { ?><br />&#147;Grassland&#148; from <a href="http://spectacu.la" rel="designer">Spectacu.la WP Themes Club</a>
                <?php } ?>
                <?php if(function_exists('get_current_site')) { $current_site = get_current_site();  $current_network_site = get_current_site_name(get_current_site());  ?><br /><?php _e('Hosted by', 'grassland'); ?> <a title="<?php echo $current_network_site->site_name; ?>" target="_blank" href="http://<?php echo $current_site->domain . $current_site->path ?>"><?php echo $current_network_site->site_name; ?></a>
<?php } ?>   <br />
				<?php
				wp_footer(); ?>
				</span>
				<div class="clear"></div>
			</div>
		</div>
	</div>
	</div>
</body>
</html>
