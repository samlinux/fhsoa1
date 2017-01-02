/**
 * FoClimate
 *
 * @module public/FoClimate
 * @author rbole <rbole@samlinux.at>
 */
var FoClimate = function(){
	// starts the application
	this.init();
};

/**
 * starts the application
 * do the necessary bindings
 */
FoClimate.prototype.init = function(){
	var _this = this;
	// 
	var refreshIntervalInSeconds = 5;

	document.addEventListener("DOMContentLoaded", function() {
		_this.getClimateData();
		setInterval(function() {
			_this.getClimateData();
		}, (refreshIntervalInSeconds*1000));

	document.getElementById("climate-meter").style.display = "block";
	});
};

/**
 * gets the climate data
 */
FoClimate.prototype.getClimateData = function(){
	var _this = this;
	 var xhr = new XMLHttpRequest(),
    	requestURL = "http://fh.samlinux.at:49190/getLastValue";
    	//requestURL = "http://localhost:3000/getLastValue";

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
        	if (xhr.status == 200)
            	_this.processClimateData(JSON.parse(xhr.responseText).data);
            else
            	console.error("The API is not available!");
        }
    };

    xhr.open("GET", requestURL, true);
    xhr.send(null);
};

/**
 * prepares the received climate data
 */
FoClimate.prototype.processClimateData = function(data){

	var climateMeterElement = document.getElementById("climate-meter"),
		climateStringElement = document.getElementById("climate-string"),
		climateBarElement = document.getElementById("climate-bar"),
		humidityElement = document.getElementById("humidity"),
		dateElement = document.getElementById("timestamp"),
		tempProzent, tempDisplayString, humidityDisplayString, humidity, dateString;

	// temperature	
	if (data.temperature){
		data.temperature = this.roundTwoDecimals(data.temperature);
	}
	tempProzent = this.calcTemperatureBar(data.temperature);
	tempDisplayString = (data.temperature ? (data.temperature + " &#xB0;C") : "0 &#xB0;C").replace(".", ",");
	
	// display humidity
	humidity = this.roundTwoDecimals(data.humidity);
	humidityDisplayString = (humidity ? (humidity + " %") : "0 %").replace(".", ",");

	climateStringElement.style.bottom = tempProzent;
	climateStringElement.innerHTML = tempDisplayString;
	humidityElement.innerHTML = humidityDisplayString; 	
	climateBarElement.style.height = tempProzent;

	
	if (data.timestamp){
		this.updateDateElement(dateElement, new Date(data.timestamp));
	}
	else{
		dateElement.style.display = "none";
	}
};

FoClimate.prototype.updateDateElement = function(element, date){
	var day = this.addZero(date.getDate()),
		month = this.addZero((date.getMonth() + 1)),
		year = this.addZero(date.getFullYear()),
		hours = this.addZero(date.getHours()),
		minutes = this.addZero(date.getMinutes()),
		seconds = this.addZero(date.getSeconds());

	element.style.display = "block";
	element.innerHTML = day + "." + month + "." + year + "  " + hours + ':' + minutes + ':' + seconds;
};

/**
 * add a zero, if the value is lower than 10 (for day and month values)
 */
FoClimate.prototype.addZero = function(val){
	if (val < 10) {
        val = "0" + val;
    }
    return val;
};

/**
 * Round number to two decimals
 */
FoClimate.prototype.roundTwoDecimals = function(number){
	return +(Math.round(number + "e+2")  + "e-2");
};

/**
 * this is the tricky part
 * get the hight of the bar in percent from min and max
 */
FoClimate.prototype.calcTemperatureBar = function(cValue){
	// max temperature range
	var hV = 60;

	// min temperature range
	var lV = -30;
	
	var cV = cValue, bV = 0;
	
	if(cV < lV){
		bV = 0;
	}
	else if (cV > hV){
		// 97 is because of the display
		bV = 97;
	}
	else {
		bV = ((cV - lV) * 97) / (hV - lV);	
	}

	bV += '%';
	//console.log('test',bV);
	return bV;

};

//---------------------------------
//Start the fontend application
//---------------------------------
var _foClimate = new FoClimate();
_foClimate.init();
