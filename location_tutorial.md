
# Visualize Location on Heroku App from Android
## Introduction
Purpose of this project, displaying locations from getting database via web interface on Heroku App. The locations are saved from mobile environment which is Android Studio.
These are saved with attributes that location name, recorder, minibus name, registered date and, their geometry. Location's geometry has latitude and longitude values with respect to projection which EPSG4326 and defined on WGS84 ellipsoid.
Getting points are recorded to PostgreSQL database. To visualize points on database, the Heroku platform is used. For this aim, PostGIS is Heroku service that provides developers to build, run, and operate applications entirely in the cloud.
## Installation Requirements
###### PostgreSQL
For recording points, the PostgreSQL should be used. To download PostgreSQL, the link is given as [PostgreSQL download link](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).
To installing PostgreSQL, following link is given [Install PostgreSQL](https://www.postgresqltutorial.com/install-postgresql/)
###### Visual Studio Code
Visual Studio Code supports to use the multiple languages in one interface. The VSC is utilized for writing, running and debugging code.  To download Visual Studio Code, the link is given [Download Visual Studio Code](https://code.visualstudio.com/Download)
###### Node JS
Node.js is an open source server environment that using the JavaScript on the server. For downloading, [Download Node JS](https://nodejs.org/en/download/).
###### Git
To manage source code the Git is used that is an Open Source Distributed Version Control System. It can be downloaded from [here](https://git-scm.com/downloads/)


## Web Interface
###### Opening a Heroku Account

To create a Heroku account, the following link can be [used](https://signup.heroku.com/login?redirect-url=https%3A%2F%2Fid.heroku.com%2Foauth%2Fauthorize%3Fclient_id%3Dd2ef2b24-e72c-4adf-8506-28db2218547d%26response_type%3Dcode%26scope%3Dglobal%252Cplatform%26state%3DSFMyNTY.g3QAAAACZAAEZGF0YW0AAAAxaHR0cHM6Ly9kYXNoYm9hcmQuaGVyb2t1LmNvbS9hdXRoL2hlcm9rdS9jYWxsYmFja2QABnNpZ25lZG4GANL7onluAQ.eDiBIjGpk8wBx82K2Ej2tBwAitNPBGNQoMMDLoySy78).
The requirement informations should be entered to sign up. When the account is created, an email is sent to verify the account. After that the Heroku App must be generated with Postgres database. For this purpose, stages are given below:
1. After log in to Heroku account, press the "New" button and then click the "Create new app".
2. When creating new app, some knowledges are required.
- The unique name should be provided.
- The region option can be choosen as you want (United States or Europe).
Finally the app is created. 
3. Created Heroku App can be found from as follows :
- (C:\Users\kfyka\OneDrive\Masaüstü\location_images\dashboard_img.png "Dashboard")
4. Click on the "Resources" tab
![Resources](https://github.com/Kardelennkayaa/display_location/blob/master/location_images/dashboard_imgimg.png)
5. For Heroku Postgres, write it that under the add-ons button and click it. After that click the "Submit Order Form" for completing the Heroku Postgres.
![Add-ons](https://github.com/Kardelennkayaa/display_location/blob/master/location_images/add_ons_img.png)
6. For accessing the database credentials, click the "Data" button and informations about database are available under the "Settings"
![Database Credentials](https://github.com/Kardelennkayaa/display_location/blob/master/location_images/credentials_img.png)

###### Connection Heroku Database and Postgres

To connect Heroku database, the pgAdmin 4 is used. Steps are given below:
1. Create the server while right clicking on Servers.
2. After that given database credentials should be presented as given follows:
![General](https://github.com/Kardelennkayaa/display_location/blob/master/location_images/general_img.png)
Under the connection tool, the informations about Heroku database should be provided to relating blank. Click the "Save Password" button, if you do not want to enter password again and again.
![Connection](https://github.com/Kardelennkayaa/display_location/blob/master/location_images/connection_img.png)
The DB restriction that under the Advanced tool, should be filled Heroku database name.
![Advanced](https://github.com/Kardelennkayaa/display_location/blob/master/location_images/advanced_img.png)

###### Create Table
To create table, the table name should be defined. Under the Columns tool, the columns name and their data types should be provided like below:
![Table](https://github.com/Kardelennkayaa/display_location/blob/master/location_images/table_img.png)

###### Visual Studio Code
For opening the folder, first of all the empty folder should be created on the computer.
Then open the folder on Visual Studio Code. For installing the Node JS, open the new terminal.
- Firstly, write the **npm init** on the terminal. For creating package.json, the questions will asked. Press enter button for all of the questions. At the end of the questions, the package.json is created with metadata.
The package.json is given as:
![Package](https://github.com/Kardelennkayaa/display_location/blob/master/location_images/package_img.png)
- Requirement installations of JavaScript packages:
1. Express Module
The Express module provides easy and fast development of web applications.Also it delivered the management of web requests with the route method it offers.
To install Express module; write **npm install express --save** on terminal and press enter.
2. File System Module
The File System Module is a module that contains functions that allow you to perform all file reading, writing, and permission operations.For installing the module; write **npm install express --save** on terminal and press enter.
3. Bluebird Module
Bluebird is a fully featured library with focus on innovative features and performance.For installing the module; write **npm install bluebird --save** on terminal and press enter.
4. Pg-Promise Module
Pg-promise is a PostgreSQL interface for NodeJS.For installing the module; write **npm install pg-promise --save** on terminal and press enter.
After the installations of modules, the updated package.json is given below:
![Update_package](https://github.com/Kardelennkayaa/display_location/blob/master/location_images/update_package_img.png)
###### Android Studio

 


