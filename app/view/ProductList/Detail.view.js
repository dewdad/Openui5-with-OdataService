(function() {
  sap.ui.jsview("ProductList.Detail", {
    getControllerName: function() {
      return "ProductList.Detail";
    },
    createContent: function(oController) {
      var footer, info, tabs;
      this.page = new sap.m.Page({
        title: "Product Detail",
        showNavButton: true,
        navButtonPress: [oController.onNavBack, oController]
      });
      info = sap.ui.jsfragment("ProductList.ProductInfo", oController);
      tabs = new sap.m.IconTabBar({
        id: this.createId("tabs"),
        items: [
          new sap.m.IconTabFilter({
            key: "Supplier",
            text: "Supplier",
            icon: "sap-icon://supplier",
            content: [sap.ui.jsfragment("ProductList.SupplierAddressForm")]
          }), new sap.m.IconTabFilter({
            key: "Category",
            text: "Category",
            icon: "sap-icon://hint",
            content: [sap.ui.jsfragment("ProductList.CategoryInfoForm")]
          })
        ]
      });
      footer = sap.ui.jsfragment("ProductList.Footer", oController);
      this.page.addContent(info);
      this.page.addContent(tabs);
      this.page.setFooter(footer);
      return this.page;
    }
  });

}).call(this);
