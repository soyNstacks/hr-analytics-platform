//----------------------------------------------------------------
// GRAPH HELPER FUNCTIONS
// Contains helper functions that are used when generating graphs
//----------------------------------------------------------------

// finds the median of a particular array
function find_median(arr, property)
{
    // throw an an error if an empty array is passed to the function
    if (arr.length < 1) 
    {
        throw new Error("empty input in find_median")
    }

    // to store values
    var valArr = []

    // push each occurence of the selected property to valArr
    arr.forEach(element => 
    {
        valArr.push(element[property])
    })

    //sort the array in ascending order
    valArr.sort((a, b) =>
    {
        return a - b
    })

    //find the array midpoint
    var mid = Math.floor(valArr.length / 2)

    // return the midpoint if the array is odd in length
    if (valArr.length % 2 === 1)
    {
        return valArr[mid]
    }

    // return the average of the 2 midpoint elements if the array is even in length
    return (valArr[mid - 1] + valArr[mid]) / 2
}

// removes the time portion of an array of dates, and sorts from earliest to latest
function parse_sort_date(arr, property)
{
    //remove the time portion of each payment date
    arr.forEach((entry) => 
    {
        entry[property] = entry[property].slice(0, entry[property].indexOf('T'))
    })

    //sort the results from earliest to latest
    arr.sort((a, b) => 
    {
        var b_date = b[property]
        return a[property].localeCompare(b_date)
    })

    return arr
}

// creates a graph and axis title object
// also adds the selected statistical method to the title, if applicable
function create_graph_title(x_axis, y_axis, stat_method)
{
    var results = {}
    //split the recieved x and y axis by _
    x_arr = x_axis.split("_")
    y_arr = y_axis.split("_")

    //for each word in the x axis,
    x_arr.forEach((string, index) =>
    {
        // remove the word if it is "name"
        // titles should be "xyz by employee", not "xyz by employee name"
        if (string == "name")
        {
            x_arr.splice(index, 1)
        }
        else
        {
            // capitalise the first letter of the word
            x_arr[index] = string[0].toUpperCase() + string.substr(1)
        }
    })

    y_arr.forEach((string, index) =>
    {
        if (string == "name")
        {
            // remove the word if it is "name"
            // titles should be "xyz by employee", not "xyz by employee name"
            y_arr.splice(index, 1)
        }
        else
        {
            // capitalise the first letter of the word
            y_arr[index] = string[0].toUpperCase() + string.substr(1)
        }

    })

    //reform each word in the x and y axis labels, seperated by a " "
    // to form the graph's axis labels
    results.x_label = x_arr.join(" ")
    results.y_label = y_arr.join(" ")

    //if a statistical method is selected (if it was passed as an arguement)
    if (stat_method)
    {
        // capitalise the statistical method
        stat_method = stat_method[0].toUpperCase() + stat_method.substr(1)
        // create a overall graph title that includes the stats method
        results.title_label = stat_method + " " + results.y_label + " by " + results.x_label
    }
    else
    {
        // if no stats method is passed,
        // then the graph title will not include it
        results.title_label = results.y_label + " by " + results.x_label
    }
    return results
}