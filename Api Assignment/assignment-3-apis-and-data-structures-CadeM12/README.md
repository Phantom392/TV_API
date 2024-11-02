# CS20 Data Structures & DOM API Assignment

Find a free API of interest to you, create a website that “consumes” that API. In other words, your website should retrieve data from the API (using fetch) and do something meaningful with it.

## Requirements

- General Specs
    - Retrieves and makes use of data from an external API
    - Involves some amount of user interaction (eg. button clicks, text input, dropdown)
        - searching/filtering
        - selecting from options
        - clicking to reveal more details
    - Does not use alerts
    - File, variable, function, class, and id names follow naming conventions and are meaningful
- index.html
    - contains all standard HTML requirements and any static or structural elements
    - loads a JavaScript script from an external file
    - (optionally) loads an external CSS file
- JavaScript
    - uses fetch to retrieve data from an external API
    - manipulates and/or generates the HTML to display the data using the DOM API
- Bonus Features (not required)
    - Involves multiple pages (separate HTML files) or dynamically rebuilds a single page to simulate multiple pages (single-page-app)
    - Makes multiple API calls to get additional data based on user input
    - Styled with CSS
    - Dynamic styling (CSS manipulated by the JS)

## Assessment

This assignment will be used as the primary assessment for both Data Structures 1 and Client-Side Scripting 3. Your understanding and performance in the following areas will be assessed:

- creating/accessing/manipulating data structured as arrays and/or objects
- using structured data (arrays and/or objects) to manipulate/generate client-side elements
- writing clean, organized, and understandable code
- following project specifications

## Resources

Lists of Free APIs:

- [https://github.com/public-apis/public-apis](https://github.com/public-apis/public-apis)
- [https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/](https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/)
- [https://apipheny.io/free-api/](https://apipheny.io/free-api/)

JS Fetch Documentation: [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

## Authorization

Some APIs require some form of authorization to regulate websites’ use of their services. To use these APIs you often need to sign up for an account with the API, which then generates for an ‘API key’. Then depending on the API, there are a number of different ways you might need to use that API key.

- In-URL:
    - you might be instructed to simply include your API key somewhere in the URL that you send the fetch request to
    ```jsx
    fetch("https://someapi.com/api/YOUR_API_KEY/someendpoint").then(....
    ```
- Request Headers
    - “headers” are like meta-data for a request or response. They contain information about the device that sent the message among other things.
    - You can add data to the headers of your fetch request by supplying an optional second argument to fetch() which should be an Object which can contain (among other properties) a nested Object called “headers”. Any key-value pairs defined in “headers” will be add to the headers of the request.
    - eg: a API that uses the OAuth Token method of authorization might require a fetch request built like this:
    
    ```jsx
    const options = {
    	method: "GET", //this is the default but doesn't hurt to be safe
    	headers:{
    		Authorization: "token YOUR_TOKEN_HERE"
    	}
    }
    
    fetch("https://theapiurl/endpont/...", options).then(....
    ```
    
- A well documented API will have specific instructions on how to use their authorization method but, as always, don’t be afraid to google it
