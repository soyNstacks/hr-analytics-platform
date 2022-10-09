//----------------------------------------------------------------
// SPREADSHEET EXPORT FUNCTION
//----------------------------------------------------------------

function export_to_spreadsheet(type)
{
    // get the html element by id
    var element = document.getElementById('results-table')
    // ead the table into a workbook
    var workbook = XLSX.utils.table_to_book(element, { sheet: "sheet1" })
    // set file name and extension. defaults to csv if a type is not passed in
    var file_name = 'table.' + (type || 'csv')

    // write the workbook to a file
    // also forces a download in browser environments
    XLSX.writeFile(workbook, file_name)
}

