# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). <br><br>
This application was a project I did for the selection process of a programming team at my college.<br>
Consists of a task list with the features of saving data in LocalStorage, selecting items as done and deleting them.
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Explaning the code

### Js: 
This part basically consists of 7 sections,
1st. Using the moment library to add a clock to the project;<br><br>
2nd. A logic to make the white container slide animation.<br> Here I used a method, that when we click on the button to go to the create task section and back, we add and remove the word "active" in the classname of the container and the body, so the animation can be done entirely in css using this method different name.<br><br>
3rd. It is the creation of the data array, which is where the tasks and all the task creation logic with the inputs are kept and saving it in localStorage; <br><br>
4th. Creation of the trash array that is for the tasks already done and logic to save in localStorage; <br><br>
5th. The HadleCheck const would be to change a certain object from one array to another, it would be the equivalent of marking that task as completed; <br><br>
6th. Here the logic is the opposite of the previous one, it would be to remove it from the trash array and put it back in the data, to unmark the task as done.;<br><br>
7th. The delete button logic, which identifies which array the object is in and removes it from that localStorage, thus deleting it from the task list.
