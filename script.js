const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new quote
function newQuote() {
  loading();
  //Pick a random quote from apiQuotes array
const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check quote length to determine styleing
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// Get quotes from API
async function getQuotes() {
    loading();
    //create proxy server to complete api call to apiUrl
    const proxyUrl = 'https://blooming-beyond-22573.herokuapp.com/';
    const apiUrl = 'https://type.fit/api/quotes';
    try {
      const response = await fetch(proxyUrl + apiUrl); // get JSON from api
      apiQuotes = await response.json(); // turn JSON into an object and pass into variable
      newQuote();
    } catch (error) {

    }
}

//tweet a quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  //open in new tab('_blank')
  window.open(twitterUrl, '_blank');
}

//Event Listeners

newQuoteBtn.addEventListener('click',  newQuote);
twitterBtn.addEventListener('click', tweetQuote);


//onLoad
getQuotes();
