# HR Analytics Platfrom | hr-analytics-platform

A collaborative web application developed by a team of students using agile methodology. 
The platform, targeted at small Singapore-based organisations, was finalised after undergoing multiple iterations of prototyping with thorough market research, as well as surveys, interviews and user testing with HR executives/leaders, managers in SMEs, and data scientists. 

## Objectives
To create a webapp with the following:
  1) Prioritise ease-of-use, customisability, and speed.
  2) Generate visualisations from the selected four HR metrics – Payments, Attrition, Skills, and Demographics.
  3) Form validation; Flag errors to the user in simple terms.
  4) Customisable visualisations with recommended graph types based on user's selected options.
  5) View raw data in a table and export to different file formats.
  6) Generate basic analysis with simple statistical techniques. 
  
## Install
<b>Install external dependencies</b>
```
npm init
npm install
```

<b> Create a local MySQL server using MySQL WORKBENCH </b>

1) Install MySQL by following this guide: https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/windows-installation.html (for windows)
2) Select "Developer Default" to install MySQL server and other MySQL tools 
3) If you would prefer not to install "Developer Default", please make sure MySQL Workbench is installed
4) Open MySQL Workbench
5) Create a local server following this guide: https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/starting-server.html
6) Once you are in your local server instance, select "Data Import/Restore" in the navigator sidebar on the left.
7) Select the "Import from Self-Contained File" option.
8) Select the "ASP.sql" file included with the webapp
9) Click "Start Import"

<b>Once you have completed the steps above</b>
1) Please change "host" and "user" fields in index.js to your personal MySQL username and password
2) You can also change your preferred port by changing the value of the port variable

## Run
1) Run `node index.js` to start the webapp
2) Open your browser and navigate to "http://localhost:<port number here>/". The default port number is 8080.
