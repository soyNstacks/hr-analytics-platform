// count number of occurences for each factor 
function variable_count()
{
    // adapted from https://stackoverflow.com/questions/50045690/how-can-i-find-the-top-n-occurrences-of-an-object-value-in-an-array-using-typesc

    // count occurence of each resignation reason
    var reason_count = results
        .reduce((r, { resignation_reason }) =>
        {
            r[resignation_reason] = r[resignation_reason] || { resignation_reason, occurence: 0 }
            r[resignation_reason].occurence++
            return r
        }, {})

    // count occurence of each date resignations were submitted
    var date_count = results
        .reduce((r, { resignation_date }) =>
        {
            r[resignation_date] = r[resignation_date] || { resignation_date, occurence: 0 }
            r[resignation_date].occurence++
            return r
        }, {})

    // count total number of resignations in each department
    var department_count = results
        .reduce((r, { department }) =>
        {
            r[department] = r[department] || { department, occurence: 0 }
            r[department].occurence++
            return r
        }, {})

    // count total number of resignations based on employee's position 
    var pos_count = results
        .reduce((r, { position }) =>
        {
            r[position] = r[position] || { position, occurence: 0 }
            r[position].occurence++
            return r
        }, {})

    return {
        "reason": reason_count,
        "date": date_count,
        "department": department_count,
        "position": pos_count
    }

}

// find top occurences for each resignation variable 
function top_counts(variable_count)
{
    return Object
        .values(variable_count)
        .sort((a, b) => b.occurence - a.occurence)
        .slice(0, 10) // up to top 10 highest occurences 
}

// display top factors and frequencies onto html table
function append_to_table(counts, divId, key)
{

    // adapted from https://stackoverflow.com/questions/41995372/how-to-add-rows-in-html-table-using-jquery
    Object.values(counts).forEach(elem =>
    {
        $(divId).append(
            '<tr><td>'
            + elem[key]
            + '</td>'
            + '<td>'
            + elem["occurence"]
            + '</td></tr>'
        )
    })
}

// appending relevant data and visibility of options in selection field according to x_axis value submitted in the previous form page
// Top resignation reasons
if (x_axis == "resignation_reason")
{

    $('#stats-select').click(function ()
    {
        $('#opt-reason').show()
    })

    append_to_table(top_counts(variable_count()["reason"]),
        '#reason_table > tbody:last-child',
        "resignation_reason")
}

// Highest number of resignations by date
else if (x_axis == "resignation_date")
{

    $('#stats-select').click(function ()
    {
        $('#opt-date').show()
    })

    append_to_table(top_counts(variable_count()["date"]),
        '#date_table > tbody:last-child',
        "resignation_date")
}

// Departments with highest number of resignations
else if (x_axis == "department")
{

    $('#stats-select').click(function ()
    {
        $('#opt-dept').show()
    })

    append_to_table(top_counts(variable_count()["department"]),
        '#dept_table > tbody:last-child',
        "department")
}

// Positions with highest number of resignations
else if (x_axis == "position")
{

    $('#stats-select').click(function ()
    {
        $('#opt-position').show()
    })

    append_to_table(top_counts(variable_count()["position"]),
        '#pos_table > tbody:last-child',
        "position")
}