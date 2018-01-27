sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	var ViewDataOperations = Controller.extend("sap.pinaki.controller.ViewDataOperations", {

	});
	ViewDataOperations.deleteEntry = function (oEvent) {
		var source = oEvent.getSource();
		var bindingPath = source.getBindingContext().getPath();
		var oModel = source.getModel();
		oModel.remove(bindingPath, {
			method: "DELETE",
			success: function (data) {
				alert("success");
			},
			error: function (e) {
				alert("error");
			}
		});
	}
	return ViewDataOperations;
});
