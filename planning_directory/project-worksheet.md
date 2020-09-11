# Project Overview

## Project Description

For Project Four of the General Assembly SEI course, I was assigned to create a mobile first web application that shows my knowledge and understanding of CRUD and RESTful APIs. The requirements for this project consisted of using Python and Django in the backend, and using HTML, CSS, and Django in the frontend. The backend is deployed via Heroku, while the frontend is deployed via Netlify.

For this project, I will be building a task management application. The purpose of this task management application is to allow users to efficiently organize their everyday life, and making sure they keep up to date with any tasks they are want or need to accomplish. Users must sign up for an account and only then will they be able to create, read, update, and delete tasks of their choosing.

## User Stories

- Users can register for an account
- Users can log into their account
- Users can create a task
- Users can edit tasks
- Users can also cross off tasks
- Users can delete tasks
- Tasks will be ordered by date

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Friday, September 11th (Day 1)| Project Description / Wireframes / Priority Matrix / Timeline `backend` & `frontend`/ Deployment | Complete
|Saturday, September 12th (Day 2)| Working on custom authentication | Incomplete
|Sunday, September 13th (Day 3)| Working on building out models | Incomplete
|Monday, September 14th (Day 4)| Finishing up `backend` | Incomplete
|Tuesday, September 15th (Day 5)| Start fetching data into the `frontend` | Incomplete
|Wednesday, September 16th (Day 6)| Continue working fetching data into the `frontend` | Incomplete
|Thursday, September 17th (Day 7)| Fixing breakcases| Incomplete
|Friday, September 18th (Day 8)| Post-MVP & CSS in the `frontend` | Incomplete
|Saturday, September 19th (Day 9)| Fixing Bugs | Incomplete
|Sunday, September 20th (Day 10)| Fixing Bugs | Incomplete
|Monday, September 21st (Day 11)| Finish Documentation | Incomplete
|Tuesday, September 22nd (Day 12)| Presentations | Incomplete

## Wireframes

- [Mobile](https://res.cloudinary.com/dpggcudix/image/upload/v1598051059/Screen_Shot_2020-08-21_at_7.03.51_PM_y3anyn.png)
- [Desktop](https://res.cloudinary.com/dpggcudix/image/upload/v1598051059/Screen_Shot_2020-08-21_at_7.03.36_PM_mjwsgq.png)


## Time / Priority Matrix 

- [Time / Priority Matrix](https://res.cloudinary.com/dpggcudix/image/upload/v1598048081/Screen_Shot_2020-08-21_at_6.14.31_PM_tdxcxn.png)

## MVP / PostMVP

#### MVP 

:heavy_check_mark: Login with Username and Password <br>
:heavy_check_mark: Mobile responsiveness first <br>
:heavy_check_mark: User Dashboard / Homepage <br>
:heavy_check_mark: Deploy frontend <br>
:heavy_check_mark: Hamburger menu  <br>
:heavy_check_mark: Navigation bar (Fixed) <br>
:heavy_check_mark: Video thumbnails displayed on homepage <br>
:heavy_check_mark: Navigating to video when clicked <br>
:heavy_check_mark: Ability to comment (CRUD) <br>
:heavy_check_mark: Abilty to like and dislike <br>
:heavy_check_mark: Meet the team page <br>
:heavy_check_mark: Landing page <br>

#### PostMVP 

:heavy_check_mark: CSS Animations <br>
:construction: Search Bar <br>
:construction: More User Customization <br>
:construction: Dark Mode <br>
:heavy_check_mark: Refactoring <br>
:heavy_check_mark: Fixing up bugs <br>

## Functional Components

### MVP
| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Authentication | H | 1hr | 2hr | 2hr|
| User Dashboard / Homepage | H | 3hr | 2hr | 2hr|
| Deploying Frontend | L | 0hr | 0hr | 0hr|
| Mobile Responsiveness | H | 3hr| 6hr | 6hr |
| Hamburger Menu | M | 1hr | 3hr | 3hr|
| Fixed Navigation Bar | H | 1hrs| 0hr | 0hr |
| Video Thumbnails | H | 3hr | 2hr | 2hr |
| Navigating to seperate page | H | 3hr | 0hr | 0hr |
| Total | H | 15hrs| 15hrs | 15hrs |

### PostMVP
| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| CSS Animations | L | 10hr | 6hr | 6hr|
| Search Bar | L | 3hr | 0hr | 0hr|
| More User Customization | L | 4hr | 0hr | 0hr|
| Dark Mode | L | 2hr | 0hr | 0hr|
| Refactoring & Fixing Bugs | L | 10hr | 6hr | 6hr|
| Total | H | 29hrs| 12hrs | 12hrs |

## Additional Libraries

 - [Bootstrap](https://getbootstrap.com/)
 - [FontAwesome](https://fontawesome.com/)
 - [Vue](https://vuejs.org/)

## Code Snippet

```
showVideo: function(id) {
            fetch(`${this.devURL}/videos/${id}`, {
                method: "get",
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((data) => {
                this.videoSource = "https://youtube.com/embed/" + data.data.videoID 
                this.video_title = data.data.title
            })
        }
```

This code above represents how we get to display one video on the video player page when you click on it in the video homepage. We had to make sure the source of our video would be a link to the actual youtube video with it's very own Youtube ID. Luckily for us, the Youtube API allowed us to grab it's very own video ID. We just had to concatenate the video ID with the https://youtube.com/embed/. Each video has their unique ID, so we grab a different one for each video, and a the video player will be able to play the unique one. 

## Issues and Resolutions

One of the main issues this project had was the comments section, and specifically opening up the update and delete textarea or option. When you press on one of the update comment button or delete comment button, we only wanted it to pop up for just one of the comments. Initially, when we did that, all the comments would open up their update div or their delete div, even though it wasn't suppose to be the case. The right scenario would be to open up the div only for the comment it was choosing to update/delete, and not all. 

Jeremy helped us out on this one, and we used a v-if statement. Instead of linking the data to a boolean value, we did it with a number instead, and we chose 0. Everytime we click an update button, the update button would recieve a ID toggled on to it that is equal to the comment ID, and therefore if the ID of the divs that pop open when you click on the the buttons are equal to the ID of the buttons, it would open, but only if it equates to the button's ID. This ID is the same because they both are linked to the comment's ID through v-bind:id. Since the comments are unique, only the selected on get's opened while the other ones don't because their ID's don't match. 