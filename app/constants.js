(function() {
    const DIR_PATH = "directives/";
    const SERVICES_PATH = "services/";
    const FILTERS_PATH = "filters/";
    const CTRL_PATH = "controllers/";
    const PAGE_PATH = "views/";
    var FILE_PATHS = [
        CTRL_PATH + "appController.js",
        SERVICES_PATH + "mainService.js",
        DIR_PATH + "color/colorDirective.js",
        DIR_PATH + "version/version.js",
        DIR_PATH + "version/versionDirective.js",
        FILTERS_PATH + "filters.js",

        PAGE_PATH + "stats/stats.js",
        PAGE_PATH + "form/form.js",

    ];
    angular.forEach(FILE_PATHS, function(filePath, index) {
        document.write("<script src='" + filePath + "'></script>");
    });
})();
