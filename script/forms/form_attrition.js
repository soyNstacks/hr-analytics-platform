// once the html page is loaded,
$(document).ready(() =>
{
    // send an alert if an error message is passed main.js
    if (typeof (errorMessage) !== "undefined")
    {
        alert(errorMessage)
    }
})

//show the x axis select once a yaxis has been selected
$("#y-axis").change(() =>
{
    $("#x-axis-select").show()
})

//show the date mode select once a yaxis has been selected
$("#x-axis").change(() =>
{
    $("#date-mode").show()

    // this handles changing of the xaxis option after the rest of the options are selected
    // dynamically show/hide the graph type options based on what xaxis is selected,
    // even after the date mode has been selected
    if ($(".date-mode-option")[0].checked || $(".date-mode-option")[1].checked)
    {

        show_hide_graph_options($("#x-axis").find(":selected").val())
    }
})

// show/hide the relevant options based on what date mode is selected
// also enables/disables the start/end date input fields based on the date mode
$(".date-mode-option").change(() =>
{
    // true if the selected mode is date_range, false if it is date_all
    var date_range_selected = $("#date-range")[0].checked

    if (date_range_selected)
    {
        $(".date-input").prop('disabled', false)
        $("#date-select").show()
    }
    else
    {
        $(".date-input").prop('disabled', true)
        $("#date-select").hide()
        $("#graph-select").show()
        // call to dynamically show/hide the graph optiosn based on the selected xaxis
        show_hide_graph_options($("#x-axis").find(":selected").val())
    }
})

// checks the start/end date input fields (only enabled is date_range is selected)
$(".date-input").change(() =>
{
    var start_date = $(".date-input")[0].value
    var end_date = $(".date-input")[1].value

    if (start_date != "" && end_date != "")
    {
        // makes sure the start date is before the end date (and vice versa)
        if (start_date > end_date)
        {
            // send and alert and reset the values if the start date is after the end date
            alert("Selected start date is later than end date!")
            $(".date-input")[0].value = ""
            $(".date-input")[1].value = ""
        }
        else
        {
            // shows the stats mode selection field if the dates are valid
            $("#graph-select").show()
            // call to dynamically show/hide the graph optiosn based on the selected xaxis
            show_hide_graph_options($("#x-axis").find(":selected").val())
        }
    }
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
    if (selected == "resignation_reason" || selected == "position" || selected == "department")
    {
        $("#line").hide()
        $("#scatter").hide()
        $("#bar").show()
        $("#pie").show()
    }

    if (selected == "resignation_date")
    {
        $("#bar").hide()
        $("#pie").hide()
        $("#line").show()
        $("#scatter").show()
    }

}