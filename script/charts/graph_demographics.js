// create a graph title
var graph_title = create_graph_title(x_axis, y_axis)

// generate the table
sort_filter_table("results-table")

// create nest object
var nest = JSC.nest()
    //set series
    .key(x_axis)
    //set x axis
    .key(x_axis)
    //count number of employees per x-axis entry
    .rollup((vals) =>
    {
        return vals.length
    })
    .series(results)


//create charts
if (graph_type == "Bar")
{
    render_chart("column", "auto", "stacked", nest, graph_title)
}
else if (graph_type == "Pie")
{
    //render chart
    render_chart("pie", "auto", "stacked", nest, graph_title)
}

// show or hide table according user selection
function table_visibility(id1, id2, id3, id4, id5)
{
    // show table 
    $(id1).show()

    // hide tables
    $(id2).hide()
    $(id3).hide()
    $(id4).hide()
    $(id5).hide()
}

// handles user input for analysis area
// show or hide table according to user selection
$("#stats_tableDropdown").change(function ()
{
    var selected = $("#stats_tableDropdown").find(":selected").val()

    // user selects table of age demographics
    if (selected == "statsByAge")
    {

        table_visibility("#statsDiv_age", // show age table
            "#statsDiv_race", // hide race table
            "#statsDiv_gender", // hide gender table
            "#statsDiv_position", // hide position table
            "#statsDiv_dept")// hide department table
    }
    // user selects table of race demographics
    else if (selected == "statsByRace")
    {

        table_visibility("#statsDiv_race", // show race table
            "#statsDiv_age", // hide age table
            "#statsDiv_gender", // hide gender table
            "#statsDiv_position", // hide position table
            "#statsDiv_dept")// hide department table
    }
    // user selects table of gender demographics
    else if (selected == "statsByGender")
    {

        table_visibility("#statsDiv_gender", // show gender table
            "#statsDiv_age", // hide age table
            "#statsDiv_race", // hide race table
            "#statsDiv_position", // hide position table
            "#statsDiv_dept")// hide department table
    }
    // user selects table of position demographics
    else if (selected == "statsByPosition")
    {

        table_visibility("#statsDiv_position", // show position table
            "#statsDiv_age", // hide age table
            "#statsDiv_race", // hide race table
            "#statsDiv_gender", // hide gender table
            "#statsDiv_dept")// hide department table
    }
    // user selects table of department demographics
    else if (selected == "statsByDept")
    {

        table_visibility("#statsDiv_dept", // show department table
            "#statsDiv_age", // hide age table
            "#statsDiv_race", // hide race table
            "#statsDiv_gender", // hide gender table
            "#statsDiv_position")// hide position table
    }
})