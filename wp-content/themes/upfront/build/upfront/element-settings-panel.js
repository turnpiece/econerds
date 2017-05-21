!function(t){define([],function(){var e=Upfront.Settings&&Upfront.Settings.l10n?Upfront.Settings.l10n.global.views:Upfront.mainData.l10n.global.views,n=Backbone.View.extend(_.extend({},Upfront.Views.Mixins.Upfront_Scroll_Mixin,{className:"upfront-settings_panel_wrap",hide_common_anchors:!1,hide_common_fields:!1,events:{"click .upfront-cancel_settings":"on_cancel","click .upfront-settings_label":"on_toggle","click .upfront-settings-common_panel .upfront-settings-item-title":"on_toggle_common"},get_title:function(){return this.options.title?this.options.title:""},get_label:function(){return this.options.label?this.options.label:""},initialize:function(t){var e=this;this.hide_common_fields=!_.isUndefined(t.hide_common_fields)&&t.hide_common_fields,this.hide_common_anchors=!_.isUndefined(t.hide_common_anchors)&&t.hide_common_anchors,e.options=t,this.settings=t.settings?_(t.settings):_([]),this.settings.each(function(t){t.panel=e,t.trigger("panel:set")}),this.tabbed="undefined"!=typeof t.tabbed?t.tabbed:this.tabbed},tabbed:!1,is_changed:!1,render:function(){this.$el.html('<div class="upfront-settings_label" /><div class="upfront-settings_panel" ><div class="upfront-settings_panel_scroll" />');var t,n=this.$el.find(".upfront-settings_label"),i=(this.$el.find(".upfront-settings_panel"),this.$el.find(".upfront-settings_panel_scroll")),s=this;if(n.append(this.get_label()),this.settings.each(function(t){t.panel||(t.panel=s),t.render(),i.append(t.el)}),this.options.min_height&&i.css("min-height",this.options.min_height),this.tabbed){var o=this.settings.first();o.radio||o.reveal(),i.append('<div class="upfront-settings-tab-height" />')}if(this.stop_scroll_propagation(i),this.hide_common_fields===!1){if(this.$el.find(".upfront-settings_panel_scroll").after('<div class="upfront-settings-common_panel"></div>'),t=this.$el.find(".upfront-settings-common_panel"),"undefined"==typeof this.cssEditor||this.cssEditor){var l=new Upfront.Views.Editor.Settings.Settings_CSS({model:this.model,title:!1===this.hide_common_anchors?e.css_and_anchor:e.css_styles});l.panel=s,l.render(),t.append(l.el)}if(this.hide_common_anchors===!1){var a=new Upfront.Views.Editor.Settings.AnchorSetting({model:this.model});a.panel=s,a.render(),t.append(a.el)}}this.$el.fadeIn("fast",function(){var t=s.$el.parent(),e=(t.offset()?t.offset().top:0)+t.height(),n=jQuery(window).height();e+60>n+jQuery("body").scrollTop()&&jQuery("body").animate({scrollTop:e-n+60},"slow")}),this.trigger("rendered")},on_toggle_common:function(){var t=this,n=this.$el.find(".upfront-settings-common_panel");n.toggleClass("open"),n.is(".open")?this.$el.find(".upfront-settings-common_panel .upfront-settings-item-title span").first().html(e.element_css_styles):this.$el.find(".upfront-settings-common_panel .upfront-settings-item-title span").first().html(!1===t.hide_common_anchors?e.css_and_anchor:e.css_styles)},conceal:function(){this.$el.find(".upfront-settings_panel").hide(),this.$el.find(".upfront-settings_label").removeClass("active"),this.trigger("concealed")},reveal:function(){if(this.$el.find(".upfront-settings_label").addClass("active"),this.$el.find(".upfront-settings_panel").show(),this.tabbed){var e=0;this.$el.find(".upfront-settings-item-tab-content").each(function(){var n=t(this).outerHeight(!0);e=n>e?n:e}),this.$el.find(".upfront-settings-tab-height").css("height",e)}this.trigger("revealed")},show:function(){this.$el.show()},hide:function(){this.$el.hide()},is_active:function(){return this.$el.find(".upfront-settings_panel").is(":visible")},on_toggle:function(){this.trigger("upfront:settings:panel:toggle",this),this.show()},start_loading:function(t,e){this.loading=new Upfront.Views.Editor.Loading({loading:t,done:e}),this.loading.render(),this.$el.find(".upfront-settings_panel").append(this.loading.$el)},end_loading:function(t){this.loading?this.loading.done(t):t()},save_settings:function(){if(!this.settings)return!1;var t=this;this.settings.each(function(e){if((e.fields||e.settings).size()>0)e.save_fields();else{var n=t.model.get_property_value_by_name(e.get_name());n!=e.get_value()&&t.model.set_property(e.get_name(),e.get_value())}})},on_cancel:function(){this.trigger("upfront:settings:panel:close",this)},cleanUp:function(){this.settings&&this.settings.each(function(t){t.remove()}),this.$el.off(),this.remove()}}));return n})}(jQuery);