# Project Overview

## Project Description

For Project Four of the General Assembly SEI course, I was assigned to create a mobile first web application that shows my knowledge and understanding of CRUD and RESTful APIs. The requirements for this project consisted of using Python and Django in the backend, and using HTML, CSS, and Django in the frontend. The backend is deployed via Heroku, while the frontend is deployed via Netlify.

For this project, I will be building a task management application. The purpose of this task management application is to allow users to efficiently organize their everyday life, and making sure they keep up to date with any tasks they are want or need to accomplish. Users must sign up for an account and only then will they be able to create, read, update, and delete tasks of their choosing.

## User Stories

- Users can register for an account
- Users can log into their account
- Users can create a task
- Users can edit task description and due dates
- Users can check off tasks
- Users can delete tasks
- Users can create items within the task
- Users can edit and delete items within the task

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Friday, September 11th (Day 1)| Project Description / Wireframes / Priority Matrix / Timeline `backend` & `frontend`/ Deployment | Complete
|Saturday, September 12th (Day 2)| Working on custom authentication | Complete
|Sunday, September 13th (Day 3)| Working on building out models | Complete
|Monday, September 14th (Day 4)| Finishing up `backend` | Complete
|Tuesday, September 15th (Day 5)| Start fetching data into the `frontend` | Complete
|Wednesday, September 16th (Day 6)| Continue working fetching data into the `frontend` | Complete
|Thursday, September 17th (Day 7)| Fixing breakcases| Complete
|Friday, September 18th (Day 8)| Post-MVP & CSS in the `frontend` | Complete
|Saturday, September 19th (Day 9)| Fixing Bugs | Complete
|Sunday, September 20th (Day 10)| Fixing Bugs | Complete
|Monday, September 21st (Day 11)| Finish Documentation | Complete
|Tuesday, September 22nd (Day 12)| Presentations | Incomplete

## Wireframes

[Mobile](https://res.cloudinary.com/dpggcudix/image/upload/v1599924395/Screen_Shot_2020-09-12_at_11.25.32_AM_k8bnis.png) <br>
[Desktop](https://res.cloudinary.com/dpggcudix/image/upload/v1599924395/Screen_Shot_2020-09-12_at_11.25.48_AM_gyomgs.png)


## Time / Priority Matrix 

[Time / Priority Matrix](https://res.cloudinary.com/dpggcudix/image/upload/v1599916688/Screen_Shot_2020-09-12_at_9.17.49_AM_xaavgs.png)

## MVP / PostMVP

#### MVP 

:white_check_mark: Registration Feature <br>
:white_check_mark: Login via Username and Password <br>
:white_check_mark: Task Homepage <br>
:white_check_mark: Deployment <br>
:white_check_mark: Hamburger menu  <br>
:white_check_mark: Navigation bar <br>
:white_check_mark: Mobile First <br>
:white_check_mark: Creating Tasks/Lists <br>
:white_check_mark: Updating Tasks/Lists <br>
:white_check_mark: Deleting Tasks/Lists <br>
:white_check_mark: Landing page <br>

#### PostMVP 

:white_circle: Search Bar <br>
:white_circle: Archived Section <br>
:white_circle: Different Themes <br>
:white_circle: Refactoring <br>
:white_circle: Fixing up bugs <br>

## Functional Components

### MVP
| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Authentication | H | 2hrs | 2hrs | 2hrs |
| User Dashboard / Homepage | H | 3hrs | 1hr | 1hr |
| Deploying Frontend | L | 0hr | 0hr | 0hr |
| Mobile Responsiveness | H | 3hrs | 1hr | 1hr |
| Hamburger Menu | M | 1hr | 0hr | 0hr |
| Navigation Bar | H | 1hr | 0hr | 0hr |
| CRUD Tasks | H | 10hrs | 10hrs | 10hrs |
| Total | H | 20hrs| 14hrs | 14hrs |

### PostMVP
| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Search Bar | L | 5hrs | 0hr | 0hr|
| Archived Section | L | 3hrs | 0hr | 0hr|
| Different Themes | L | 5hrs | 0hr | 0hr|
| Refactoring & Fixing Bugs | L | 10hrs | 10hr | 10hr|
| Total | H | 23hrs| 10hrs | 10hrs |

## Additional Libraries

 - [FontAwesome](https://fontawesome.com/)
 - [Vue](https://vuejs.org/)
 - [Buefy](https://buefy.org/)

## Code Snippet

```
<input type="checkbox" v-bind:id="task.id" v-bind:checked="task.completed" v-bind:name="task.name" @click="checkComplete" v-bind:class="{taskName: editTaskName == task.id}">
```

This one line of code helps make the checks function. The reason why I added all these binds was to make sure I can grab the data when I need to use it for the information required for the check methods.
