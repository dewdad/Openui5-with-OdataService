(function() {
  sap.ui.jsview("ProductList.Master", {
    getControllerName: function() {
      return "ProductList.Master";
    },
    createContent: function(oController) {
      var footer, list;
      this.page = new sap.m.Page({
        title: "Product List"
      });
      list = sap.ui.jsfragment("ProductList.SearchList", oController);
      footer = sap.ui.jsfragment("ProductList.Footer", oController);
      this.page.addContent(list);
      this.page.setFooter(footer);
      return this.page;
    }
  });

}).call(this);
