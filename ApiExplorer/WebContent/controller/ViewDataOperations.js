sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller,MessageToast) {
	"use strict";

	var ViewDataOperations = Controller.extend("sap.pinaki.controller.ViewDataOperations", {

	});
	ViewDataOperations.closeDataDialog = function(oEvent){
		oEvent.getSource().getParent().getParent().close();
		oEvent.getSource().getParent().getParent().destroy();
	};
	ViewDataOperations.closeEditDialog = function(oEvent){
		oEvent.getSource().getParent().close();
		oEvent.getSource().getParent().destroy();
	};
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
		
		oConfigModel.setData({editContext:{
			"properties" : data,
			"path" : bindingPath
		}},true);
		this._openEditDialog(oConfigModel);
				
	};
	ViewDataOperations.createEntry = function (oEvent,oConfigModel) {
		
		try{
			var sampleObject = oEvent.getSource().getParent().getContent()[1].getItems()[1].getItems()[0].getBindingContext().getObject()
			var data = this._ObjectPropertyToArray(sampleObject);
		}catch(e){
			alert('Please fetch the data first by pressing GO !!')
		};
		oConfigModel.setData({createContext:{
			"properties" : data
		}},true);
		this._openEditDialog(oConfigModel);
				
	};
	ViewDataOperations._openEditDialog = function (oConfigModel){
		if(sap.ui.getCore().byId("displayDataEditDialog") != undefined){
			sap.ui.getCore().byId("displayDataEditDialog").destroy();
		};
		var oEditDialogFragment = sap.ui.xmlfragment("sap.pinaki.fragments.EditDialog",this);
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
