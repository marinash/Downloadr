/*!
 * Flickr Downloadr
 * Copyright: 2007-2015 Sondre Bjellås. http://sondreb.com/
 * License: MIT
 */

'use strict';

(function () {

	var directives = angular.module('downloadr.directives', []);

	directives.directive('appVersion', ['version',
		function (version) {
			return function (scope, elm, attrs) {
				elm.text(version);
			};
  }]);

	/*
  This directive allows us to pass a function in on an enter key to do what we want.
   */
	directives.directive('ngEnter', ['$rootScope', '$location', '$timeout', function ($rootScope, $location, $timeout) {
		return function (scope, element, attrs) {
			element.bind('keydown keypress', function (event) {
				if (event.which === 13) {

					$timeout(function () {

						//if (attrs.ngEnter != null && $location.path() != attrs.ngEnter) {
						// First make sure we navigate to the page.
						//	$location.path(attrs.ngEnter);
						//}

						$rootScope.performSearch();

						// This should check for both undefined and null.
						//if (scope.eventHandler != null) {
						// If there is any event handler defined on the directive
						// call the function.
						//	scope.eventHandler();
						//}

					}, 0);

					event.preventDefault();
				}
			});
		};
	}]);

	// This directive is used to show the search input with options dropdown
	// and the search icon/button.
	directives.directive('search', ['$location', function ($location) {

		return {
			restrict: 'E',
			scope: {
				class: '@',
				value: '=',
				target: '@',
				eventHandler: '&ngSearch'
			},
			templateUrl: 'views/template_search.html',
			link: function ($scope, element, attrs) {

				// Click Handler handles when user clicks the
				// search button, then we will navigate and perform search.
				$scope.clickHandler = function () {
					console.log('CLICK HANDLER FOR DIRECTIVE!!');

					if ($scope.target !== null) {
						$location.path($scope.target);
					}

					if ($scope.eventHandler !== null) {
						// If there is any event handler defined on the directive
						// call the function.
						$scope.eventHandler();
					}
				};
			}
		};
	}]);

	directives.directive('justified', ['$timeout',
		function ($timeout) {
			return {
				restrict: 'AE',
				link: function (scope, el, attrs) {
					scope.$watch('$last', function (n, o) {
						if (n) {
							//$timeout(function () { $(el[0]).justifiedGallery(); });
						}
					});
				}
			};
  }]);

	directives.directive('repeatDone', [
		function () {
			return {
				restrict: 'A',
				link: function (scope, element, iAttrs) {
					var parentScope = element.parent().scope();
					if (scope.$last) {
						parentScope.$last = true;
					}
				}
			};
    }]);

	directives.directive('navMenu', ['$location', function ($location) {
		return function (scope, element, attrs) {
			var links = element.find('a'),
				onClass = attrs.navMenu || 'on',
				routePattern,
				link,
				url,
				currentLink,
				urlMap = {},
				i;

			if (!$location.$$html5) {
				routePattern = /^#[^/]*/;
			}

			for (i = 0; i < links.length; i++) {
				link = angular.element(links[i]);
				url = link.attr('href');

				if (url === null || url === undefined) {
					continue;
				}

				if ($location.$$html5) {
					urlMap[url] = link;
				} else {
					urlMap[url.replace(routePattern, '')] = link;
				}
			}

			scope.$on('$routeChangeStart', function () {
				var pathLink = urlMap[$location.path()];

				if (pathLink) {
					if (currentLink) {
						currentLink.removeClass(onClass);
					}
					currentLink = pathLink;
					currentLink.addClass(onClass);
				} else // If user clicks logo or search, etc.
				{
					if (currentLink) {
						currentLink.removeClass(onClass);
					}
				}
			});
		};
	}]);

	directives.directive('thumb', function () {

		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			require: '',
			scope: {
				ngModel: '=',
				onSend: '&',
				fromName: '@',
				url: '@',
				view: '='
			},
			template: '<div><div ng-transclude></div>Result: {{view.name}} {{view.value}} {{ngModel}}</div>',
			link: function (scope, iElement, iAttrs) {

				console.dir(scope);
				console.dir(iElement);
				console.dir(iAttrs);

			}
		};

	});


	directives.directive('icon', function () {

		return {
			restrict: 'E',
			replace: true,
			scope: {
				icon: '@',
				size: '@'
			},
			templateUrl: 'views/template_icon.html'
		};
	});

	
	directives.directive('windowIcon', function () {

		return {
			restrict: 'E',
			replace: false,
			scope: {
				icon: '@',
				size: '@'
			},
			templateUrl: 'views/template_window_icon.html'
		};
	});

})();