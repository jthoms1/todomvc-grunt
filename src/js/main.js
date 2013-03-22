require([
    'backbone',
    'views/app',
    'routers/router'
], function (Backbone, AppView, Workspace) {
	"use strict";

    // Initialize routing and start Backbone.history()
    new Workspace();
    Backbone.history.start();

    // Initialize the application view
    new AppView();
});