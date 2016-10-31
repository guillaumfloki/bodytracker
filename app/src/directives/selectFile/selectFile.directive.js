(function () {
	'use strict';
	var app = angular.module('btApp');
	app.directive('btDraggable', function () {
		return {
			link: function (scope, element, attrs) {
				var target = element;

				function handleFiles(files) {
					if (typeof files != 'undefined') {

						var settings = {
							form: document.forms[0],
							rerturnAction: function(){return this.form.getAttribute('image-action')},
							rerturnMethod: function(){return this.form.getAttribute('image-method')},
							dataType: 'json',
							cache: false
						};
						var inputFile;
						for (var i = 0, l = files.length; i < l; i++) {
							var file = files[i];
							var imageType = /^image\//;
							if (!imageType.test(file.type)) {
								continue;
							}
							// insert image
							var img = document.createElement('img');
							img.classList.add('obj');
							img.src = window.URL.createObjectURL(file);
							img.style.width = "100%";
							img.onload = function () {
								window.URL.revokeObjectURL(this.src);
							};
							target.empty().append(img);

							// insert file name
							var p = document.createElement('p');
							p.innerHTML = file.name;
							p.classList.add('c-dropbox__image-name');
							target.next('.c-dropbox__image-name').remove();
							target.after(p);

							var reader = new FileReader();
							reader.onload = (function (aImg) {
								return function (e) {
									aImg.src = e.target.result;
								};
							})(img);
							reader.readAsDataURL(file);
							var ajaxData = new FormData(document.forms[0]);
							angular.forEach(document.forms[0].getElementsByTagName('input'), function (input, index) {
								if (input.type == 'file') {
									ajaxData.append(angular.element(input).attr('name'), file);
									ajaxData.append('user', JSON.parse(localStorage.getItem('currentUser')).id);
								}
							});

							$.ajax({
								url: settings.rerturnAction(),
								type: settings.rerturnMethod(),
								dataType: settings.dataType,
								data: ajaxData,
								cache: settings.cache,
								contentType: false,
								processData: false,
								success: function(data){
									//console.log(data.responseText);
								}
							});
							if(element.hasClass("c-dropbox--over")) element.removeClass("c-dropbox--over");
						}
					}
				} //end of handleFiles() fn
				function dragenter(e) {
					e.stopPropagation();
					e.preventDefault();
				}

				function dragover(e) {
					e.stopPropagation();
					e.preventDefault();
					element.addClass("c-dropbox--over");
				}
				function dragleave(e) {
					e.stopPropagation();
					e.preventDefault();
					if(element.hasClass("c-dropbox--over")) element.removeClass("c-dropbox--over");
				}
				function drop(e) {
					e.stopPropagation();
					e.preventDefault();
					var dt = e.dataTransfer || e.originalEvent.dataTransfer;
					var files = dt.files;
					handleFiles(files);
				}

				element
					.bind('dragenter', dragenter)
					.bind('dragover', dragover)
					.bind('dragleave', dragleave)
					.bind('drop', drop);
			}
		}
	})
})();