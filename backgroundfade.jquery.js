(function( $ ){
	
	var methods = {
	
		init : function( options ) { 
			
			
			var settings = $.extend( {
				'dataName': 'g', 
				'linkSelector': '', 
				'start': 1
			    }, options);
			
			return this.each(function() {
				
				var $this = $(this), 
					data = $this.data(settings.dataName), 
					galleryItemIdentifier = $this.attr('id'), 
					activeLink = null, 
					activeImage = null;
				
				// Check if was called before on this item
				if(!data) {

					$('img', this).each(function() {
						
						var image = $(this), 
							datas = {
								'image': image.data('image')
							},
							attrs = {
								'class': galleryItemIdentifier, 
								'id': galleryItemIdentifier + '-' + datas.image
							}, 
							css = {
								'position': 'absolute'
							};
							
						
						// Check for background-size
						if(Modernizr.backgroundsize) {

							// Use background-size
							var newImage = $('<div />', attrs);

							newImage.css(css);
							newImage.css({
								'background-size': 'cover', 
								'background': 'url(\'' + image.attr('src') + '\') top left no-repeat', 
								'height': '300px', 
								'width': '400px', 
								'opacity': '0', 
								'-webkit-transition': 'opacity 1s linear',
								'-moz-transition': 'opacity 1s linear',
								'-ms-transition': 'opacity 1s linear',
								'-o-transition': 'opacity 1s linear',
								'transition': 'opacity 1s linear'
							});

							newImage.data(datas);

							image.hide();

							$this.append(newImage);
						
						}else {
							// Use fallback
							image.css(css);
							image.css({
								'display': 'none'
							});
							image.attr(attrs);
							image.data(datas);

						}
					});
					
					// Register links
					$(settings.linkSelector).click(function() {
						
						var link = $(this), 
							image = $('#' + galleryItemIdentifier + '-' + link.data('image'));
						
						if(activeLink && link[0] == activeLink[0]) {
							return;
						}			
						
						// Check for CSS transitions
						if(Modernizr.csstransitions) {

							// Use CSS transitions
							if(activeImage && activeLink) {
								
								activeImage.removeClass('active');
								activeLink.removeClass('active');
							}

						}else {
							// Use fallback
							
							if(activeImage && activeLink) {
								// Stop current Animations
								activeImage.stop(true, true);
								
								activeImage.fadeOut().removeClass('active');
								activeLink.removeClass('active');
							}
							
							image.fadeIn().addClass('active');
							link.addClass('active');
							
							activeLink = link;
							activeImage = image;
						}
						
						return false;
					}).first().click();

					$this.data(settings.dataName, {
						name: $this.attr('id')
					});
				}
			});
		}
	};

	$.fn.g = function( method ) {
    
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    	} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
    	} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.g' );
    	}    
  
	};

})( jQuery );