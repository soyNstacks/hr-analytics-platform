//----------------------------------------------------------------
// VISUALISAITON RENDERING FUNCTIONS (Graph/WordCloud)
//----------------------------------------------------------------

//renders a chart
function render_chart(graphType, x_scaleType, y_scaleType, series, titleStrings)
{
    var chart = JSC.chart('graph-div',
        {
            debug: true,
            type: graphType,
            legend_visible: true,
            defaultPoint_tooltip: "<b>%name</b><br>%yValue", // name (bold) \n value
            defaultSeries: { shape_opacity: 0.7 },
            xAxis: { label: { text: titleStrings.x_label }, scale_type: x_scaleType },
            yAxis: { label: { text: titleStrings.y_label }, scale_type: y_scaleType },
            title:
            {
                label: { text: "<strong>" + titleStrings.title_label + "</strong>" },
                position: "center"
            },
            toolbar:
            {
                items:
                {
                    // export button settings
                    export:
                    {
                        label: 'Export Graph',
                        padding: [0, 5, 0, 0], //padding: top/right/bottom/left
                        position: 'topRight',
                        tooltip: 'Export Graph to Image/PDF',
                        outline: { color: 'rgb(123,123,123)' },
                        fill: 'rgb(220,220,220)',
                        radius: 3,
                        items: { print_visible: false } // hide print button
                    }
                }
            },
            series: series
        })
    return chart
}

// render wordcloud on canvas
function render_wc(div, targetElem)
{

    // extract necessary data 
    var data_arr = results.map(row => ({
        name: row.name, // employee name
        position: row.position, // employee's position in company
        skills: [row.skills], // contain string of multiple skills in an array
        department: row.department, // relevant department
    }))

    // find skills frequency and convert into an object
    var count_obj = data_arr.reduce((counter, entry) =>
    {
        return count_occurence(entry, counter, wcCategory)
    }, {})

    // convert object to a wordcloud-compatible 2D array [['text', size], ...]
    var count_arr = obj_to_arr(results, count_obj)

    // set canvas dimensions to viewable dimensions of div
    targetElem.height = div.offsetHeight
    targetElem.width = div.offsetWidth

    // set size limit for wordcloud gridSize 
    var limit_size = 850

    // set options for wordcloud
    var options = {
        list: count_arr,
        // size of grid in canvas
        gridSize: Math.round(25 * targetElem.offsetWidth / 1024),
        // size of each element in list
        weightFactor: function (size)
        {
            if (count_arr.length <= 5)
            {
                return Math.pow(size, 2) * targetElem.offsetWidth / 1024
            }
            else
            {
                if (targetElem.offsetWidth <= limit_size)
                {
                    if (count_arr.length > 12)
                    {
                        return Math.pow(size, 1.7) * targetElem.offsetWidth / 1024
                    }

                    if (count_arr.length === 12)
                    {
                        return Math.pow(size, 1.75) * targetElem.offsetWidth / 1024
                    }

                    if (count_arr.length < 12 && count_arr.length > 5)
                    {
                        return Math.pow(size, 1.8) * targetElem.offsetWidth / 1024
                    }

                    if (count_arr.length <= 5)
                    {
                        return Math.pow(size, 2.5) * targetElem.offsetWidth / 1024
                    }
                }
                else if (targetElem.offsetWidth < 300 && targetElem.offsetWidth > limit_size)
                {

                    return Math.pow(size, 1.55) * targetElem.offsetWidth / 1024
                }

                return Math.pow(size, 1.50) * targetElem.offsetWidth / 1024
            }
        },
        // shape of wordcloud
        shape: 'circle',
        // paint and empty canvas before starting
        clearCanvas: true,
        // forbid drawing of words outside of canvas
        drawOutOfBound: true,
        // shrink text size to fit into canvas
        shrinkToFit: false,
        // forbid shuffling of words drawn on canvas
        shuffle: false,
        // forbid rotation of text
        rotateRatio: 0,
        // degree of flatness of shape drawn
        ellipticity: 0.5,
        // font of text
        fontFamily: 'Lato',
        // colour theme of text 
        color: 'random-dark',
        // weight of font 
        fontWeight: '500',
        // colour of background to paint
        backgroundColor: 'rgb(255, 255, 255)'
    }

    // modify gridSize if window size exceeds limit 
    if (targetElem.offsetWidth > limit_size)
    {
        options.gridSize = Math.round(20 * targetElem.offsetWidth / 1024)
    }

    // render wordcloud on canvas with options 
    WordCloud(targetElem, options)

    // save wordcloud canvas as an image in png format
    $('#btn-save-wc').on("click", () =>
    {
        targetElem.toBlob(function (blob)
        {
            // save as default name locally
            saveAs(blob, 'wordcloud.png')
        })
    })
}
