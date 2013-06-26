/*****************************************************
 * Initialization and Type Declarations
 *****************************************************/

/**
 * StackMob Init
 */
StackMob.init({
	publicKey: '2109fd4e-35b1-4d0b-a6b8-be290fa0bd09',
	apiVersion : 0
});

/**
 * Data Types
 */
var Data = StackMob.Model.extend({
	schemaName : 'data'
});

/**
 * Data Collection Type
 */
var Datas = StackMob.Collection.extend({
	model : Data
});

/*****************************************************
 * Custom Functions
 *****************************************************/

/**
 * validateForm()
 * Validates the form and verifies required fields
 */
function validateForm() {
	 console.debug("Validating form");
	 /*
	 .
	 .
	 */
 }

/**
 * submitForm()
 * Submits the form to StackMob
 */
function submitForm() {
 
	var data = new Data({
		singleline: document.getElementById("singleLine").value,
		multiline:  document.getElementById("multiLine").value,
		list:       document.getElementById("list").value,
		radioone:   document.getElementById("radioOne").checked,
		radiotwo:   document.getElementById("radioTwo").checked,
		integer:    document.getElementById("integer").value,
		date:       document.getElementById("date").value
	});//above keys must remain lowercase
	
	data.create({
		success: function(model, result, options) {
			//console.debug(model.toJSON());
			document.getElementById("debugOutput").innerHTML = "<h3 class='text-success'>Success!</h3>";
		},
		error: function(model, error, options) {
			//console.debug(error);
			document.getElementById("debugOutput").innerHTML = "<h3 class='text-error'>Failure!</h3>";
		}
	});
}

/**
 * refreshTable()
 * Refreshes the data entry table
 */
function refreshTable() {

	//clear table
	document.getElementById("tableBody").innerHTML = "";

	//create query by creation date
	var q = new StackMob.Collection.Query();
	q.orderAsc('createddate');
	
	//execute query
	var list = new Datas();
	list.query(q, {
		success: function(collection) {
		
		var array = collection.toJSON();

	  	for (var i = 0; i < list.length; i++)
	  		document.getElementById("tableBody").innerHTML += createRow(array[i]);
		},
		error: function() {
  			document.getElementById("tableBody").innerHTML = "<h2 class='text-error'>Failed to refresh..</h2>"
		}
	});
}

/**
 * createRow(item)
 * Creates a row for the table
 * @return string of html markup for the row
 */
function createRow(item) {
	var str = "<tr id='" + item.data_id + "'>";
	
	str += "<td> <i class='icon-remove'> </td>";
	str += "<td>" + item.singleline   + "</td>";
	str += "<td>" + item.multiline    + "</td>";
	str += "<td>" + item.list         + "</td>";
	str += "<td>" + item.radioone     + "</td>";
	str += "<td>" + item.radiotwo     + "</td>";
	str += "<td>" + item.integer      + "</td>";
	str += "<td>" + item.date         + "</td>";
	str += "</tr>";
	
	/* console.debug(str); */
	return str;
}


/**
 * deleteRow(id)
 * Deletes the selected row from the table using the stackmob id
 */
function deleteRow(id) {
	 console.debug("Deleting row with id of" + id);
	 /*
	 .
	 .
	 */
 }

/*****************************************************
 * Document Ready
 *****************************************************/

$(document).ready(function() {

	//populate the table
	refreshTable();
	
	//setup submit button
	$("#submitButton").on("click", function() {
		validateForm();
		submitForm();
		refreshTable();
	});
	
	//setup refresh button
	$("#refreshButton").on("click", function() {
		refreshTable();
	});

});
