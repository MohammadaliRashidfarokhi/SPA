A03 SPA
======================

Bootstrapped with Create Snowpack App (CSA) and slightly modified with the development environment.

# Run Instructions:

1. npm run build
2. npm start

# Prerequisite:
Node.js and npm are already installed on your system.

# Requirements 

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

