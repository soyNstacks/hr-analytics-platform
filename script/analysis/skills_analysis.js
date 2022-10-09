// count number of occurences for each skill 
function variable_count()
{

    // split single string of skills to multiple strings 
    var data_arr = results.map(row => ({
        skills: [row.skills.split(", ")]
    }))

    // adapted from https://stackoverflow.com/questions/27538349/merge-multiple-objects-inside-the-same-array-into-one-object
    var skillset = []

    // count occurence of each skill 
    var skill_count = data_arr

        // reduces original array to a single final value 
        // .reduce: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce  
        .reduce((counter, entry) =>
        {

            // iteration to execute operations on each element in the array of skills
            entry.skills.forEach(row =>
            {

                // count occurence and add to array -- 'skillset'
                skillset.push(
                    row.reduce((count, item) =>
                    {
                        count[item] = (count[item] || 0) + 1
                        return count
                    }, {}))
            })

            // reduce to return 1D array
            return skillset
                .reduce((res, obj) =>
                {
                    for (var key in obj)
                    {
                        res[key] = obj[key]
                    }

                    return res
                }, {})
        }, {})

    // return final object --> e.g. {Leadership: 1, Piano: 1} 
    return skill_count
}

// find top occurences for skills 
function top_counts(variable_count)
{
    // sort in descending order, the top 10 most commonly appeared skill
    return Object
        .entries(variable_count)
        .sort((a, b) => b.values() - a.values())
        .slice(0, 10) // up to 10 highest counts
}

// display top 10 skills and frequencies onto html table
function append_to_table()
{

    // up to top 10 most commonly occured factors 
    var top_skills = top_counts(variable_count())

    // adapted from https://stackoverflow.com/questions/41995372/how-to-add-rows-in-html-table-using-jquery

    // append to existing table on html page
    top_skills.forEach(elem =>
    {
        $('#skills_table > tbody:last-child').append(
            '<tr><td>'
            + elem[0]
            + '</td>'
            + '<td>'
            + elem[1]
            + '</td></tr>'
        )
    })
}

// call function to append rows to table
append_to_table()