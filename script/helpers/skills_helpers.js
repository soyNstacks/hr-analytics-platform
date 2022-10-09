//----------------------------------------------------------------
// SKILLS HELPER FUNCTIONS
// Specific to skills page wordcloud
//----------------------------------------------------------------


// find frequency of skills 
function count_occurence(entry, counter, category)
{

    // skills
    var skillset = []

    if (category == "skills")
    {
        for (var i = 0; i < entry.skills.length; i++)
        {
            // split single string of skills into multiple individual strings
            var split_skillset = entry.skills[i].split(", ")

            for (var j = 0; j < split_skillset.length; j++)
            {
                // count occurence of each skill and add to array 
                skillset.push(counter[[split_skillset[j]]] = (counter[split_skillset[j]] || 0) + 1)
            }
        }
    }

    return counter
}

// convert object to an appropriate 2D array for wordcloud [item, size]
function obj_to_arr(arr, obj)
{
    // sum up occurences to find an average value
    var sum = sum_occurences(obj)

    // convert to 2D array for wordcloud library 
    arr = Object.keys(obj).map((key) =>
    {
        // if average occurence is less than 10
        if (sum / arr.length < 3)
        {
            // multiply occurence value by 7 to increase size of words on canvas
            return [key, 7 * obj[key].toString()]
        }

        // else if average is more than or equal to 10, return orignal occurence value
        return [key, obj[key].toString()]
    })
    console.log(arr)
    return arr
}

// sum up word occurence to find an average value to affect text size on canvas
function sum_occurences(obj)
{
    return Object.values(obj).reduce((accumulator, value) =>
    {
        return accumulator + value
    }, 0)
}

//tokenises and constructs the entire corpus of skills for the entire company
function tokenise_skills(arr)
{
    var possible_skills = []

    // tokenise the skills for each employee, and push it to possible skills
    arr.forEach(element =>
    {

        skills = element.skills.split(", ")
        console.log(skills)
        possible_skills.push(skills)
    })

    //flatten possible skills array
    possible_skills = possible_skills.flat()

    //convert array to an array of object for JSC nesting
    possible_skills = possible_skills.map(d => 
    {
        return { skill: d }
    })

    return possible_skills
}