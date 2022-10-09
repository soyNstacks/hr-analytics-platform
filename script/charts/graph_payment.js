// tooltip for help (?) icon
$(document).ready(function ()
{
    $('[data-bs-toggle="tooltip"]').tooltip()
    const tooltip = new bootstrap.Tooltip('.fa-question-circle', {
        boundary: document.body
    })
})

// create the title and axis labels for the graph
var graph_title = create_graph_title(x_axis, y_axis, stats_type)

// generate the table
sort_filter_table("results-table", ["string", "string", "number", "string", "string"])

// if payment date is the x axis,
// remove the time portion, and sort from earliest to latest
if (x_axis == "payment_date")
{
    results = parse_sort_date(results, x_axis)
}

// create nest object
var nest

//if the graph type is bar or pie,
if (graph_type === "Bar" || graph_type === "Pie")
{
    // if the selected mode is "mean"
    if (stats_type === "mean")
    {
        nest = JSC.nest()
            //set series
            .key(x_axis)
            //set x axis
            .key(x_axis)
            .rollup(y_axis, "average")
            .series(results)
    }
    // if the selected mode is "median"
    else if (stats_type === "median")
    {
        nest = JSC.nest()
            //set series
            .key(x_axis)
            //set x axis
            .key(x_axis)
            .rollup((vals) =>
            {
                return find_median(vals, y_axis)
            })
            .series(results)
    }
    else
    // if the selected mode is "sum"
    {
        nest = JSC.nest()
            //set series
            .key(x_axis)
            //set x axis
            .key(x_axis)
            //set y axis
            .rollup(y_axis)
            .series(results)
    }

    if (graph_type == "Bar")
    {
        render_chart("column", "auto", "stacked", nest, graph_title)
    }
    else
    {
        render_chart("pie", "auto", "stacked", nest, graph_title)
    }
}
else if (graph_type == "Line")
{
    // if the selected mode is "mean"
    if (stats_type === "mean")
    {
        nest = JSC.nest()
            //set x axis
            .key(x_axis)
            .rollup(y_axis, "average")
            .series(results)
    }
    // if the selected mode is "median"
    else if (stats_type === "median")
    {
        nest = JSC.nest()
            //set x axis
            .key(x_axis)
            .rollup((vals) =>
            {
                return find_median(vals, y_axis)
            })
            .series(results)
    }
    else
    {
        nest = JSC.nest()
            //set x axis
            .key(x_axis)
            //set y axis
            .rollup(y_axis)
            .series(results)
    }

    var chart = render_chart("line", "time", "auto", nest, graph_title)
    // toggle legend visiblity
    chart.currentOptions.legend_visible = false
}
else if (graph_type == "Scatter")
{
    // create an array of points, mapping date to x, and amount to y
    var points = results.map((d) =>
    {
        return { x: d[x_axis], y: d.payment_amount }
    })

    var x_scaleType = "time"

    if (x_axis === "position" || x_axis === "department")
    {
        x_scaleType = "auto"
    }

    //render chart
    var chart = render_chart("marker", x_scaleType, "auto", [{ points: points }], graph_title)
    // toggle legend visiblity
    chart.currentOptions.legend_visible = false
}

// handles user input for analysis area
// show or hide table in statistical area
$("#stats_tableDropdown").change(function ()
{
    var selected = $("#stats_tableDropdown").find(":selected").val()

    if (selected == "showOverall")
    {
        $("#stats_overall").show()
        $("#stats_grouped").hide()
        $("#hide_stats-select").show()
    }
    else if (selected == "showGrouped")
    {
        $("#stats_overall").hide()
        $("#stats_grouped").show()
        $("#hide_stats-select").show()
    }
    else if (selected == "hideAll")
    {
        $("#stats_overall").hide()
        $("#stats_grouped").hide()
    }
})