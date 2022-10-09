// payment stats to display in analysis section

// overview of all available payment_amount data
function overall_stats(results)
{
    // create an array of all values for payment_amount 
    var amount_array = results.map(row =>
    {
        return row.payment_amount
    }, [])

    // find minimum, maximum, mean, median and standard deviation from the array of payment_amount 
    return {
        "Minimum": Math.round(ss.min(amount_array)),
        "Maximum": Math.round(ss.max(amount_array)),
        "Mean": Math.round(ss.mean(amount_array)),
        "Median": Math.round(ss.median(amount_array)),
        "SD": Math.round(ss.standardDeviation(amount_array))
    }
}

// obtain payment_amount data relevant to x_axis attribute 
function stats_by_axis(results, x_axis)
{
    // create an array of objects with relevant values for payment_amount based on x_axis attribute 
    var obj = results.reduce((r, a) =>
    {
        r[a[x_axis]] = r[a[x_axis]] || []
        r[a[x_axis]].push(a.payment_amount)

        return r
    }, [])

    // get keys of object: x_axis attributes 
    // e.g. user selects "position": keys => ["Intern", "Manager"...]
    var keys = Object.keys(obj)

    // iterate to apply statistical methods on each array of payment_amount 
    // that is categorised by (employee_name/payment_date/payment_type/position/department) 
    keys.forEach((key) =>
    {
        obj[key] = {
            "Minimum": Math.round(ss.min(obj[key])),
            "Maximum": Math.round(ss.max(obj[key])),
            "Mean": Math.round(ss.mean(obj[key])),
            "Median": Math.round(ss.median(obj[key])),
            "SD": Math.round(ss.standardDeviation(obj[key]))
        } || []
    })

    return obj
}

// append data to html table. Overall data summary
function overall_stats_to_table(obj, divId)
{

    // adapted from https://stackoverflow.com/questions/41995372/how-to-add-rows-in-html-table-using-jquery
    Object.entries(obj).forEach(([key, value]) =>
    {
        var row = `<tr> 
                <th> ${key} </th> 
                <td> $`
            + `${value} </td> 
                </tr>`
        $(divId).append(row)
    })
}

// append data to html table. Data is sorted by x axis
function stats_by_axis_to_table(obj, divId)
{

    // adapted from https://stackoverflow.com/questions/41995372/how-to-add-rows-in-html-table-using-jquery
    Object.entries(obj).forEach(([key, nestedObj]) =>
    {
        // x_axis attributes    
        var tbody = '<tr><td>' + key + '</td>'
            + '<td> $' + nestedObj["Minimum"] + '</td>'
            + '<td> $' + nestedObj["Maximum"] + '</td>'
            + '<td> $' + nestedObj["Mean"] + '</td>'
            + '<td> $' + nestedObj["Median"] + '</td>'
            + '<td> $' + nestedObj["SD"] + '</td>'
            + '</tr>'
        $(divId).append(tbody)

    })
}

// overall stats
overall_stats_to_table(
    overall_stats(results),
    '#stats_overall tbody:last-child',
)

// stats grouped according to axis attributes
stats_by_axis_to_table(
    stats_by_axis(results, x_axis),
    '#stats_grouped tbody:last-child'
)
