




# Tech 

1️⃣ express

What it is: A lightweight framework for Node.js that makes it easy to build web servers and APIs.

Why we need it: Instead of writing raw Node.js HTTP code, Express gives us clean syntax for defining routes, handling requests, and sending responses.

2️⃣ mongoose

What it is: An ODM (Object Data Modeling) library for MongoDB.

Why we need it: It lets us define schemas for our data (tasks, users, monsters) and interact with MongoDB using JS objects instead of raw database queries.

3️⃣ cors

What it is: A middleware for Express that enables CORS (Cross-Origin Resource Sharing).

Why we need it: When the frontend (React, Vite) runs on a different port (like 5173) than the backend (like 4000), browsers block requests by default. cors allows the frontend to talk to the backend safely.

4️⃣ dotenv

What it is: A package to load environment variables from a .env file into process.env.

Why we need it: We can safely store sensitive info like database URLs or API keys without hardcoding them into our code.

5️⃣ nodemon (dev dependency)

What it is: A development tool that automatically restarts the server whenever you change a file.

Why we need it: Without it, every time you change index.js, you’d have to stop and start the server manually.

# Erros 

### In your gamified task manager:

Users can mark a task as “completed” multiple times.

You only want one completion per day to count towards streaks.

sameDay(lastCompletion, now) checks:

If the last completion date is today → reject the new completion.

If not → allow completion and update streak.

Without this, a user could spam “complete task” multiple times a day and artificially inflate their streaks or coins.


### request limit 403 status using node fetch
