sap.ui.define([
		'sap/ui/core/mvc/Controller',
		'sap/ui/unified/CalendarLegendItem',
		'sap/ui/unified/DateTypeRange',
		'sap/ui/unified/library',
		"sap/ui/model/json/JSONModel"
	], function(Controller, CalendarLegendItem, DateTypeRange, unifiedLibrary, JSONModel) {
	"use strict";

	var CalendarDayType = unifiedLibrary.CalendarDayType;
	var month, data;
	return Controller.extend("sap.ui.unified.sample.CalendarSpecialDaysLegend.CalendarSpecialDaysLegend", {
		onInit : function () {
			var oModel = new JSONModel();
			oModel.loadData("days.json");
			data = oModel;
    	},

		handleShowSpecialDays: function(oEvent) {
			var oCal = this.byId("calendar"),
				oLeg = this.byId("legend"),
				bPressed = oEvent.getParameter("pressed"),
			    startMonth = oCal.getStartDate().getMonth(),
				oRefDate;
			month = data.oData.months;
			if (bPressed) {
				oRefDate = new Date();
				month.forEach(element => {
					var lastName;
					element.days.forEach(day => {
						oRefDate.setMonth(element.month-1, day.date);
						
						
						if(day.name !== "Дополнительный выходной"){
							oCal.addSpecialDate(new DateTypeRange({
								startDate : new Date(oRefDate),
								type : "Type01",
								tooltip : day.name
							}));							
						}
						else{
							oCal.addSpecialDate(new DateTypeRange({
								startDate : new Date(oRefDate),
								type : "Type02",
								tooltip : day.name
							}));								
						}
						if(day.name !== "Дополнительный выходной"){
							if(lastName !== day.name){
								
							}
						}
						lastName = day.name;
					});
				});
				oLeg.addItem(new CalendarLegendItem({
					text : "Государственные праздники"
				}));
				oLeg.addItem(new CalendarLegendItem({
					text : "Дополнительные выходные"
				}));	
			} else {
				oCal.destroySpecialDates();
				oLeg.destroyItems();
			}
		}
	});

});