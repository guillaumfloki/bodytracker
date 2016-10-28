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
							action: function(){return this.form.getAttribute('image-action')},
							method: function(){return this.form.getAttribute('image-method')},
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
							p.classList.add('image-name');
							target.next('.image-name').remove();
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
								url: settings.action(),
								type: settings.method(),
								dataType: settings.dataType,
								data: ajaxData,
								cache: settings.cache,
								contentType: false,
								processData: false,
								success: function(data){
									console.log(data.responseText);
								}
							});
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
					.bind('drop', drop);
			}
		}
	})
})();