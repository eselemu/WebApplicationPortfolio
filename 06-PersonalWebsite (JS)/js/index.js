function setTask(e){
    e.preventDefault();
    var date = $("#date").val();
    var timeStart = $("#time_start").val();
    var timeEnd = $("#time_end").val();
    var activity = $("#activity").val();
    var place = $("#place").val();
    var type = $("#type").val();
    var notes = $("#notes").val();
    var free = $("#free").prop("checked");

    var newRow = $("<tr>");

    // Populate the row with the data
    newRow.append("<td>" + date + "</td>");
    newRow.append("<td>" + timeStart + "</td>");
    newRow.append("<td>" + timeEnd + "</td>");
    newRow.append("<td>" + activity + "</td>");
    newRow.append("<td>" + place + "</td>");
    newRow.append("<td>" + type + "</td>");
    newRow.append("<td>" + notes + "</td>");
    newRow.append("<td>" + (free ? "<img src = './imgs/free.png' alt='free-icon' width = '50vw' height = '50vh'/>" : 
    "<img src = './imgs/busy.png' alt='busy-icon' width = '50vw' height = '50vh'/>") + "</td>");

    // Append the new row to the table's tbody
    $("#schedule tbody").append(newRow);
}

function toggleCheckboxesFree() {
    const busyCheckbox = document.getElementById("busy");
    if (busyCheckbox.checked) {
        busyCheckbox.checked = false;
    }
}

function toggleCheckboxesBusy() {
    const freeCheckbox = document.getElementById("free");

    // Toggle the state of the checkboxes
    if (freeCheckbox.checked) {
        freeCheckbox.checked = false;
    }
}

$("#taskForm").on("submit", setTask);
$("#free").on("click", toggleCheckboxesFree);
$("#busy").on("click", toggleCheckboxesBusy);

