sap.ui.define([
		'sap/ui/core/mvc/Controller',
		'sap/ui/unified/CalendarLegendItem',
		'sap/ui/unified/DateTypeRange',
		'sap/ui/unified/library',
	], function(Controller, CalendarLegendItem, DateTypeRange, unifiedLibrary) {
	"use strict";

	var CalendarDayType = unifiedLibrary.CalendarDayType;
	var data;
	return Controller.extend("sap.ui.unified.sample.CalendarSpecialDaysLegend.CalendarSpecialDaysLegend", {
		
		 onInit : function () {
			this.byId('calendar').displayDate(
        		new Date(new Date().getFullYear().toString())
        	);
	        var oSpecialDates = this.getOwnerComponent().getModel('calendarSpecialDates').getData(),
        		oHolidays = oSpecialDates.querySelectorAll('holiday'),
        		oHolidayArray = new Array(),
        		oDaysArray = new Array();
        	oHolidays.forEach(element => {
        		oHolidayArray[element.id - 1] = element.getAttribute('title');
			});
	        var oDays = oSpecialDates.querySelectorAll('day');
        	oDays.forEach(element => {
        		const day = {
        			date: element.getAttribute('d'),
        			type: element.getAttribute('t'),
        			name: +element.getAttribute('h')
        		}
        		oDaysArray.push(day);
			});	        
    		var oCal = this.byId("calendar"),
				oLeg = this.byId("legend"),
				oRefDate;			
        	oDaysArray.forEach((day)=>{
        		oRefDate = new Date();
        		var date = day.date.split('.');
        		oRefDate.setMonth(+date[0]-1, +date[1]);
				oCal.addSpecialDate(new DateTypeRange({
					startDate : new Date(oRefDate),
					type : "Type0"+day.type,
					tooltip : day.name ? oHolidayArray[day.name-1] : null
				}));	        		
        	})
			oLeg.addItem(new CalendarLegendItem({
				text : "Государственные праздники"
			}));
			oLeg.addItem(new CalendarLegendItem({
				text : "Рабочий сокращенный"
			}));	        	 
    	},
	});
});
