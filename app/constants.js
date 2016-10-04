(function() {
    /*constants declaration*/
    const DIR_PATH = "directives/";
    const SERVICES_PATH = "services/";
    const FILTERS_PATH = "filters/";
    const CTRL_PATH = "controllers/";
    const PAGE_PATH = "views/";
	/*array containing all filepaths*/
	var FILE_PATHS = [
        CTRL_PATH + "common-controller.js",
        SERVICES_PATH + "mainService.js",
        DIR_PATH + "color/colorDirective.js",
        DIR_PATH + "version/version.js",
        DIR_PATH + "version/versionDirective.js",
        FILTERS_PATH + "filters.js",

        PAGE_PATH + "stats/stats.js",
        PAGE_PATH + "stats/stat_charts.js",
        PAGE_PATH + "form/form.js",
        PAGE_PATH + "login/login.js",
    ];
    /*document.body.appendChild() doesn't seem to work well: use document.write instead*/
     FILE_PATHS.forEach(function(filePath) {
        document.write("<script src='" + filePath + "'></script>");
    });
})();
