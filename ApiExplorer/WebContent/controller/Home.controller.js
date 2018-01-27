sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/pinaki/controller/BaseController"
], function(Controller,JSONModel,BaseController) {
	"use strict";
	var oData = {
		'mainlUrl' : 'http://services.odata.org/V2/OData/OData.svc/'	
	};
	var oConfigModel = new JSONModel(oData);
	
	return BaseController.extend("sap.pinaki.controller.Home", {
		onAfterRendering : function(){
			this.getView().setModel(oConfigModel,'idConfigModel');
		},
		onLoadUrlPress : function(oEvent){
			var url = oConfigModel.getProperty('/mainlUrl');
			var oModel = new sap.ui.model.odata.ODataModel(url,{
				headers : {"sap-stastics":"true"}
			});
			oModel.attachRequestCompleted(function(a,b,c){
				
			});
			oModel.attachMetadataLoaded(this.serviceInitialized(oConfigModel,oModel));
			this.getView().setModel(oModel)
		},
		serviceInitialized : function(oConfigModel,oMainModel){
			oConfigModel.setData({metadata:oMainModel.getServiceMetadata().dataServices.schema[0].entityContainer[0]},true)
		},
		openDisplayDataDialog : function(oEvent){
			if(sap.ui.getCore().byId('displayDataDialog') != undefined){
				sap.ui.getCore().byId('displayDataDialog').destroy();
			}
			var bindingContext = oEvent.getSource().getParent().getContent()[0].getProperty('text');
			var oDialogFragment = sap.ui.xmlfragment("sap.pinaki.fragments.ViewData",this);
            this.getView().addDependent(oDialogFragment);
            var smartTable = sap.ui.getCore().byId('displayDataDialogTable');
            var smartFilter = sap.ui.getCore().byId('smartFilterBar');
            
            
            smartFilter.setEntityType(bindingContext);
            
            smartTable.setEntitySet(bindingContext);
            smartTable.addEventDelegate({
            	"onAfterRendering": function () {
            		setTimeout(function(){sap.ui.getCore().byId('__error0').destroy()},0)
            	}
            }, this);
            sap.ui.getCore().byId('displayDataDialog').open();
		},
		closeDataDialog : function(oEvent){
			oEvent.getSource().getParent().getParent().close();
			oEvent.getSource().getParent().getParent().destroy();
		},
		onPanelSearch : function(oEvent){
			var searchValue = oEvent.getSource().getValue();
			oEvent.getSource().getParent().getParent().getBinding('items').filter(new sap.ui.model.Filter('name','Contains',searchValue))
		},
		openFunctionExportExplorePanel:function(oEvent){
			if(sap.ui.getCore().byId('"idExploreFI"') != undefined){
				sap.ui.getCore().byId('"idExploreFI"').destroy();
			};
			var bindingContext = oEvent.getSource().getParent().getContent()[0].getBinding('text').getContext();
			var oFIExplorerDialogFragment = sap.ui.xmlfragment("sap.pinaki.fragments.FunctionImportExplorer",this);
			sap.ui.getCore().byId('idExploreFI').setBindingContext(bindingContext)
			sap.ui.getCore().byId('idExploreFI').open();
			oFIExplorerDialogFragment.setModel(oConfigModel);
		},
		callFunctionImport : function(oEvent){
			var bindedObject = oEvent.getSource().getBindingContext().getObject();
			var oModel = this.getView().getModel();
			var method = bindedObject.httpMethod;
			var path = bindedObject.name;
			//Get Parameters
			var urlParameters = {};
			var tableItems = sap.ui.getCore().byId('idFIParametersTable').getItems();
			for(var i=0;i<tableItems.length;i++){
				urlParameters[tableItems[i].mAggregations.cells[0].getProperty('text')]=tableItems[i].mAggregations.cells[1].getProperty('value');
			}
			this.callFuncImp(oModel,method,path,urlParameters).then(function(oData,response){
				var successPanel = sap.ui.getCore().byId('idFISuccessPanel');
				var data = successPanel.getBindingContext().getObject();
				data["oSuccess"] = oData; 
				oConfigModel.setProperty(successPanel.getBindingContext().sPath,data);
				successPanel.setVisible(true);
			}).catch(function(oError){
				var errorPanel = sap.ui.getCore().byId('idFIErrorPanel');
				errorPanel.setVisible(true);
				var data = errorPanel.getBindingContext().getObject();
				data["oError"] = oError; 
				oConfigModel.setProperty(errorPanel.getBindingContext().sPath,data);
			});
			
		}
	});
});