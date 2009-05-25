/*
* 
*	Project:			Paged List
*
*	Version:			1.0 (25th May 2009)
*
* 	Author:				Rolled by Losource (losource.net)
*
*	Description:		Page any list element by {pageSize}. Adds page controls.
*
*	License:			GNU General Public License
*
*	Copyright:			2009 Andrew Flannery
*
*	This program is free software: you can redistribute it and/or modify
*	it under the terms of the GNU General Public License as published by
*	the Free Software Foundation, either version 3 of the License, or
*	(at your option) any later version.
*
*	This program is distributed in the hope that it will be useful,
*	but WITHOUT ANY WARRANTY; without even the implied warranty of
*	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*	GNU General Public License for more details.
*
*	You should have received a copy of the GNU General Public License
*	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
*/

(function($) {
	$.fn.pagedlist = function(options) {		
		// Default options
		var defaults = {
			pageSize: 6,
			itemInView: 0,
			navElementClass: 'paged-list-nav',
			navBackClass: 'paged-list-back-link',
			navMoreClass: 'paged-list-more-link',
			backText: '&lt;&lt; Back',
			moreText: 'More &gt;&gt;'
		};
		
		// Merge with user-defined options
		$.fn.pagedlist.options = $.extend(defaults, options);
		
		return this.each(function() {
			var options = $.fn.pagedlist.options;
			var pagedlist = $(this);
			var listTotal = $(pagedlist).children('li').hide().addClass('hidden').length;
			var listPages = Math.ceil(listTotal/options.pageSize);
			var currentPage = 0;

			if (options.itemInView) {
				var iInView = $(pagedlist).find('li').index($(options.itemInView));
				currentPage = Math.floor((iInView)/options.pageSize);
			}
						
			if (listPages>0) {
				//add the controls
				var elNavRow = $('<li class="' + options.navElementClass + '"></li>');
				var elBack = $('<a class="' + options.navBackClass + '" href="#">' + options.backText + '</a>');
				var elMore = $('<a class="' + options.navMoreClass + '" href="#">' + options.moreText + '</a>');
				$(elNavRow).appendTo(this);
				$(elBack).appendTo(elNavRow);
				$(elMore).appendTo(elNavRow);
				
				changePage(pagedlist, currentPage, options.pageSize, listTotal, elBack, elMore, options.navElementClass);
				
				$(elBack).click(function() {
					currentPage = currentPage - 1;
					changePage(pagedlist, currentPage, options.pageSize, listTotal, elBack, elMore, options.navElementClass);
					return false;
				});
				
				$(elMore).click(function() {
					currentPage = currentPage + 1;
					changePage(pagedlist, currentPage, options.pageSize, listTotal, elBack, elMore, options.navElementClass);
					return false;
				});
			}	
		});
	};
	
	/*
		Internal functions
	*/
	
	function changePage(list, newpage, pageSize, totalitems, elBack, elMore, navElementClass) {
		var listPages = Math.ceil(totalitems/pageSize);
		var startItem = newpage*pageSize;
		var endItem = (newpage*pageSize) + (pageSize-1);
		
		//iterate through showing and hiding the right things
		$(list).children('li').each(function(i) {
			if (!$(this).hasClass(navElementClass)) {
				if ((i>=startItem)&&(i<=endItem)) {
					$(this).addClass('visible').removeClass('hidden');
				} else {
					$(this).addClass('hidden').removeClass('visible');
				}
				
				$(list).children('.hidden').hide();
				$(list).children('.visible').fadeIn();		
			}
		});
		
		//deal with the controls
		if (newpage==0) {
			$(elBack).hide();
		} else {
			$(elBack).fadeIn();
		}
		
		if (newpage==listPages-1) {
			$(elMore).hide();
		} else {
			$(elMore).fadeIn();
		}
	}
	
	// Persistent options object
	$.fn.pagedlist.options = {};
	
})(jQuery); 	