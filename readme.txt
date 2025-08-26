https://app.eraser.io/workspace/GlhY2F7ltehsjZ2z9phZ
link to eraser notes

MERN Stack Tutorial for Beginners - Deployment Included


MERN STACK
*mongodb-database place where we store data
*express-web framework  its a ready to use toolbox for building web apps faster and more easily
saves time,makes code cleaner and organized , handles common tasks like routing , error handling..
*react-frontend library  
*nodejs-runtime  its a javascript runtime that allows u to run js on server

frontend=react+js
backend=node+js

make backend and frontend folders..
cd backend
and then <npm init -y
this will create a package.json

<npm install express@4.18.2
this will give us package_lock.json and node_modules

make a file in backend named server.js/app.js/run.js

make change in package.json =>"type": ,"module",  its done so we can add the line const express = require('express'); in server.js

now code in server.js

import express from "express";
const app= express();
app.listen(5001,()=>{
    console.log("Server startted on port 5001");
});

>node server.js


in package.json we have scripts...in that we have key and their action
if we put a key like:
=>"dev":node server.js

and run this dev key>npm run dev
internally it will run >node server.js

likewise we can add as many key's as possible


routes like app.get with req and res will be made
and after saving the routes if we go on chrome and =>localhost:5001/api/notes(this can be said as request of us users)
then it will shouw the res.send text of our code
this is how we create api

API(application programming interface)
-it allows two different apps talk to each other
we use REST API's
-everything in arrest api is a resource, and resources are identified by URL..ex:/api/notes.
-
-it uses http methods:
*GET:to get data, reads , get some posts on insta
*POST:to create new data, creates, create  post
*PUT:to update existing data, updates, update a post
*DELETE:to remove data, deletes , delete a post

HTTP STATUS CODES
-100: informational
-200: success
       200:OK
       201:CREATED
     
-300: redirection
        301:MOVED PERMANENTLY
-400:client errors (when problem is on the users side)
	400:BAD REQUEST
	401:UNAUTHORIZED
	403:FORBIDDEN
	404:NOT FOUND
	429:TOO MANY REQUESTS
      
-500:server errors (something goes wrong on the server side)
	500:INTERNAL SERVER ERROR
	503:SERVICE UNAVAILABLE

in code we can edit and add status code with =>res.status(200).send("you got 5 notes");
-ENDPOINT:
is a combination of url+http method that lets client interact with specific resource



we see that after every change in code we have to kill the terminal amd re run to see the changes..
so we use  >npm install nodemon -D
here D is install as dev dependency
in package.json we get nodemon in dev dependency
now in scripts...we should change node to nodemon
=>"dev":"nodemon server.js",
and we can run in terminal as usual >npm run dev
it will run as usual but also has now included watching every single change

now in production we also use a script called start, we dont just go with dev
=>"start":"node server.js"
while developing we will use dev ...so that all changes are being reflected, but once we deploy we use start script command bcx we dont want any changes to reflect after deployment



=>app.post("/api/notes",(req,res)=>{
    res.status(201).json({message:"post created successfully"});
})

app.put("api/notes/:id",(req,res)=>{
    res.status(200).json({message:"post updated successfully"});
})

now to update/delete we need id...
the id will point to what node to update 
id can be anything, its dynamic

we will Make a routes folder in backend and init file notesRoutes.js to make our code modular and easily manageable 

now in server.js we have many api's or routes..all those we will comment out
and to make connection or use the notesroutes.js in server.js..we will
=>import notesRoutes from "./routes/notesRoutes.js";
 and they /api/notes path common so we will make it such a way that we dont have to write it always ..as:
=>app.use("/api/notes",notesRoutes);


in notesroutes.js:
we import express 
make a router
now for all api's we will use router instead of app
=>router.get("/",(req,res)=>{
res.status(200).send("you got 20 notes");
});


we can further make it more arranged by making controllers folder where =>(req,res)=>{
res.status(200).send("you got 20 notes");
}
is a controller....
make notescontroller.js file in controllers folder

all the controllers we can place in notescontroller.js as
=>export function getAllNotes(req, res) {
    // This function handles the GET request to fetch all notes
    res.status(200).send("you fetched notes");
}

as an arrow fn or normal fn

and in notesroutes.js make the changes as
=>import {getAllNotes} from "../controlllers/notesController.js"; 
the routes in this becomes
=>router.get("/", getAllNotes);


repeat for all controllers

create src folder in backend folder nd move controller , routes,server.js in it

now our application will crash bcz in package.json in scripts the dev has server.js route but now its moved to src folder...so make necessary changes there 
also "main":"index.js", before now make it =>"main":"src/server.js"


MONGO DB
in mongodb when we make new project select driver so we can use db using node js
copy the connection string
mongodb+srv://afshanjabeen602:jzcXr4LmzP7Xox7Y@cluster0.eeuzxtv.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0
network access-add ip address make it accessible from anywhere
>npm install mongoose@8.14.3

make folder 
config->in src
make file
db.js->in config

in db.js
import mongoose
then make a fn called connectDB
use try catch block
make db connection using mongoose.connect("copy paste ur connection string here");
this connect will take time so write await 
export the file fn
if error occurs....process should exit
process.exit(1);-------status code 1 means exit with failure, if 0 means success



go to server.js
import the connectDB from the path and 
we can call the method 
connectDB();

to give name to db we write the name of db before ? in connection string
"mongodb+srv://afshanjabeen602:jzcXr4LmzP7Xox7Y@cluster0.eeuzxtv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
make it
"mongodb+srv://afshanjabeen602:jzcXr4LmzP7Xox7Y@cluster0.eeuzxtv.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0"

this file might seem working well but when we upload our project on GitHub..anyone can see our connection string 
this is why we use .env file 
under backend->.env

in .env
copy paste connection string in variable MONGO_URI
now to access this environment variable from .env...we need a package
>npm i dotenv

in server.js we need to configure dotenv to use it else it will declare undefined

in db.js replace connection string with =>process.env.MONGO_URI

in dotenv we keep secret code...in GitHub we can hide this file using gitignore  

put port in .env as well

call it in server.js using
=>const PORT=process.env.PORT || 5001
|| means if its undefined then by default we call 5001

replace 5001 with PORT in server.js
in src->folder models->file note.js
in note.js, import mongoose
1.create the schema 
the note fields will have title,content and time created at and updated at
required:true if its necessary field


after preparing schrma , 2.make model based off of that schema
after model we move onto controllers
go to controllers...

through the exporting fn getallnotes we fetch all notes
we copy paste the end point in postman it initially gives us an empty array


we can get the notes in postman 
we can post the notes title and content
we can update using....the url as it is but adding the id bcz in notesroutes.js for updating notes we have made id in url ..so add the id like http://localhost:5001/api/notes/686c0a0f7e31010ac1d4e670 and just chnage the content
to delte we use the id of the note we want to delete 
we sen delete request and in body send none

in postman we get in order
first then second
we can reverse this order
go to notescontroller.js
     =>   const notes=await Note.find().sort({createdAt:-1}); 
use sort ns -1 shows the newest first
by default its 1
in server.js we added express middleware fn its necessary to access the req.body from postman , its done before defining the routes
MIDDLEWARE
its a fn that runs in the middle btwn the request and response

client sends request to server
from server we get response...right before response comes it gets through middleware...we can dosmthng in middleware
we use =>app.use() to use middleware
=>app.use((req,res,next)=>{ // Custom middleware to log requests
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`); // Log the request method and URL   //it will show in the console/terminal right before we get the response and as soon as we send the response
    next(); // Call next() to pass control to the next middleware or route handler
});

use cases of middleware
1.authentication check  ex.instagram we send request to make a new post , right before server sends the response it will authenticate 
2.RATE LIMITING  its a way to control how often someone can do something on a website or app like how many times they can refresh a page , make a request to an api or try to login  
429 status code---TOO MANY REQUESTS
rate limiting prevents abuse and protects server from getting overwhelmed

for this we use upstash 
we use redis it will work like key value storage , its like no sql database 
login and create db
from upstash get the end point as=>UPSTASH_REDIS_REST_URL=https://lasting-kodiak-56348.upstash.io

and token as =>UPSTASH_REDIS_REST_TOKEN=AdwcAAIjcDFkZGYxZmE5MmZkY2M0ZTI1ODJiOGFjZTk1YjE5NjRmM3AxMA

to use rate limit we should install some package
>npm i @upstash/ratelimit@2.0.5 @upstash/redis@1.34.9


once rate limit hits in upstash it stays for 0sec time to live so it wont show immediately to see increase the time to 60s


we observe that in terminal first our app/server starts then connects to database
but we want first connect to db then start server

so in place of
=>connectDB();
=>app.listen(PORT,()=>{
            console.log("Server started on port :",PORT);
        });
replace with
=>connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server started on PORT:",PORT);

    });
});




-----------------------------------------------------------------------------------FRONTEND------------------------------------------------------------------------------------------------
open a new terminal let the backend terminal running
>cd frontend
>npm create vite@6.5.0 .
select react
select javascript
--we will get all the folder structure
>npm install
now we get the url to boiler page of vite+react
we will have different pages ...we need to route them for it
>npm i react-router   //earlier known as react-router-dom
for notifications we will use
>npm i react-hot-toast


in src->main
delte app.css 
delete the content of app.jsx and index.css
dlt everything in assests

install the extension es7 then below will work

app.jsx=>rafc
                    
else manually type
=>const App=()=>{
return(
<div>App</div>
)
}
export default App

main.jsx
under strictmode
=><BrowserRouter>
    <App />
    </BrowserRouter>
our app is wrapped in routes and we can create pages in app.jsx


in src make a folder pages
in pages make file homepage.jsx and createpage.jsx and notedetail.jsx
in homepage.jsx
=>rafce     //for boiler code

in vite react homepage change urls that we mentioned in App.jsx
we can view the pages
go to react hot toast 
we already installed it we should put the toaster in our code in main.jsx

DAISY UI
tailwind library

install it version 4.12.24
the copy paste the next code on how to use in tailwindconfig.js inside plugins
in daisy ui:
we can check in components different button , dropdown etc.
whatever button we want we can copypaste jsx
we can also select theme from the left menu and more
themes:
slect whatever u want
go to tailwind.config.js 
after plugins make daisyui object 
and make a themes array 
=>daisyui:{
themes:["light","dark","forest"],
},

then go to app.jsx and in div right after return..include =>data-theme="forest"


ALL SETUP DONE

in our application we are using lots of diff icons
for this we will install extension
>npm i lucide-react
>npm i axios  // to replace or fetch api

in src make components folder and within make navbar file

for homepage we need also an element ratelimit
so make ratelimitedui file in components

CORS(CROSS ORIGIN RESOURCE SHARING )
Its a browser security rule
when a website tries to get data from another website like youe frontend calling an API on a different  domain the browser might block it for security reasons 

ex frontend localhost is trying to fetch api....thats diff origin ..so we should make sure api allows this
for this in backend we should add middleware in server.js also install 
>npm i cors@2.8.5
 

cors middleware code should be before ratelimitter



under components make a file NoteCard.jsx
in our card for time format we make lib folder in src
in lib folder, we make utils.js

in utils.js, put formatter fn


in home and other folders we have to always type full http:........
so tomake it easier we create a file axios.js in lib folder

when attaching delete functionality we need to pass note id so that we know which node has been deleted
also when deleting it goes to page cuz its alink but we want to restrict it so make the default behaviuor prevent
once delete is done the ui is not updated on its own
all the notes are stored in usestate of homepage.jsx
once we delete we wanna filter out the deleted note so use setNOtes in homepage

for notedetail page we need to get the id of the page so we use HOOK called useParams

------------*****DEPLOYMENT****--------------------
FIRST :
    we will push code live on GitHub
SECOND: 
we will use a platform "render.com" as it has free plan























