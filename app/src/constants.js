(function() {
    /*constants declaration*/
    const DIR_PATH = "directives/";
    const SERVICES_PATH = "services/";
    const FILTERS_PATH = "filters/";
    const CTRL_PATH = "controllers/";
    const PAGE_PATH = "views/";
	/*array containing all file paths*/
	var FILE_PATHS = [
        CTRL_PATH + "common.controller.js",
        CTRL_PATH + "stats.controller.js",
        CTRL_PATH + "form.controller.js",
        CTRL_PATH + "login.controller.js",

        SERVICES_PATH + "mainService.js",

        DIR_PATH + "color/color.directive.js",
        DIR_PATH + "version/version.js",
        DIR_PATH + "version/version.directive.js",

        FILTERS_PATH + "filters.js",

        PAGE_PATH + "stats/stat_charts.js",

    ];
    /*document.body.appendChild() doesn't seem to work well: use document.write instead*/
     FILE_PATHS.forEach(function(filePath) {
        document.write("<script src='" + filePath + "'></script>");
    });
})();