//----------------------------------------------------------------
// TABLE SORT AND FILTER FUNCTIONS
//----------------------------------------------------------------

// takes a html table element, and creates a sortable/filterable TableFilter
function sort_filter_table(tableID, column_types)
{
    // set table configs
    var filtersConfig =
    {
        base_path: 'script/libs/tablefilter/',
        alternate_rows: true,
        rows_counter: true,
        btn_reset: true,
        status_bar: true,
        mark_active_columns: true,
        highlight_keywords: true,
        no_results_message: true,
        col_types: column_types,
        extensions: [{ name: 'sort' }]
    }

    var tf = new TableFilter(tableID, filtersConfig)
    tf.init()
}