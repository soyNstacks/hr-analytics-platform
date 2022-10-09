const { redirect, render } = require("express/lib/response")
const { UCS2_GENERAL_MYSQL500_CI } = require("mysql/lib/protocol/constants/charsets")
const { NULL } = require('mysql/lib/protocol/constants/types')


module.exports = function (app)
{
    title = "HR Analytics"

    //Homepage - index.html
    app.get("/", function (req, res)
    {
        res.render("index.html", { title: title }
        )
    })

    app.get("/payment_form", function (req, res)
    {
        res.render("payment_form.html", { title: title }
        )
    })

    app.get("/payment", function (req, res)
    {
        let sqlquery = "SELECT payment.*, employees.name AS employee_name," +
            "employees.position, employees.department FROM payment " +
            "JOIN employees ON payment.employee_id = employees.id "

        //add a BETWEEEN portion if a date range is selected
        if (req.query.date_mode == "date_range")
        {
            sqlquery += "WHERE payment.payment_date BETWEEN \"" + req.query.start_date + "\" AND \"" + req.query.end_date + "\""
        }

        db.query(sqlquery, (err, result) =>
        {
            // redirect to page if error occurs
            if (err)
            {
                return console.error(err.message) //return error message if an error occurs
            }

            // if no results are found with the selected parameters,
            if (result.length === 0)
            {
                // loop back to the form, passing the given errorMessage
                res.render("payment_form.html", { errorMessage: "No results were found for the selected dates, please try again!" })
                return null
            }

            res.render("payment.html",
                {
                    result: JSON.stringify(result),
                    tableResult: result,
                    graph_type: req.query.graph_type,
                    x_axis: req.query.x_axis,
                    y_axis: req.query.y_axis,
                    stats_type: req.query.stats_type
                })
        })
    })

    app.get("/attrition_form", function (req, res)
    {
        res.render("attrition_form.html", { title: title })
    })

    app.get("/attrition", function (req, res)
    {

        let sqlquery = "SELECT attrition.*, employees.name, employees.position, employees.department " +
            "FROM attrition JOIN employees ON attrition.employee_id = employees.id "

        //add a BETWEEEN portion if a date range is selected
        if (req.query.date_mode == "date_range")
        {
            sqlquery += "WHERE attrition.resignation_date BETWEEN \"" + req.query.start_date + "\" AND \"" + req.query.end_date + "\""
        }

        db.query(sqlquery, (err, result) =>
        {
            // redirect to page if error occurs
            if (err)
            {
                return console.error(err.message) //return error message if an error occurs
            }

            // if no results are found with the selected parameters,
            if (result.length === 0)
            {
                // loop back to the form, passing the given errorMessage
                res.render("attrition_form.html", { errorMessage: "No results were found for the selected dates, please try again!" })
                return null
            }

            res.render("attrition.html",
                {
                    result: JSON.stringify(result),
                    tableResult: result,
                    graph_type: req.query.graph_type,
                    x_axis: req.query.x_axis,
                    y_axis: req.query.y_axis
                })
        })
    })

    app.get("/skills_form", function (req, res)
    {
        res.render("skills_form.html", { title: title }
        )
    })

    //Talent skills - talentskills.html
    app.get("/skills", function (req, res)
    {

        let sqlquery = "SELECT * FROM employees JOIN skills WHERE employees.id = skills.employee_id"

        // execute sql query 
        db.query(sqlquery, (err, result) =>
        {
            // redirect to page if error occurs
            if (err)
            {
                return console.error(err.message) //return error message if an error occurs
            }

            // if no results are found with the selected parameters,
            if (result.length === 0)
            {
                // loop back to the form, passing the given errorMessage
                // should not trigger under normal circustances with the given sample data
                res.render("skills_form.html", { errorMessage: "No results were found for selected parameters, please try again!" })
                return null
            }

            let return_data =
            {
                result: JSON.stringify(result),
                skillsData: result,
                graph_type: req.query.graph_type,
                x_axis: req.query.x_axis,
                y_axis: req.query.y_axis,
                wc_category: req.query.wc_category,
                vis_option: req.query.vis_option,
            }
            res.render("skills.html", return_data)
        })
    })

    app.get("/demographics_form", function (req, res)
    {
        res.render("demographics_form.html", { title: title }
        )
    })

    app.get("/demographics", function (req, res)
    {
        let sqlquery = "SELECT *, CASE WHEN is_female = 1 THEN \"Female\" ELSE \"Male\" END AS gender FROM employees"

        if (req.query.x_axis == "is_female")
        {
            req.query.x_axis = "gender"
        }

        db.query(sqlquery, (err, result) =>
        {
            // redirect to page if error occurs
            if (err)
            {
                return console.error(err.message) //return error message if an error occurs
            }

            // if no results are found with the selected parameters,
            if (result.length === 0)
            {
                // loop back to the form, passing the given errorMessage
                // should not trigger under normal circustances (unless the HTML is edited) with the given sample data
                res.render("demographics_form.html", { errorMessage: "No results were found for selected parameters, please try again!" })
                return null
            }

            res.render("demographics.html", {
                result: JSON.stringify(result),
                tableResult: result,
                graph_type: req.query.graph_type,
                x_axis: req.query.x_axis,
                y_axis: req.query.y_axis
            })
        })
    })
}
