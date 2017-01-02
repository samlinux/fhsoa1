

/**
 * when DOM is ready, start communicating with the API
 */
document.addEventListener("DOMContentLoaded", function() {
	getClimateData();
	setInterval(function() {
		getClimateData();
	}, 5000);
	document.getElementById("climate-meter").style.display = "block";
});

/**
 * GET climate data from API
 */
function getClimateData() {
    var xhr = new XMLHttpRequest(),
    	//requestURL = "http://fh.samlinux.at:49190/getLastValue";
    	requestURL = "http://localhost:3000/getLastValue";

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
        	if (xhr.status == 200)
            	processClimateData(JSON.parse(xhr.responseText).data);
            else
            	console.error("The API is not available!");
        }
    };

    xhr.open("GET", requestURL, true);
    xhr.send(null);
}

/**
 * Process data and manipulate DOM to display the processed data
 */
function processClimateData(data) {
	console.log(data);

	var _tempProzent = 0;
	data.temperature = 0;
	
	var climateMeterElement = document.getElementById("climate-meter"),
		climateStringElement = document.getElementById("climate-string"),
		climateBarElement = document.getElementById("climate-bar"),
		humidityElement = document.getElementById("humidity"),
		dateElement = document.getElementById("timestamp"),
		tempProzent, tempDisplayString, dateString;

	if (data.temperature){
		data.temperature = roundTwoDecimals(data.temperature);
	}
	
	tempProzent = 0;
	tempProzent = data.temperature ? data.temperature : 0;
	tempProzent = (tempProzent <= 97) ? tempProzent : 97;
	_tempProzent = tempProzent;
	tempProzent = tempProzent + "%";


	tempDisplayString = (data.temperature ? (data.temperature + " &#xB0;C") : "0 &#xB0;C").replace(".", ",");
	
	console.log(tempProzent);

	climateStringElement.style.bottom = tempProzent;
	climateStringElement.innerHTML = tempDisplayString;
	if(_tempProzent === 0){
		console.log('was');
		climateBarElement.style.height = '50%';	
	} 
	else if(_tempProzent < 0){
		climateBarElement.style.height = '50%';		
	}
	else {
		climateBarElement.style.height = tempProzent;
	}
	
	climateBarElement.style.height = tempProzent;

	if (data.timestamp)
		updateDateElement(dateElement, new Date(data.timestamp));
	else
		dateElement.style.display = "none";
}

/**
 * format and display the given date
 */
function updateDateElement(element, date) {
	var day = addZero(date.getDate()),
		month = addZero((date.getMonth() + 1)),
		year = addZero(date.getFullYear()),
		hours = addZero(date.getHours()),
		minutes = addZero(date.getMinutes()),
		seconds = addZero(date.getSeconds());

	element.style.display = "block";
	element.innerHTML = day + "." + month + "." + year + "  " + hours + ':' + minutes + ':' + seconds;
}

/**
 * add a zero, if the value is lower than 10 (for day and month values)
 */
function addZero(val) {
    if (val < 10) {
        val = "0" + val;
    }
    return val;
}

/**
 * round number to two decimals
 */
function roundTwoDecimals(number) {
    return +(Math.round(number + "e+2")  + "e-2");
}