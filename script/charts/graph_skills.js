// generate the table
sort_filter_table("results-table")

// if wordcloud were selected
if (vis_option === "showWC")
{
    // get <div> that contains wordcloud canvas
    var div = $("#wordcloud-div")[0]
    // get <canvas> that displays wordcloud
    var targetElem = $("#canvas_wordcloud")[0]

    // render wordcloud canvas  
    render_wc(div, targetElem)

    // show div that contains canvas
    $('#wordcloud-div').show()
}
else
{  // otherwise: graph selected

    var graph_title = create_graph_title(x_axis, y_axis)
    // hide div that contains canvas
    $('#wordcloud-div').hide()

    // get an array of skills
    var possibleSkills = tokenise_skills(results)

    // create nest object
    var nest = JSC.nest()
        //set series
        .key("skill")
        //set x axis
        .key("skill")
        //count number of employees that have each skill
        .rollup(vals => 
        {
            return vals.length
        })
        .series(possibleSkills)

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
}

// user selection to show or hide table 
$("#stats_tableDropdown").change(function ()
{

    // get value of user selection
    var selected = $("#stats_tableDropdown").find(":selected").val()

    // show relevant table if skills analysis were chosen by user
    if (selected == "statsBySkills")
    {
        $("#statsDiv_skills").show()
    }
    // hide if no selection was made, or user chose to hide table on screen
    else $("#statsDiv_skills").hide()
})
