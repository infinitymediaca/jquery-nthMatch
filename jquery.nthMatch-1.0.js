/*
* jQuery nth-match Filter
* https://github.com/infn8/
*
* Author: Arron Gibson
* eMail: arron@infinitymedia.ca
*
* Copyright 2014, Infinity Media Services Inc.
* GNU GENERAL PUBLIC LICENSE
* http://www.gnu.org/licenses/gpl.txt
*/
(function( $ ){
	var methods = {
		init : function (eq, options) {
			eq = eq.toLowerCase() == 'even' ? '2n' : eq;
			eq = eq.toLowerCase() == 'odd' ? '2n+1' : eq;
			regex = /([+-]?\d*)(n?)([+-]?\d*)/,
			sections = eq.match(regex);
			sections[1] = sections[1] == '-' ? '-1' : sections[1]; 
			var m = sections[1] ? parseInt(sections[1]) : 0, 
				// m = multiplier: integer
			s = sections[3] ? parseInt(sections[3]) : 0,
				// s = scalar for addition: integer
			hasN = sections[2] == 'n',
				// hasN = boolean of n's existance in equation.
			count = this.length; // the length of the jQuery wrapped set.
			return this.filter(function (index) {
				// In CSS the nth-child index is 1 based and in jQuery.fn.filter the index is is 0 based so...
				var ci = index + 1; // ci = CSS Index
				var didMatch = false; // start by assuming it's not a match.
				if(!hasN && (ci == (m||s))){
					didMatch = true; // is a scalar match 
				} else if(hasN && count){
					for (var n = 0; n <= count; n++) {
						if (ci == (m * n +  s)) {
							didMatch = true; // the equation matches.
						}
					};
				}
				return didMatch; // jQuery.fn.filter will keep any elements where the function returns true and removes those when it returns false.  this will remove any non matches from the wrapped set.
			});
		}
	};
	if(typeof $.fn.nthMatch == 'undefined'){ // guards against the function having been already declared.
		$.fn.nthMatch = function(method) {
			if ( methods[method] ) {
				return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else if ( typeof method === 'object' || ! method || typeof method === 'string') {
				return methods.init.apply( this, arguments );
			} else {
				$.error( 'Method ' +  method + ' does not exist on jQuery.filters' );
			}	
		};
	}
})(jQuery);
