
![Screenshot Capture - 2024-03-30 - 10-22-50](https://github.com/career-tokens/pdf-maker-ai/assets/134730030/ba03cb5b-f41e-4a76-b90f-9156847b8c60)


<h1 align="center" id="title">Prompt2PDF</h1>

<p id="description">A full stack app where you can give prompt to AI to generate code, make suitable changes in it and then convert the final code to PDF which you can download.</p>
<br/>
<h2>😔Why the project is not deployed?</h2>
The project uses <h3>vm2</h3> which cannot be compiled in NextJS and hence needs separate backend. Most of the backend deployment services have become paid , and I am
pretty much broke to use them. Render does have a free tier but it takes a lot of time to wake up when its idle so pretty much you need to keep waiting for 3-4 min
till it starts working whenever making a call.Hence the project could not be deployed <h3>YET</h3>
<br/><br/>
<h2>🎬 Video Demo</h2>
https://res.cloudinary.com/dxprcmmcz/video/upload/v1711783275/2024-03-30_12-42-26_veszjg.mkv
<br/><br/>
<h2>📦Project Screenshots:</h2><br/>


### Step 1: Get started and authenticate yourself (implemented using Clerk authentication) <br/><br/>
![Screenshot Capture - 2024-03-30 - 10-28-29](https://github.com/career-tokens/pdf-maker-ai/assets/134730030/c19fe9cb-aa21-47e4-95d7-8f392574d82c)

<br/><br/>

### Step 2:You will find a code editor with an example react component already present and the corresponding PDF being generated<br/><br/>
![Screenshot Capture - 2024-03-30 - 11-24-29](https://github.com/career-tokens/pdf-maker-ai/assets/134730030/ec73201d-5ab9-40f1-9fd3-fca70262b9c4)
<br/><br/>

### Step 3:Now you want to generate your own component for the UI of lets say an invoice using AI, So first choose a model!<br/><br/>
![Screenshot (1)](https://github.com/career-tokens/pdf-maker-ai/assets/134730030/cdc3b882-a4b0-426d-9af6-eac1b8515b55)

### Step 4:Now you will have to give the corresponding API key !<br/><br/>
![Screenshot (2)](https://github.com/career-tokens/pdf-maker-ai/assets/134730030/7ee61945-d441-42e9-8459-344e12b779d3)

### Step 5:Now lets give the prompt and the code sent will be displayed on the code editor built using Monaco!<br/><br/>
![Screenshot (3)](https://github.com/career-tokens/pdf-maker-ai/assets/134730030/76ed3d5c-b3db-47d1-85bf-6d138bd52d1d)


### Step 6:But we will need to make some changes since the response has some extra unnecessary jargon which needs to be removed so that we get a proper react component.Like here lets remove ``` jsx and ending ```!<br/><br/>
![Screenshot (4)](https://github.com/career-tokens/pdf-maker-ai/assets/134730030/454c1e10-a907-4b3a-8965-a8561057403c)

### Step 7:Now lets generate the PDF! As you can see we get a beautifully styled PDF. Obviously improvements are required but you know how to use the tool now.<br/><br/>
![Screenshot (5)](https://github.com/career-tokens/pdf-maker-ai/assets/134730030/908de725-a6f5-46dc-b282-a82b5df37446)

<br/><br/>

  
<h2>💻 Built with</h2>

Technologies used in the project:

*   NextJS
*   TailwindCSS
*   Clerk Authentication
*   Framer motion for animation
*   Sonner for beautiful Toast
*   GPT API
*   Google Gemini API
*   OneDoc API
*   Node and Express for separate baskcend
*   vm2 for converting code in string format to code and returning back html<br/><br/>
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   Built with latest technologies like NextJS TailwindCSS.
*   Cool Landing Page made using Aceternity UI.
*   Currently uses Clerk authentication 
*   Currently features two AI models-GPT4 and Gemini
*   Responsive app 
*   Use your API key stored only in your browser and select a model to send the prompt to
*   View the response code in a code editor-Monaco
*   Make necessary changes in the code and finally submit it for generating the PDF<br/><br/>

<h2>📚 Working of the app</h2>
* The landing page simply uses a component from Aceternity UI . You click on get started and it takes you to /generation page <br/><br/>
* Now in the generation page , Clerk authentication is integrated because of which you need to authenticate first , after authentication you will be able to view a 
profile button on the top left.<br/><br/>
*A state variable is used to store the react component in string format and is given an intial example component as string.Using useEffect hook , an intial POST 
request is made as soon as component loads to an api of the express server(with the codestring as request body) where using vm2  the code string is converted to code
and the resulting JSX is converted to html and returned to the client<br/><br/>
*This html (as code and not string)  is further sent as request body for a POST request to an api of NextJS server where using OneDoc API , the html is converted to
pdf data and sent back to the client.<br/><br/>
*A state variable meant to track changes in the pdf data gets updated and triggers re-render to display the PDF. This is how the example PDF gets loaded. 
<h4> The reason there is a separate backend for codestring->html is coz NextJS cant compile vm2</h4><br/><br/>
*Now its time to use AI<br/><br/>
*You can select a model using "ChooseModel" component where whatever model you choose , its name is stored in local storage// As soon as the viewPDF page gets loaded , the useEffect hook runs (being made to run only intially when the component loads) , a POST call is made to the backend server's api (at "/api/v1/getPDF") where the template and data is passed as requestbody (server won't be able to access localstorage so we will need to pass it from the client side) .<br/><br/>
*You will have to enter your own api keys and again they get stored in the browser.<br/><br/>
*Now you send the prompt , we use GeminiAPI or GPT4 API for getting the response , based on response the code string state gets updated and the reponse is shown 
in the code editor . You might need to modify the the response to get a proper react component and the changes are tracked internally.<br/><br/>
*Handling the changes in the code editor couldn't be done directly using onChange prop hence I implemented
a <h3>custom hook useEditor.js</h3> where it takes the setter function for the code string as prop and returns the function reference to target the code editor and 
change its value . The function refernce is then passed to onMount prop of the editor<br/><br/>
* Now when you change the code in the editor , the code string state also gets updated .<br/><br/>
* Now once you feel the code in the editor is valid react component , you ask to generate the PDF where (similar to how example PDF was made) the code string is
sent to the Node backend and converted to html and then it is sent to the OneDoc server for convertion to pdf data which is sent back to client and 
used for PDF generation.
*In case user does not give any APi key , toasts are used to notify about missing key.<br/><br/><br/>
<h2>🛠️ Installation Steps:</h2><br/>

<p>1. Clone the project</p>

```
git clone https://github.com/career-tokens/pdfGenerator
```
<br/>
<p>2. Go to the client folder</p>

```
cd client
```
<br/>
<p>3. Install dependencies</p>

```
npm install
```
<br/>
<p>4.Create .env file according to .env.example and make sure to put corresponding values to the environment variables.
Collect OneDoc API from their website</p>

<p>5. Run the frontend server:</p>

```
npm run dev
```
<p>6. Move to other terminal:</p>

<p>7. Move to server folder:</p>

```
cd server
```
<p>8. Create .env according to .env.example and fill the value:</p>

<p>9. Install dependencies:</p>

```
npm i
```
<p>10. Run the  server:</p>

```
nodemon index.js
```  
<p>11. Now both your frontend and backend is up and running:</p>

