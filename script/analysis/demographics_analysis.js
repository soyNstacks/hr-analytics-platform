// count number of occurences for each factor 
function variable_count()
{

    // https://stackoverflow.com/questions/50045690/how-can-i-find-the-top-n-occurrences-of-an-object-value-in-an-array-using-typesc

    // count total number of employees in each age group
    var age_count = results
        .reduce((r, { age }) =>
        {
            r[age] = r[age] || { age, occurence: 0 }
            r[age].occurence++
            return r
        }, {})

    // count total number of employees by race 
    var race_count = results
        .reduce((r, { race }) =>
        {
            r[race] = r[race] || { race, occurence: 0 }
            r[race].occurence++
            return r
        }, {})

    // count total number of employees by gender
    var gender_count = results
        .reduce((r, { gender }) =>
        {
            r[gender] = r[gender] || { gender, occurence: 0 }
            r[gender].occurence++
            return r
        }, {})

    // count total number of employees in each position
    var position_count = results
        .reduce((r, { position }) =>
        {
            r[position] = r[position] || { position, occurence: 0 }
            r[position].occurence++
            return r
        }, {})

    // count total number of employees in each department
    var department_count = results
        .reduce((r, { department }) =>
        {
            r[department] = r[department] || { department, occurence: 0 }
            r[department].occurence++
            return r
        }, {})

    return {
        "age": age_count,
        "race": race_count,
        "gender": gender_count,
        "position": position_count,
        "department": department_count
    }
}

// find top occurences for each variable 
function top_counts(variable_count)
{
    return Object
        .values(variable_count)
        .sort((a, b) => b.occurence - a.occurence)
        .slice(0, 10) //display up to top 10
}

// display top factors and frequencies onto html table
function append_to_table(counts, divId, key)
{

    // adapted from https://stackoverflow.com/questions/41995372/how-to-add-rows-in-html-table-using-jquery
    // top factors
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

// age
append_to_table(
    top_counts(variable_count()["age"]),
    '#age_table > tbody:last-child',
    "age"
)
// race
append_to_table(
    top_counts(variable_count()["race"]),
    '#race_table > tbody:last-child',
    "race"
)
// gender
append_to_table(
    top_counts(variable_count()["gender"]),
    '#gender_table > tbody:last-child',
    "gender"
)
// position
append_to_table(
    top_counts(variable_count()["position"]),
    '#position_table > tbody:last-child',
    "position"
)
// department
append_to_table(
    top_counts(variable_count()["department"]),
    '#dept_table > tbody:last-child',
    "department"
)
