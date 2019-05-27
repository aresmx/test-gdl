# Employee REST server

GithubRepository
```bash
$ git clone https://github.com/aresmx/test-gdl.git
```

#####################
## Backend Module ##
#####################

### Built With
- Java 8                    [JAVA](http://www.oracle.com/technetwork/java/javaee/overview/index.html)
- Spring Framework 5.x.x    [SPRING](https://projects.spring.io/spring-framework/)
- Spring Data 2.x.x         [SPRING-DATA](https://projects.spring.io/spring-data/)
- Maven                     [MAVEN](https://maven.apache.org/)
- H2
- Lombok
- JPA

### Prerequisites
- Install [Java8]()
- Install [Maven]()

### Setting up Dev
Steps in order to start the project:

```bash
cd backend
mvn spring-boot:run
```

Port: 8095
URL: api/employees

#####################
## Frontend Module ##
#####################

### Built With
- ReactJs
- BootStrap
- PrimeReact

### Prerequisites
- Install [Node.js](https://nodejs.org/) v6.x.x LTS
- Install [Yarn](https://yarnpkg.com) v1.x.x

### Setting up Dev
Steps in order to start the project:

```bash
cd frontend/src/main/webapp/test-app
npm install
yarn start
```

Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

### REQUIREMENTS

All data should be persisted into either memory, or externally. Please include instructions on how to run and interact with the web server.
Please demonstrate use of Java 8
Please demonstrate use of one or more design patterns and add comments as to why you choose that pattern.
Create a web application that exposes REST operations for employees. The API should be able to:

Get employees by an ID
Create new employees
Update existing employees
Delete employees
Get all employees
An employee is made up of the following data:

Employee spec
ID - Unique identifier for an employee
FirstName - Employees first name
MiddleInitial - Employees middle initial
LastName - Employeed last name
DateOfBirth - Employee birthday and year
DateOfEmployment - Employee start date
Status - ACTIVE or INACTIVE

Startup

On startup, the application should be able to ingest an external source of employees, and should make them available via the GET endpoint.
ACTIVE vs INACTIVE employees

By default, all employees are active, but by way of the API, can be switched to inactive. 
This should be done by the delete API call. 
This call should require some manner of authorization header.
When an employee is inactive, they should no longer be able to be retrieved in either the get by id, or get all employees calls
