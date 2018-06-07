<link rel="stylesheet" href="readme-src/readme.css">

![](Documentation/images/logo.png)


# SurveyApe

> Team project for Graduate software engineering course Enterprise Application Development.

## Goal

* The goal is to build a distributed enterprise web application which enables the user to become surveyor and surveyee. User can login and create surveys as a surveyor and ask others to provide their response. Surveyee does not have to be registered to participate in survey and can provide survey response.

* We were tasked with this project requirement so that we can learn and develop REST API enterprise application. 

## Introduction

* User can be surveyee and surveyor
* 3 types of survey in terms of their accessibility: 
	* General: Accessible by anyone 
	* Open: Accessible by invited user
	* Closed: Accessible by invited and registered user only
* Applications supports following questions types in survey:
	* Multiple choice questions 
		- Choice type
			- Text only: all choices are given as text.
			- Image only: every choice is given as an image.
		- Answer type:
			- Dropdownlist (Single selection only)
			- Radio button (Single selection only)
			- Checkbox (Single & multiple selection)
	* Yes/no questions. 
	* Short answer questions, where the answer is plain text.
	* Date/time questions, which allow the surveyee to pick a Date and/or Time as the answer
	* Star rating questions, which allow surveyees to rank a variable using 0-5 stars
* Surveyor can visualize statistics of survey for each question in dashboard
* Surveyor can export created survey and import multiple questions from any survey 


## System Design
![](Documentation/HLD/HighLevelArchitecture.png)

## Technology stack

![](readme-src/technologies.png)

<br/>
<table>
<thead>
<tr>
<th>Area</th>
<th>Technology</th>
</tr>
</thead>
<tbody>
	<tr>
		<td>Front-End</td>
		<td>React, Redux, React Router, Bootstrap, HTML5, CSS3, Javascript ( ES6 )</td>
	</tr>
	<tr>
		<td>Analytics Graphs</td>
		<td>chart.js</td>
	</tr>
	<tr>
		<td>Back-End</td>
		<td>Spring Boot (Hibernate, JPA, AOP), Java </td>
	</tr>
	<tr>
		<td>API Testing</td>
		<td>JUnit, Postman</td>
	</tr>
	<tr>
		<td>Database</td>
		<td>MySQL (AWS RDS)</td>
	</tr>
	<tr>
		<td>Image File Storage</td>
		<td>AWS S3 Bucket</td>
	</tr>
    <tr>
		<td>Deployment</td>
		<td>AWS EC2</td>
	</tr>
</tbody>
</table>
<br/>


## Database
![](Documentation/DB%20Design/DB_Design.png)

> Database design and the data was critical for the project so To maintain consistency within team we deployed our database on AWS RDS (MySQL).

## Screenshots

#### Login/Signup

![](Documentation/images/Signup/signup.png)

#### Email Account Verification Email

![](Documentation/images/Signup/email_verificationcode.png)

#### User Dashboard

![](Documentation/images/Survey/survey_dashboard.png)

#### Create Survey

![](Documentation/images/SurveyBuilder/create_survey.png)

#### Survey Builder

![](Documentation/images/Survey/surveybuilder_imagesupport.png)

#### Export Survey

![](Documentation/images/Import_Export/Export/export_survey_modal.png)

##### Exported file JSON data
![](Documentation/images/Import_Export/Export/export_survey_jsonformat_file.png)

#### Import Survey

##### Before Import Survey

![](Documentation/images/Import_Export/Import/before_survey_import.png)

##### After Import Survey

![](Documentation/images/Import_Export/Import/after_survey_import.png)

#### Invite Users for participating in Survey

![](Documentation/images/Survey/share_survey.png)

#### Participation Link with QR Code for different type of surveys
##### General Survey
![](Documentation/images/Survey/general_survey_invitation.png)

##### Open Survey
![](Documentation/images/Survey/open_survey_invitation.png)

##### Closed Survey
![](Documentation/images/Survey/close_survey_invitation.png)

#### Survey Response Page for Survey participant

![](Documentation/images/SurveyResponse/surveyresponse_closed_survey.png)

#### Readonly Survey Response for submitted response

![](Documentation/images/SurveyResponse/response_submitted.png)

#### Survey Statistics Dashboard

![](Documentation/images/Statistics/stats_dashboard.png)

#### Statistics for Question Types (Checkbox, Radio, Dropbox, YESNO, Rating)

![](Documentation/images/Statistics/ratings_stats.png)

![](Documentation/images/Statistics/image_statistics.png)

#### Statistics for Question Types (Short Answers, DateTime)

![](Documentation/images/Statistics/short_answer_stats.png)


## Team Members

*	Arijit Mandal
*	Rutvik Pensionwar
*	Sannisth Soni
*	Varun Shah
