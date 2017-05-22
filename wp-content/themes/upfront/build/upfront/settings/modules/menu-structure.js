!function(e){define(["elements/upfront-newnavigation/js/menu-util","scripts/upfront/settings/modules/menu-structure/menu-item","text!scripts/upfront/settings/modules/menu-structure/menu-structure.tpl"],function(t,n,i){var s=(Upfront.Settings.l10n.preset_manager,!1),r=Backbone.View.extend({className:"settings_module menu_structure_module clearfix",handlesSaving:!0,events:{"mouseenter .menu-item-header":"enableSorting","mouseleave .menu-item-header":"disableSortingOnHeaderLeave","click .add-menu-item":"addItem"},initialize:function(e){var t=this;this.options=e||{},this.listenTo(this.model.get("properties"),"change",function(){t.reloadItems()}),Upfront.Events.on("menu_element:edit",function(e){t.reloadItems()}),this.setup()},reloadItems:function(){this.setup(),this.render()},setup:function(){this.menuId=this.model.get_property_value_by_name("menu_id"),this.menuItems=[],this.menuItemViews=[],this.menu=t.getMenuById(this.menuId),this.menuId!==!1&&this._load_items()},_has_promise:function(e){var t=JSON.stringify(e);return!!(this._promises||{})[t]},_add_promise:function(e,t){var n=JSON.stringify(e);return this._promises=this._promises||{},this._promises[n]=t,!0},_drop_promise:function(e){var t=JSON.stringify(e);return this._promises=this._promises||{},this._promises[t]=!1,!0},_load_items:function(){var e,t=this,i={action:"upfront_new_load_menu_array",data:this.menuId+""};return!!this._has_promise(i)||(e=Upfront.Util.post(_.extend({},i)),this._add_promise(i,e),e.success(function(e){t.menuItems=e.data||[],_.each(t.menuItems,function(e,i){var s=new n({model:new Backbone.Model(e),menuId:t.menuId});t.menuItemViews.push(s),t.listenTo(s,"change",function(e){t.menuItems[i]=e,t.model.trigger("change",t.model)})}),t.model.set_property("menu_items",e.data,!0),t.model.id&&t.model.trigger("change"),t.render(),t._drop_promise(i)}).error(function(e){Upfront.Util.log("Error loading menu items")}),!0)},render:function(){var e,t=this;if(this.$el.html(i),this.menuId!==!1){if(e=this.$el.find(".menu-structure-body"),_.each(this.menuItemViews,function(t){e.append(t.render().el)}),s){var n=t.$el.closest(".uf-settings-panel--expanded"),r=n.closest("#sidebar-scroll-wrapper");r.scrollTop(n.height()-175),s=!1}return Upfront.Events.trigger("menu_element:settings:rendered")}},enableSorting:function(t){if(this.sortingInProggres!==!0){var n,i=this.$el.find(".menu-structure-module-item"),s=e(t.target).parent(),r=!1,m=this;i.addClass("menu-structure-sortable-item"),i.each(function(){if(!r)return!_.isUndefined(n)&&e(this).data("menuItemDepth")<=n?void(r=!0):!_.isUndefined(n)&&e(this).data("menuItemDepth")>n?(e(this).addClass("hovered-item-group-member"),void e(this).removeClass("menu-structure-sortable-item")):void(_.isUndefined(n)&&e(this).is(s)&&(n=e(this).data("menuItemDepth"),e(this).addClass("hovered-item-group-member"),e(this).removeClass("menu-structure-sortable-item")))}),this.$el.find(".hovered-item-group-member").wrapAll('<div class="menu-structure-sortable-item"></div>'),this.$el.sortable({axis:"y",items:".menu-structure-sortable-item",start:function(e,t){m.sortingInProggres=!0,m.watchItemDepth(t.item)},stop:function(e,t){m.stopWatchingItemDepth(t.item),m.updateItemsPosition(t.item),m.sortingInProggres=!1}})}},disableSortingOnHeaderLeave:function(){this.sortingInProggres!==!0&&this.disableSorting()},disableSorting:function(){var e=this.$el.find(".menu-structure-module-item"),t=this.$el.find(".hovered-item-group-member");t.unwrap(),t.removeClass("hovered-item-group-member"),e.removeClass("menu-structure-sortable-item"),this.$el.sortable("destroy")},watchItemDepth:function(e){var t,n=this;this.$el.on("mousemove",function(i){return _.isUndefined(t)?void(t=i.pageX):void(Math.abs(t-i.pageX)<15||(n.updateSortableDepth(t,i.pageX,e),t=i.pageX))})},updateSortableDepth:function(e,t,n){var i=n.hasClass("menu-structure-module-item")?n.data("menuItemDepth"):n.children().first().data("menu-item-depth"),s=n.prev().data("menu-item-depth"),r=n.nextAll().not(".ui-sortable-placeholder").first().data("menu-item-depth");e>t&&this.decreaseGroupDepth(i,s,r,n),e<t&&this.increaseGroupDepth(i,s,r,n)},decreaseGroupDepth:function(t,n,i,s){var r=this;if(n<t&&i<t||n===t&&i<t||_.isUndefined(i)||i<t){if(s.hasClass("menu-structure-module-item")){if(0===s.data("menuItemDepth"))return;return void this.decreaseItemDepth(s)}if(0===s.children().first().data("menuItemDepth"))return;s.children().each(function(){r.decreaseItemDepth(e(this))})}},increaseGroupDepth:function(t,n,i,s){var r=this;if(n>=t||n===t&&i<t){if(s.hasClass("menu-structure-module-item"))return void this.increaseItemDepth(s);s.children().each(function(){r.increaseItemDepth(e(this))})}},decreaseItemDepth:function(e){e.removeClass("menu-structure-item-depth-"+e.data("menuItemDepth")),e.data("menu-item-depth",e.data("menuItemDepth")-1),e.addClass("menu-structure-item-depth-"+e.data("menuItemDepth"))},increaseItemDepth:function(e){e.removeClass("menu-structure-item-depth-"+e.data("menuItemDepth")),e.data("menuItemDepth",e.data("menuItemDepth")+1),e.addClass("menu-structure-item-depth-"+e.data("menuItemDepth"))},stopWatchingItemDepth:function(){this.$el.off("mousemove")},flattenItem:function(e){var t=this,n=[e];return e.sub&&_.each(e.sub,function(e){n=_.union(n,t.flattenItem(e))}),n},updateItemsPosition:function(){var t=this,n=[];_.each(this.menuItems,function(e){n=_.union(n,t.flattenItem(e))});var i,s,r=this.$el.find(".menu-structure-module-item"),m=[],u=[0],a=0,o=1,d=0;r.each(function(){var t=_.findWhere(n,{"menu-item-object-id":e(this).data("menuItemObjectId")}),r=e(this).data("menuItemDepth");if(r>d)u.push(a),d+=1;else if(r===d);else if(r<d){for(i=d-r,s=0;s<i;s++)u=_.initial(u);d=r}m.push(_.extend(t,{"menu-item-parent-id":_.last(u)||0,"menu-item-position":o})),o+=1,a=t["menu-item-object-id"]}),Upfront.Util.post({action:"upfront_update_menu_items",data:{items:m,menuId:this.menuId}}).done(function(){t.model.trigger("change")}).fail(function(e){Upfront.Util.log("Failed saving menu items.")})},addItem:function(){var e=this,t={"menu-item-object":"custom","menu-item-parent-id":0,"menu-item-target":"","menu-item-title":"New Item","menu-item-type":"custom","menu-item-url":""};Upfront.Util.post({action:"upfront_update_single_menu_item",menuId:this.menuId,menuItemData:t}).done(function(n){t["menu-item-db-id"]=n.data.itemId,t["menu-item-object-id"]=n.data.itemId+"",Upfront.Util.post({action:"upfront_update_single_menu_item",menuId:e.menuId,menuItemData:t}).done(function(){e.model.get_property_value_by_name("menu_items").unshift(t),e.model.get("properties").trigger("change"),s=!0})}).fail(function(e){Upfront.Util.log("Failed saving menu items.")})},save_fields:function(){}});return r})}(jQuery);