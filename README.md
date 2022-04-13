A03 SPA
======================

Bootstrapped with Create Snowpack App (CSA) and slightly modified with the development environment.

# Demo:
  
![Demo-Gif](https://user-images.githubusercontent.com/70851390/163287174-9dc1058c-5227-4a7f-aa1c-b30a67995b97.gif)
  

# Run Instructions:

1. npm run build
2. npm start

# Prerequisite:
Node.js and npm are already installed on your system.

# Requirements:

F1: PWD Functional requirements


1. The application should be a single page application.

2. The user shall be able to open multiple windows (not browser windows/tabs but custom windows created using the DOM) within the application.

3. The user shall be able to drag and move the windows inside the PWD.

4. The user shall be able to open new windows of the desired application by clicking or double clicking an icon at the desktop.

5. The icon used to close the window should be represented in the upper bar of the window.

6. Windows should get focus when clicked/dragged.

7. The window with focus shall be on top of all other windows.

<hr>

F2: PWD Non functional requirements

1. The code standard standard.js should be followed.

2. All exported functions, modules and classes should be commented using JSDoc.

3. The linters should pass without notices when running npm test.

4. The code shall be organized in appropriate ES modules, at least four (4).

5. The application shall be visually appealing.

<hr>

F3: Memory game window application

These are the requirements for the Memory application that should exists as a window application in the PWD.

1. The user should be able to open and play multiple memory games simultaneously.

2. The user should be able to play the game using only the keyboard (accessability).

3. One, by you decided, extended feature for the game.

<hr>

F4: Chat window application

The chat application should exists as a window application in the PWD. The chat application shall be connected to other students chats via a web socket-server.

1. The user should be able to have several chat applications running at the same time.

2. When the user opens the application for the first time the user should be asked to write his/her username.

3. The username should remain the same the next time the user starts a chat application or the PWD is restarted.

4. The user should be able to send chat messages using a textarea.

5. The user should be able to see at least the 20 latest messages since the chat applications was opened.

6. One, by you decided, extended feature.

<hr>

F5: Alarm window application

1. The user should be able to set a time in the calendar.

2. Once the scheduled time has been reached, the alram sound should play

3. It should be possible for the user to turn off the alarm sound.

# How the project has been done:

1. For each feature (F1, F2 and so on) you have implemented, write a 5-10 sentences text about it and let the teacher know how you solved it. This is essential. There is no grade if you fail to write about the features.

The spa was created by ensuring that all the functionalities will be executed without needing to refresh the page.
All windows will be added to the single page using Document Object Model (DOM), the DOM is a tree structure that represents the HTML document and its elements as well as their attributes and CSS.
The drag and move function were done by using the mouse event, which will control the element's position by changing the CSS elements according to the clientX and clientY (using javascript).
The closing functionality will close the window by checking The DOM Tree of Objects and removing the element from the DOM.
The opening functionality will open the window by adding the element to the DOM.
Even though all windows will be added to a single page, each one of them is a different object, and each one of them will have its controls.
The user will be able to play multiple memory games simultaneously by clicking on the memory game button, and each one of them has its shadow root.
The variable attempts will be used to keep track of the number of attempts the user has made, when the user wins the game, a message will be displayed with the number of attempts.
Every time the user clicks on the chat button, the chat window will be added to the DOM, and the chat window will be removed when the user clicks on the close button, so the user will be able to have several chat windows.
When the user starts a chat window, the local storage will be checked if it contains a username or not, it does not, so by using JavaScript and input box, the user will be asked to enter a username, and the username will be saved in the local storage.
In case the Local Storage contains the username, the username will be displayed in the chat window, and a div will be created to display the messages.
The user will be able to send their messages by using a textarea with 3 rows.
The user will be able to see all the old messages by using the scroll bar.
The user can choose to reset all messages by clicking on the reset button, to remove all the child elements from the div.
The user can start multiple alarm windows and each one will track its own time, and the user can stop the alarm by clicking on the clean alarm button.
The user will be asked to enter the date, hour, minute, and second by using input element type (DateTime-local), and the alarm will be set to the date and time the user entered.
The time on the screen will be updated every second, by using the setinterval function.
The current time and the alarm time will be compared, if the current time is less than the alarm time, the alarm will be triggered, and the audio will be played.
The user can close the alarm window by clicking on the close button, and the alarm will be removed from the DOM.

2. Write a concluding text, 5-10 sentences, about your implementation of the project. Write about hard/easy, troubles/solutions, and so on, things you encountered and thought of during the project and its implementation.
In the beginning, it was a little bit hard to understand the difference between the attributes and the properties, and how to use them or reassigned them.

When it comes to the memory game, I had a hard time stopping different windows from interacting with each other.
The solution was easy, away from using the shadow root, which is a way to create a new scope for the DOM tree, and it will be used to create a new scope for the memory game; the main problem was
that I tried to use variables such as var, let and const, which will not be used in a solitary state, and it will be used in a global state, which is not good. Because different windows will use the same variable and the same event listener.
In the end after understanding the DOM tree, I was able to understand how to use the shadow root, and how to use the event listener. Also, it took me a considerable amount of time to grasp the idea of both attributes and properties.

# Link to the Demonstration:
https://youtu.be/30nj8I_Cp30

