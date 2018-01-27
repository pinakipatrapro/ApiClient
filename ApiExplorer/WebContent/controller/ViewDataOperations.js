sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller,MessageToast) {
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
				var msg = 'Entry deleted successfully';
				MessageToast.show(msg);
			},
			error: function (e) {
				var msg = 'Error while deleting entry';
				MessageToast.show(msg);
			}
		});
	};
	ViewDataOperations.editEntry = function (oEvent) {
		var source = oEvent.getSource();
		var bindingPath = source.getBindingContext().getPath();
		var oModel = source.getModel();
		oModel.remove(bindingPath, {
			method: "DELETE",
			success: function (data) {
				var msg = 'Entry deleted successfully';
				MessageToast.show(msg);
			},
			error: function (e) {
				var msg = 'Error while deleting entry';
				MessageToast.show(msg);
			}
		});
	};
	return ViewDataOperations;
});
