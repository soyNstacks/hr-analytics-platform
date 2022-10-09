
//create a graph title
var graph_title = create_graph_title(x_axis, y_axis)

// generate the table
sort_filter_table("results-table")

// if resignation date is the x axis,
// remove the time portion, and sort from earliest to latest
if (x_axis == "resignation_date")
{
    results = parse_sort_date(results, x_axis)
}

//create charts
if (graph_type == "Bar")
{
    // create nest object
    var nest = JSC.nest()
        //set series
        .key(x_axis)
        //set x axis
        .key(x_axis)
        //count number of employees per x-axis entry
        .rollup(function (vals) 
        {
            return vals.length
        })
        .series(results)

    render_chart("column", "auto", "stacked", nest, graph_title)
}
else if (graph_type == "Line")
{
    // create nest object
    var nest = JSC.nest()
        //set x axis
        .key(x_axis)
        //count number of employees per x-axis entry
        .rollup(function (vals) 
        {
            return vals.length
        })
        .series(results)

    //render chart
    chart = render_chart("line", "time", "auto", nest, graph_title)
    // toggle legend visiblity
    chart.currentOptions.legend_visible = false
}
else if (graph_type == "Pie")
{
    var nest = JSC.nest()
        //set series
        .key(x_axis)
        //set x axis
        .key(x_axis)
        //count number of employees per x-axis entry
        .rollup(function (vals) 
        {
            return vals.length
        })
        .series(results)

    //render chart
    render_chart("pie", "auto", "stacked", nest, graph_title)
}
else if (graph_type == "Scatter")
{
    var nest = JSC.nest()
        //set x axis
        .key(x_axis)
        //count number of employees per x-axis entry
        .rollup(function (vals)
        {
            return vals.length
        })
        .series(results)
    //render chart
    chart = render_chart("marker", "time", "auto", nest, graph_title)
    // toggle legend visiblity
    chart.currentOptions.legend_visible = false
}

// show or hide table according user selection
function table_visibility(id1, id2, id3, id4)
{
    // show table 
    $(id1).show()

    // hide tables
    $(id2).hide()
    $(id3).hide()
    $(id4).hide()
}

// Handles user input for the analysis dropdown
// show or hide div according to user selection
$("#stats_tableDropdown").change(function ()
{

    // get selected value to execute table visibility function
    var selected = $("#stats_tableDropdown").find(":selected").val()

    // user selects Resignation Reason
    if (selected == "statsByReason")
    {

        table_visibility("#statsDiv_reason", // show table that displays top resignation reasons
            "#statsDiv_date", // hide resignation date
            "#statsDiv_dept", // hide department
            "#statsDiv_pos") // hide position
    }
    // user selects Resignation Date
    else if (selected == "statsByDate")
    {

        table_visibility("#statsDiv_date", // show table that displays highest number of resignations by date
            "#statsDiv_reason", // hide resignation reasons
            "#statsDiv_dept", // hide department
            "#statsDiv_pos") // hide position

    }
    //user selects Department
    else if (selected == "statsByDept")
    {

        table_visibility("#statsDiv_dept", // show table that displays departments with highest number of resignations
            "#statsDiv_reason", // hide resignation reasons
            "#statsDiv_date", // hide resignation date
            "#statsDiv_pos") // hide position
    }
    //user selects Position
    else if (selected == "statsByPos")
    {

        table_visibility("#statsDiv_pos", // show table that displays positions with highest number of resignations
            "#statsDiv_dept", // hide departments 
            "#statsDiv_reason", // hide resignation reasons 
            "#statsDiv_date") // hide resignation date
    }
})
