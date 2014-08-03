jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
jQuery.sap.require("sap.ui.core.routing.Router");
jQuery.sap.declare("ui5app.MyRouter");

sap.ui.core.routing.Router.extend("ui5app.MyRouter", {

    constructor : function() {
        sap.ui.core.routing.Router.apply(this, arguments);
        this._oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this);
        /*this.attachRouteMatched(function(){ // happen after rout view is loaded
            debugger;
        });*/
    },

    navTo: function(sName, oParameters, bReplace){
        // Here is the routing entry point for programmatic navigation (for lack of finding a better one).
        // Check for a name in this._oRoutes object. If it does not exist, try to create a view. On successful view creation
        // build a route with the view
        return sap.ui.core.routing.Router.prototype.navTo.call(this, sName, oParameters, bReplace || false);
    },

    getView: function(){
        // Here is te routing entry for a HashChange
        // TODO: chech hash for view by convention. If view exists create a simple route and navTo it. Make use of
        // conventional dir structure that distinguishes view by feature and have the convention route load the main/master view
        var hash = this.oHashChanger.getHash()
        return sap.ui.core.routing.Router.prototype.getView.apply(this, arguments);
    },

    myNavBack : function(sRoute, mData) {
        var oHistory = sap.ui.core.routing.History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();

        //The history contains a previous entry
        if (sPreviousHash !== undefined) {
            window.history.go(-1);
        } else {
            var bReplace = true; // otherwise we go backwards with a forward history
            this.navTo(sRoute, mData, bReplace);
        }
    },

    /**
     * Changes the view without changing the hash
     *
     * @param {object} oOptions must have the following properties
     * <ul>
     * 	<li> currentView : the view you start the navigation from.</li>
     * 	<li> targetViewName : the fully qualified name of the view you want to navigate to.</li>
     * 	<li> targetViewType : the viewtype eg: XML</li>
     * 	<li> isMaster : default is false, true if the view should be put in the master</li>
     * 	<li> transition : default is "show", the navigation transition</li>
     * 	<li> data : the data passed to the navContainers livecycle events</li>
     * </ul>
     * @public
     */
    myNavToWithoutHash : function (oOptions) {
        var oSplitApp = this._findSplitApp(oOptions.currentView);

        // Load view, add it to the page aggregation, and navigate to it
        var oView = this.getView(oOptions.targetViewName, oOptions.targetViewType);
        oSplitApp.addPage(oView, oOptions.isMaster);
        oSplitApp.to(oView.getId(), oOptions.transition || "show", oOptions.data);
    },

    backWithoutHash : function (oCurrentView, bIsMaster) {
        var sBackMethod = bIsMaster ? "backMaster" : "backDetail";
        this._findSplitApp(oCurrentView)[sBackMethod]();
    },

    destroy : function() {
        sap.ui.core.routing.Router.prototype.destroy.apply(this, arguments);
        this._oRouteMatchedHandler.destroy();
    },

    _findSplitApp : function(oControl) {
        sAncestorControlName = "idAppControl";

        if (oControl instanceof sap.ui.core.mvc.View && oControl.byId(sAncestorControlName)) {
            return oControl.byId(sAncestorControlName);
        }

        return oControl.getParent() ? this._findSplitApp(oControl.getParent(), sAncestorControlName) : null;
    }

});