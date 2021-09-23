const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');


let apiQuotes = [];

// Show new quote
function newQuote() {
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
  quoteText.textContent = quote.text;
}
// Get quotes from API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
      const response = await fetch(apiUrl); // get JSON from api
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
