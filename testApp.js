// This gives some height to the #app div so we can click it
document.querySelector('#app').style.height = '400px';

// This makes the #app div visible. Note that the CSS background-color is written backgroundColor in the DOM ;)
document.querySelector('#app').style.backgroundColor = '#ccc';

fetch('https://www.reddit.com/r/montreal.json')
.then(function(response) {
  return response.json(); // Parsing as JSON returns a Promise, let's chain it
})
.then(function(jsonResponse) {
  jsonResponse.data.children
  .map(function(post) {
    post = post.data; // Reddit has a weird format ;)

    // Create a box for each post
    var linkBox = document.createElement('p');

    // Create a link element for each post
    var link = document.createElement('a');
    link.setAttribute('href', post.url);
    link.setAttribute('target', '_blank'); // Make the link open in a new tab
    link.innerText = post.title;

    // Add the link to the paragraph
    linkBox.appendChild(link);

    // Return the paragraph from the map callback
    return linkBox;
  })
  .forEach(function(linkParagraph) {
    document.body.appendChild(linkParagraph);
  });
});


// document.body.addEventListener('click', function() {
//   console.log('The body was clicked!');
// })
// document.querySelector('#app').addEventListener('click', function() {
//   console.log('#app was clicked!');
// });

// document.querySelector('#theParagraph').addEventListener('click', function() {
//   console.log('#theParagraph was clicked!');
// });

// document.querySelector('#theLink').addEventListener('click', function(event) {
//   event.preventDefault(); // We need to do this otherwise we will leave the page if we click the link...
//   console.log('#theLink was clicked!');
// });


//**Smart event handler */
// var theList = document.querySelector('#theList');

// theList.addEventListener('click', function(event) {
//   // While `this` represents the #theList element, event has a property called `target` which represents the actual originator of the event. We can use this to our advantage!

//   // First, check if the target is an LI that is a direct child of the list:
//   if (event.target.parentNode === theList) {
//     // We definitely clicked on an LI
//     console.log('You clicked on: ' + event.target.innerText);
//   }
// });

// var listItems = document.querySelectorAll('#theList li'); // Select all the LIs inside #theList

// // It turns out that querySelectorAll does NOT return an array, but an array-like object called a NodeList
// // Here's one way we can iterate over the NodeList items, using the Array prototype
// Array.prototype.forEach.call(listItems, function(listItem) {
//   // Add one event listener per list item
//   listItem.addEventListener('click', function() {
//     console.log('You clicked on: ' + this.innerText);
//   });
// });

// event.stopPropagation()

// var app = document.querySelector('#app');
// var theLink = document.createElement('a');
// theLink.innerText = 'a link to google';
// theLink.setAttribute('href', 'http://www.google.com');
// app.appendChild(theLink);

// theLink.addEventListener('click', function(event) {
//     event.preventDefault();
//     console.log('Prevented browsing to ' + this.href + ' by using preventDefault');
//   });

// var theTitle = document.createElement('h1');
// theTitle.innerText = "Hello World";
// app.appendChild(theTitle);

// var theButton = document.createElement('button');
// theButton.innerText = "click here!";
// app.appendChild(theButton);

// theButton.addEventListener('click', function(){
//     theTitle.classList.add("red");
// });

// var textBox = document.querySelector('#textBox');
// var theButton = document.querySelector('#app button'); // CSS for "the element with tag name button inside the element with id app". We could also have given the button an ID

// function printValue() {
//     console.log(this.value);
//   }

// textBox.addEventListener('input', function() {
//   console.log(this.value);
// });

// textBox.addEventListener('input', printValue);

// theButton.addEventListener('click', function() {
// *  alert('The value of the input box is: ' + textBox.value);
// });

// theButton.addEventListener('click', function() {
//     // When the button is clicked, stop listening to input events on the input box
//     textBox.removeEventListener('input', printValue);
//   });