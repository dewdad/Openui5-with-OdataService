(function () {
    jQuery.sap.declare("ui5app.Component");
    jQuery.sap.require("ui5app.MyRouter");

    sap.ui.core.UIComponent.extend("ui5app.Component", {
        metadata: {
            name : "TDG Demo App",
            version : "1.0",
            includes : [],
            dependencies : {
                libs : ["sap.m", "sap.ui.layout"],
                components : []
            },
            config : {
                viewType: "JS"
                /*resourceBundle : "i18n/messageBundle.properties",
                 serviceConfig : {
                 name : "Northwind",
                 serviceUrl : "/uilib-sample/proxy/http/services.odata.org/V2/(S(sapuidemotdg))/OData/OData.svc/"
                 }*/
            },

            rootView :{id: "app", viewName: "view.App", type: "JS"},

            routing: {
                config: {
                    routerClass : ui5app.MyRouter, // optional
                    viewType: "JS",
                    viewPath: "view",
                    targetControl: "appConteiner",
                    clearTarget: false,
                    transition: "slide",
                    targetAggregation: "pages"
                },
                routes: [
                    {
                        pattern: "",
                        name: "Home",
                        view: "Home",
                        viewType: "XML"
                        /*subroutes: [{
                            pattern : "{page}/:part:",
                            name : "Tab",
                            view : "Tab"
                        }]*/
                    },
                 /* {
                    pattern: "Product",
                    name: "Product",
                    view: "Product.Master"
                  },
                  {
                    pattern: "Product/{id}",
                    name: "Product.Detail",
                    view: "Product.Detail"
                  },*/

                    {
                        pattern: ":all*:",
                        name: "NotFound",
                        view: "NotFound"
                    }/*,
                    {
                        pattern: "Form354",
                        name: "Form354",
                        view: "Form354.Master",
                        viewType: "XML"
                    }*/
                ]
            }
        },
        init: function () {
            var busy, endpoint, router;
            jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
            sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

            // Init Router
            /*this.routeHandler = new sap.m.routing.RouteMatchedHandler(this.getRouter());*/
            this.getRouter().initialize();

            endpoint = sap.ui.model.odata.ODataModel("/V2/Northwind/Northwind.svc/", true);
            this.setModel(endpoint);
            busy = new sap.m.BusyDialog({
                title: "Loading data"
            });
            endpoint.attachRequestSent(function () {
                return busy.open();
            });
            return endpoint.attachRequestCompleted(function () {
                return busy.close();
            });
        },
        destroy: function () {
            /*if (this.routeHandler) {
                this.routeHandler.destroy();
            }*/
            this.getRouter().destroy();
            return sap.ui.core.UIComponent.prototype.destroy.apply(this, arguments);
        }/*,
        createContent: function () {
            var view;
            view = sap.ui.view({
                id: "app",
                viewName: "view.App",
                type: "JS",
                viewData: {
                    component: this
                }
            });
            return view;
        }*/
    });

}).call(this);
