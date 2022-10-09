// once the html page is loaded,
$(document).ready(() =>
{
    // send an alert if an error message is passed main.js
    if (typeof (errorMessage) !== "undefined")
    {
        alert(errorMessage)
    }
})


$("#vis_option").change(() =>
{
    var vis_option_selected = $("#vis_option").find(":selected").val()

    if (vis_option_selected == "showWC")
    {
        $("#wc-select").show()
        $("#graph-select").hide()
        $("#x-axis-select").hide()
        $("#y-axis-select").hide()
        $(".graph-option-div").hide()

        $(".graph-option").prop('disabled', true)
        $("#x-axis").prop('disabled', true)
        $("#y-axis").prop('disabled', true)
    }
    else
    {
        $("#wc-select").hide()
        $("#y-axis-select").show()
        $(".graph-option").prop('disabled', false)
        $("#x-axis").prop('disabled', false)
        $("#y-axis").prop('disabled', false)
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

//shows the submit button once a graph option has been selected
$(".wc_option").change(() =>
{
    $("#submit-button").show()
})

// handles the show/hide of graph options based on the selected xaxis
// also resets the graph options every time it is called, to prevent unexpected behaviour,
// as radio buttons remain checked even when they are hidden
function show_hide_graph_options(selected)
{
    $(".graph-option").prop('checked', false)
    if (selected == "skills")
    {
        $("#line").hide()
        $("#scatter").hide()
        $("#bar").show()
        $("#pie").show()
    }
}