!function(e){var t=Upfront.Settings&&Upfront.Settings.l10n?Upfront.Settings.l10n.global.views:Upfront.mainData.l10n.global.views;define(["scripts/upfront/upfront-views-editor/sidebar/sidebar-panel-settings-item","scripts/upfront/upfront-views-editor/fonts","scripts/upfront/upfront-views-editor/commands/command-open-font-manager","scripts/upfront/upfront-views-editor/fields","scripts/upfront/upfront-views-editor/breakpoint"],function(l,n,i,s,o){return l.extend({fields:{},current_element:"h1",elements:["h1","h2","h3","h4","h5","h6","p","a","a:hover","pre","ul","ol","blockquote","blockquote.upfront-quote-alternative"],inline_elements:["a","a:hover"],typefaces:{},styles:{},sizes:{},colors:{},line_heights:{},initialize:function(){var t=this;l.prototype.initialize.call(this);var i=n.Google.get_fonts();i&&i.state&&e.when(i).done(function(){t.render()}),this.listenTo(Upfront.Events,"upfront:render_typography_sidebar",this.render),this.listenTo(Upfront.Events,"entity:object:after_render",this.update_typography_elements),this.listenTo(Upfront.Events,"theme_colors:update",this.update_typography_elements,this)},on_render:function(){var l=this,a=e('<div class="upfront-typography-fields-left" />'),r=e('<div class="upfront-typography-fields-right" />'),h=this.model.get_property_value_by_name("typography"),p=_.findWhere(Upfront.Application.current_subapplication.get_layout_data().properties,{name:"typography"}),f={},c=!0,u=Upfront.plugins.call("get-default-typography",{default_typography:f});u.status&&"called"===u.status&&u.result&&(f=u.result),(!p||"value"in p&&_.isEmpty(p.value))&&(c=!1),p=p&&"value"in p?p.value:f;var d,g,y;if(_.isEmpty(h))if(_.contains(["tablet","mobile"],this.model.get("id"))||"big-tablet"===this.model.get("name"))switch(y="big-tablet"===this.model.get("name")?"big-tablet":this.model.get("id")){case"big-tablet":h=_.clone(p);break;case"tablet":var d=o.storage.get_breakpoints().findWhere({name:"big-tablet"});h=_.isUndefined(d)||_.isUndefined(d.get("typography"))||_.isUndefined(d.get("typography").h2)?p:_.clone(d.get("typography"));break;case"mobile":var g=o.storage.get_breakpoints().findWhere({id:"tablet"});h=_.isUndefined(g)||_.isUndefined(g.get("typography"))||_.isUndefined(g.get("typography").h2)?_.clone(p):_.clone(g.get("typography"))}else h=_.isEmpty(p)?f:p;this.typography=h,Upfront.mainData.global_typography=h,_.each(h,function(e,t){l.typefaces[t]=e.font_face,l.colors[t]=e.color,l.styles[t]=n.Model.get_variant(e.weight,e.style),e.size&&(l.sizes[t]=e.size),e.line_height&&(l.line_heights[t]=e.line_height)}),this.update_typography(void 0,c);var m,v=(Upfront.Application.get_current(),!0===Upfront.plugins.isRequiredByPlugin("show choose fonts button")),b=Upfront.mainData.userDoneFontsIntro,w=v&&!b||!v&&0===n.theme_fonts_collection.length&&!b;return m=w?new s.Button({label:t.select_fonts_to_use,compact:!0,classname:"open-theme-fonts-manager",on_click:function(e){Upfront.Events.trigger("command:themefontsmanager:open")}}):new i,0===n.theme_fonts_collection.length&&Upfront.mainData.userDoneFontsIntro===!1?(this.$el.html('<p class="sidebar-info-notice upfront-icon">'+t.no_defined_fonts+"</p>"),m.render(),void this.$el.append(m.el)):(this.fields.length||(this.fields={start_font_manager:m,element:new s.Select({label:t.type_element,default_value:"h1",values:[{label:t.h1,value:"h1"},{label:t.h2,value:"h2"},{label:t.h3,value:"h3"},{label:t.h4,value:"h4"},{label:t.h5,value:"h5"},{label:t.h6,value:"h6"},{label:t.p,value:"p"},{label:t.a,value:"a"},{label:t.ahover,value:"a:hover"},{label:t.pre,value:"pre"},{label:t.ul,value:"ul"},{label:t.ol,value:"ol"},{label:t.bq,value:"blockquote"},{label:t.bqalt,value:"blockquote.upfront-quote-alternative"}],change:function(){var t=this.get_value(),n=_.contains(l.inline_elements,t);l.current_element=t,l.fields.typeface.set_value(l.typefaces[t]),l.update_styles_field(),n?e([l.fields.size.el,l.fields.line_height.el]).hide():(e([l.fields.size.el,l.fields.line_height.el]).show(),l.fields.size.set_value(l.sizes[t]),l.fields.line_height.set_value(l.line_heights[t]||"1.1")),l.fields.color.set_value(l.colors[t]),l.fields.color.update_input_border_color(l.colors[t]);var i=l.fields.typeface.get_value();l.fields.typeface.set_option_font(i)}}),typeface:new s.Typeface_Chosen_Select({label:t.typeface,values:n.theme_fonts_collection.get_fonts_for_select(),default_value:l.typefaces.h1,select_width:"225px",change:function(){var e=this.get_value(),t=l.current_element;l.typefaces[t]!=e&&(l.typefaces[t]=e,l.styles[t]=n.Model.get_default_variant(e),l.update_typography(),l.update_styles_field())}}),style:this.get_styles_field(),color:new Upfront.Views.Editor.Field.Color({label:t.color,default_value:l.colors.h1,autoHide:!1,spectrum:{choose:function(e){var t=e.toRgb(),n="rgba("+t.r+","+t.g+","+t.b+","+e.alpha+")",i=l.current_element;n=e.get_is_theme_color()!==!1?e.theme_color:n,l.colors[i]!=n&&(l.colors[i]=n,l.update_typography(e))}}}),size:new s.Number({label:t.size,min:0,max:100,suffix:t.px,default_value:l.sizes.h1,change:function(){var e=this.get_value(),t=l.current_element;l.sizes[t]!=e&&(l.sizes[t]=e,l.update_typography())}}),line_height:new s.Number({label:t.line_height,min:0,max:10,step:.1,default_value:l.line_heights.h1,change:function(){var e=this.get_value(),t=l.current_element;l.line_heights[t]!=e&&(l.line_heights[t]=e,l.update_typography())}})}),this.$el.html(""),this.$el.addClass("typography-panel"),_.each(this.fields,function(e){e.render(),e.delegateEvents()}),this.$el.append([this.fields.start_font_manager.el,this.fields.element.el,this.fields.typeface.el]),e(".upfront-chosen-select",this.$el).chosen({width:"230px"}),a.append([this.fields.style.el,this.fields.size.el]),this.$el.append(a),r.append([this.fields.color.el,this.fields.line_height.el]),void this.$el.append(r))},update_styles_field:function(){this.fields.style.remove(),this.fields.style=this.get_styles_field(this.typefaces[this.current_element]),this.fields.style.render(),this.fields.style.delegateEvents(),e(".upfront-typography-fields-left").prepend(this.fields.style.el)},get_styles_field:function(e){var l=this;return new s.Typeface_Style_Chosen_Select({label:t.weight_style,values:this.get_styles(),default_value:l.get_styles_field_default_value(),font_family:e,select_width:"120px",change:function(){var e=this.get_value(),t=l.current_element;l.styles[t]!=e&&(l.styles[t]=e,l.update_typography())},show:function(e){l.fields.style.set_option_font(e)}})},get_styles_field_default_value:function(){var e,t=this.get_styles(),l=this.typefaces[this.current_element],i=this.styles[this.current_element];return e=i?i:l?n.Model.get_default_variant(l):"regular","regular"===e&&!_.findWhere(t,{value:"regular"})&&_.findWhere(t,{value:"400 normal"})?e="400 normal":"400 normal"===e&&!_.findWhere(t,{value:"400 normal"})&&_.findWhere(t,{value:"regular"})&&(e="regular"),"italic"===e&&!_.findWhere(t,{value:"italic"})&&_.findWhere(t,{value:"400 italic"})?e="400 italic":"400 italic"===e&&!_.findWhere(t,{value:"400 italic"})&&_.findWhere(t,{value:"italic"})&&(e="italic"),e},get_styles:function(){var e,t=this.typography,l=this.current_element,i=[];return!1===t&&(t={}),(_.isUndefined(t[l])||_.isUndefined(t[l].font_face))&&(t[l]={font_face:"Arial"}),e=n.theme_fonts_collection.get_variants(t[l].font_face),i=[],_.each(e,function(e){i.push({label:e,value:e})}),i},update_typography:function(t,l){var i=this,s=[],o=[],a={};if(_.each(this.elements,function(t){var l,r,h,p,f=[],c=_.contains(i.inline_elements,t),u=i.typefaces[t],d=!1,g=!1,y=!1,m=!1;e(".upfront-object-content "+t);if(h=n.Model.parse_variant(i.styles[t]||"regular"),y=h.weight,g=h.style,""===u&&(r=n.System.get_fonts().models[0]),_.isUndefined(r)&&(r=n.System.get_fonts().findWhere({family:u})),_.isUndefined(r)&&(r=n.theme_fonts_collection.get_additional_font(u)),_.isUndefined(r)){var v=n.Google.get_fonts();if(v&&v.findWhere&&(r=v.findWhere({family:u})),!r)return!0;l="//fonts.googleapis.com/css?family="+r.get("family").replace(/ /g,"+"),400!==parseInt(""+y,10)&&"inherit"!==y&&(l+=":"+y),e("head").append('<link href="'+l+'" rel="stylesheet" type="text/css" />')}d='"'+r.get("family")+'",'+r.get("category"),"inherit"!==d&&f.push("font-family: "+d),"inherit"!==y&&f.push("font-weight: "+y),"inherit"!==g&&f.push("font-style: "+g),c||(f.push("font-size: "+i.sizes[t]+"px"),f.push("line-height: "+i.line_heights[t]+"em")),!_.isEmpty(i.colors[t])&&Upfront.Views.Theme_Colors.colors.is_theme_color(i.colors[t])?p=Upfront.Views.Theme_Colors.colors.get_css_class(i.colors[t]):f.push("color: "+i.colors[t]),m="blockquote"===t?".upfront-object-content blockquote, .upfront-object-content blockquote p":"a"===t?".upfront-object-content a, .upfront-object-content a:link, .upfront-object-content a:visited":"h1"===t||"h2"===t||"h3"===t||"h4"===t||"h5"===t||"h6"===t?".upfront-object-content "+t+", .upfront-object-content "+t+" a, .upfront-ui "+t+".tag-list-tag":".upfront-object-content "+t+", .upfront-ui "+t+".tag-list-tag",s.push(m+"{ "+f.join("; ")+"; }"),_.contains(["tablet","mobile"],i.model.get("id"))&&o.push(m.replace(/\.upfront-object-content/g,"."+i.model.get("id")+"-breakpoint .upfront-object-content")+" { "+f.join("; ")+"; }"),a[t]={weight:y,style:g,size:!c&&i.sizes[t],line_height:!c&&(i.line_heights[t]||"1.1"),font_face:r.get("family"),font_family:r.get("category"),color:i.colors[t],theme_color_class:p}}),this.update_typography_elements(),l||(this.model.set_property("typography",a),this.typography=a),_.contains(["tablet","mobile"],this.model.get("id"))){var r=this.model.get("id")+"-breakpoint-typography",h=o.join("\n");e("#"+r).length?e("#"+r).html(h):e("body").find("style").first().before('<style id="'+r+'">'+h+"</style>")}else e("head").find("#upfront-default-typography-inline").length?e("head").find("#upfront-default-typography-inline").html(s.join("\n")):e('<style id="upfront-default-typography-inline">'+s.join("\n")+"</style>").insertAfter(e("head").find('link[rel="stylesheet"]').first())},update_typography_elements:function(t){var l=this,n=[],i=!1;i=e("style#typography-colors"),i.length||(e("body").append('<style id="typography-colors" />'),i=e("style#typography-colors")),_.each(this.elements,function(e){l.colors[e]&&n.push(".upfront-object-content "+e+"{ color:"+Upfront.Util.colors.to_color_value(l.colors[e])+"; }")}),i.empty().append(n.join("\n"))}})})}(jQuery);