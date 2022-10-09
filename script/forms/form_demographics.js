// once the html page is loaded,
$(document).ready(() =>
{
    // send an alert if an error message is passed main.js
    if (typeof (errorMessage) !== "undefined")
    {
        alert(errorMessage)
    }
})

$("#y-axis").change(() =>
{
    $("#x-axis-select").show()
})

$("#x-axis").change(() =>
{
    $("#graph-select").show()
    // call to show/hide the graph optinns based on the selected xaxis
    show_hide_graph_options($("#x-axis").find(":selected").val())
})

//shows the submit button once a graph option has been selected
$(".graph-option").change(() =>
{
    $("#submit-button").show()
})

// handles the show/hide of graph options based on the selected xaxis
// also resets the graph options every time it is called, to prevent unexpected behaviour,
// as radio buttons remain checked even when they are hidden
function show_hide_graph_options(selected)
{
    $(".graph-option").prop('checked', false)
    if (selected == "age" || selected == "gender" || selected == "race")
    {
        $("#line").hide()
        $("#scatter").hide()
        $("#bar").show()
        $("#pie").show()
    }
}