

		function MarkerTooltip(latlng, marker_id, opt, map) {
		  this.latlng_ = latlng;
			this.inf = opt;
			this.marker_id = marker_id;
		  // this.offsetVertical_ = -189;
		  // this.offsetHorizontal_ = -113;
		  // this.height_ = 203;
		  // this.width_ = 227;
		
		  this.offsetVertical_ = -230;
		  this.offsetHorizontal_ = -116;
		  this.height_ = 259;
		  this.width_ = 233;
		
		  this.setMap(map);
		}

		MarkerTooltip.prototype = new google.maps.OverlayView();

		MarkerTooltip.prototype.draw = function() {
		  var me = this;
			var num = 0;
	
		  var div = this.div_;
		  if (!div) {
		    div = this.div_ = document.createElement('DIV');
		    div.style.border = "none";
		    div.style.position = "absolute";
		    div.style.paddingLeft = "0px";
				div.style.opacity = "0";
				div.style.width = '233px';
				div.style.height = '259px';
				div.style.background = 'url(images/editor/tooltip_bkg2.png) no-repeat 0 0';
		
				//Close Infowindow button
				var close_button = document.createElement('a');
		    close_button.style.position = "absolute";
				close_button.style.right = "1px";
				close_button.style.top = "1px";
				close_button.style.width = "21px";
				close_button.style.height = "21px";
				close_button.style.cursor = 'pointer';
				close_button.style.background = "url(../images/editor/close_infowindow.png) no-repeat 0 0";
				$(close_button).text('');
				$(close_button).click(function(ev){
					me.hide();
				});
				$(close_button).hover(function(ev){
					$(close_button).css('background-position','0 -21px');
				},function(ev){
					$(close_button).css('background-position','0 0');
				});
				div.appendChild(close_button);
		
		
				//Marker Latitude
				var latitude = document.createElement('p');
				$(latitude).addClass('latitude');
		    latitude.style.position = "absolute";
				latitude.style.left = "26px";
				latitude.style.top = "14px";
				latitude.style.margin = "0";
				latitude.style.lineHeight = "29px";
				latitude.style.font = "normal 29px Georgia";
				latitude.style.color = "#666666";
				$(latitude).text((this.latlng_.lat()).toFixed(0));
		
				if ($(latitude).text().length>2) {
					if ($(latitude).text().length>3) {
						num = 2;
					} else {
						num = 4;
					}
				} else {
					num = 5;
				}
		
				var latitude_decimals = document.createElement('sup');
				latitude_decimals.style.color = "#666666";
				latitude_decimals.style.font = "normal 15px Georgia";
				$(latitude_decimals).text(String(Math.abs((this.latlng_.lat() % 1.0).toFixed(num))).substring(1));
				latitude.appendChild(latitude_decimals);
				div.appendChild(latitude);
		
		
				//Marker Longitude
				var longitude = document.createElement('p');
				$(longitude).addClass('longitude');
		    longitude.style.position = "absolute";
				longitude.style.left = "131px";
				longitude.style.top = "14px";
				longitude.style.margin = "0";
				longitude.style.lineHeight = "29px";
				longitude.style.font = "normal 29px Georgia";
				longitude.style.color = "#666666";
				$(longitude).text((this.latlng_.lng()).toFixed(0));
		
				if ($(longitude).text().length>2) {
					num = 4;
				} else {
					num = 5;
				}
		
				var longitude_decimals = document.createElement('sup');
				longitude_decimals.style.color = "#666666";
				longitude_decimals.style.font = "normal 15px Georgia";
				$(longitude_decimals).text(String(Math.abs((this.latlng_.lng() % 1.0).toFixed(num))).substring(1));
				longitude.appendChild(longitude_decimals);
				div.appendChild(longitude);


				//Marker accuracy
				var accuracy = document.createElement('p');
				$(accuracy).addClass('accuracy');
				accuracy.style.position = "absolute";
				accuracy.style.left = "24px";
				accuracy.style.top = "97px";
				accuracy.style.margin = "0";
				accuracy.style.font = "normal 11px Arial";
				accuracy.style.color = "#666666";
				$(accuracy).text(this.inf.accuracy+'km');
				div.appendChild(accuracy);
				

				//Marker collector
				var collector = document.createElement('p');
				$(collector).addClass('collector');
		    collector.style.position = "absolute";
				collector.style.left = "24px";
				collector.style.top = "129px";
				collector.style.margin = "0";
				collector.style.font = "normal 11px Arial";
				collector.style.color = "#666666";
				$(collector).text(this.inf.collector);
				div.appendChild(collector);


				//Precision
				var precision = document.createElement('p');
				$(precision).addClass('precision');
		    precision.style.position = "absolute";
				precision.style.right = "22px";
				precision.style.top = "157px";
				precision.style.margin = "0";
				precision.style.font = "bold 10px Arial";
				precision.style.color = "#F4A939";
				$(precision).text(this.inf.accuracy+'KM');
				div.appendChild(precision);
				
				var precision_slider = document.createElement('div');
				$(precision_slider).attr('id','precision_slider');
				precision_slider.style.position = 'absolute';
				precision_slider.style.left = "22px";
				precision_slider.style.top = "170px";
				precision_slider.style.margin = "6px 0 0 0";
				precision_slider.style.height = '5px';
				precision_slider.style.width = '190px';
				div.appendChild(precision_slider);


		
				//Buttons
				var delete_button = document.createElement('a');
		    delete_button.style.position = "absolute";
				delete_button.style.left = "24px";
				delete_button.style.bottom = "42px";
				delete_button.style.width = "58px";
				delete_button.style.height = "19px";
				delete_button.style.cursor = 'pointer';
				delete_button.style.background = "url(../images/editor/info_delete.png) no-repeat 0 0";
				$(delete_button).text('');
				$(delete_button).click(function(ev){
					me.deleteMarker();
				});
				$(delete_button).hover(function(ev){
					$(delete_button).css('background-position','0 -19px');
				},function(ev){
					$(delete_button).css('background-position','0 0');
				});
				div.appendChild(delete_button);
		
		
		
				var hide_button = document.createElement('a');
				$(hide_button).addClass('hide_button_');
		    hide_button.style.position = "absolute";
				hide_button.style.left = "87px";
				hide_button.style.bottom = "42px";
				hide_button.style.width = "58px";
				hide_button.style.height = "19px";
				hide_button.style.cursor = 'pointer';
				if (this.inf.active) {
					hide_button.style.background = "url(../images/editor/info_hide.png) no-repeat 0 0";
				} else {
					hide_button.style.background = "url(../images/editor/show_button.png) no-repeat 0 0";
				}
				$(hide_button).text('');
				$(hide_button).click(function(ev){
					me.makeActive();
				});
				$(hide_button).hover(function(ev){
					$(hide_button).css('background-position','0 -19px');
				},function(ev){
					$(hide_button).css('background-position','0 0');
				});
				div.appendChild(hide_button);

		    var panes = this.getPanes();
		    panes.floatPane.appendChild(div);
		  }

		  // Position the overlay 
		  var pixPosition = this.getProjection().fromLatLngToDivPixel(this.latlng_);
		  if (pixPosition) {
			  div.style.width = this.width_ + "px";
			  div.style.left = (pixPosition.x + this.offsetHorizontal_) + "px";
			  div.style.height = this.height_ + "px";
			  div.style.top = (pixPosition.y + this.offsetVertical_) + "px";
		  }

			$(div).animate({
		    top: '-=' + 10 + 'px',
		    opacity: 1
		  }, 250, 'swing');
		
		
			$("div#precision_slider").slider({
				range: "min",
				value: me.inf.accuracy,
				min: 1,
				max: 50,
				slide: function(event, ui) {
					_markers[me.marker_id].set('distance',ui.value*1000);
					_markers[me.marker_id].data.accuracy = ui.value;
					$(div).find('p.precision').html(ui.value + 'KM');
				}
			});
			
			google.maps.event.addDomListener(div,'mousedown',function(ev){ 
			    try{
						ev.stopPropagation();
					}catch(e){
						event.cancelBubble=true;
					}; 
			  });
			

		};

		MarkerTooltip.prototype.remove = function() {
		  if (this.div_) {
		    this.div_.parentNode.removeChild(this.div_);
		    this.div_ = null;
		  }
		};

		MarkerTooltip.prototype.getPosition = function() {
		 return this.latlng_;
		};


		MarkerTooltip.prototype.changePosition = function(latlng,marker_id,opt) {
			var num = 0;
	
			this.marker_id = marker_id;
			this.latlng_ = latlng;
			this.inf = opt;
			var div = this.div_;
			
			if ((this.latlng_.lat()).toFixed(0).length>2) {
				num = 4;
			} else {
				num = 5;
			}
			if (!this.inf.active) {
				$(div).find('a.hide_button_').css('background-image','url(../images/editor/show_button.png)');
			} else {
				$(div).find('a.hide_button_').css('background-image','url(../images/editor/info_hide.png)');
			}

			$(div).find('p.latitude').html((this.latlng_.lat()).toFixed(0)+'<sup style="color: rgb(102, 102, 102); font: normal normal normal 15px/normal Georgia; ">'+String(Math.abs((this.latlng_.lat() % 1.0).toFixed(num))).substring(1)+'</sup>');
	
			if ((this.latlng_.lng()).toFixed(0).length>2) {
				if ((this.latlng_.lng()).toFixed(0).length>3) {
					num = 2;
				} else {
					num = 4;
				}
			} else {
				num = 5;
			}	
	
			$(div).find('p.longitude').html((this.latlng_.lng()).toFixed(0)+'<sup style="color: rgb(102, 102, 102); font: normal normal normal 15px/normal Georgia; ">'+String(Math.abs((this.latlng_.lng() % 1.0).toFixed(num))).substring(1)+'</sup>');
			$(div).find('p.accuracy').text(this.inf.accuracy+'km aprox.');
			$(div).find('p.collector').text(this.inf.collector);
			$(div).find('p.precision').text(this.inf.accuracy+'KM');
			$("div#precision_slider").slider({value: this.inf.accuracy});
			
	
		  var pixPosition = this.getProjection().fromLatLngToDivPixel(this.latlng_);
		  if (pixPosition) {
			  div.style.left = (pixPosition.x + this.offsetHorizontal_) + "px";
			  div.style.top = (pixPosition.y + this.offsetVertical_) + "px";
		  }
			this.show();
		}


		MarkerTooltip.prototype.makeActive = function() {
			this.hide();
			makeActive(this.marker_id,false);
		}



		MarkerTooltip.prototype.deleteMarker = function() {
			this.hide();
			removeMarker(this.marker_id);
		}


		MarkerTooltip.prototype.hide = function() {
		  if (this.div_) {
		    var div = this.div_;
		    $(div).stop().animate({
		      top: '+=' + 15 + 'px',
		      opacity: 0
		    }, 100, 'swing', function(ev){
					div.style.visibility = "hidden";
				});
		  }
		}


		MarkerTooltip.prototype.show = function() {
		  if (this.div_) {
		    var div = this.div_;
				$(div).css({opacity:0});
				div.style.visibility = "visible";

		    $(div).stop().animate({
		      top: '-=' + 10 + 'px',
		      opacity: 1
		    }, 250, 'swing');
			}
		}



		MarkerTooltip.prototype.isVisible = function() {
		  if (this.div_) {
		    var div = this.div_;
		
				if ($(div).css('visibility')=='visible') {
					return true;
				} else {
					return false;
				}
			}
		}







