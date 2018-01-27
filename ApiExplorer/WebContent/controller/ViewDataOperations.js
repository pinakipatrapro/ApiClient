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
	ViewDataOperations.editEntry = function (oEvent,oConfigModel) {
		var source = oEvent.getSource();
		var bindingPath = source.getBindingContext().getPath();
		// var oModel = source.getModel();
		
		var data = this._ObjectPropertyToArray(source.getBindingContext().getObject());
		var dataSet = 
		oConfigModel.setData({editContext:{
			"properties" : data,
			"path" : bindingPath
		}},true);
		this._openEditDialog(oConfigModel);
				
	};
	ViewDataOperations._openEditDialog = function (oConfigModel){
		if(sap.ui.getCore().byId("displayDataEditDialog") != undefined){
			sap.ui.getCore().byId("displayDataEditDialog").destroy();
		};
		var oEditDialogFragment = sap.ui.xmlfragment("sap.pinaki.fragments.EditDialog");
		oEditDialogFragment.setModel(oConfigModel);
		sap.ui.getCore().byId('displayDataEditDialog').open();
	};
	ViewDataOperations._ObjectPropertyToArray = function(object){
		//Nested data operations not supported
		var aKeys = [];
		delete object["__metadata"];
		Object.keys(object).forEach(function(key) {
			var property = {};
			property.key=key;
			property.value=object[key];
			aKeys.push(property);
		});
		return aKeys;
	}
	return ViewDataOperations;
});
