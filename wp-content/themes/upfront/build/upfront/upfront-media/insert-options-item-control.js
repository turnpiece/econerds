!function(t){define([],function(){var t=Upfront.Settings.l10n.media,e={uf_insert:"image_insert",wp_insert:"wp_default"},i=Backbone.View.extend({events:{"click a.upfront-media-insert-option-toggle":"toggle_option"},initialize:function(t){},render:function(){var i=this.model.at(0).get("insert_option")||e.uf_insert,n=i==e.uf_insert?"active":"inactive";return this.$el.empty(),this.$el.append('<a class="upfront-media-insert-option-toggle '+n+'"></a>'),this.$el.append('<label class="upfront-field-label upfront-field-label-block">'+t.full_size+"</label>"),this},toggle_option:function(t){t.stopPropagation(),t.preventDefault();var i=this.model.at(0).get("insert_option")||e.uf_insert;this.model.at(0).set("insert_option",i==e.uf_insert?e.wp_insert:e.uf_insert),this.render()}});return{Options_Control:i,INSERT_OPTIONS:e}})}(jQuery);