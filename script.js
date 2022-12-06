const quoteContainer = document.getElementById('quote-container')
const quoteText =   document.querySelector('#quote')
const authorText = document.querySelector('#author')
const newQuoteBtn = document.querySelector('#new-quote')
const tweetBtn = document.querySelector('#twitter')
const loader = document.querySelector('#loader')


let apiQuotes = []

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true
}

// hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false
}
    
// show new quote
function newQuote() {
    loading()
    // pick a random quotes from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // console.log(quote);

   
//  check if author is blank
    if (quote.author == null) {
        authorText.textContent = 'Unknown'
    }
    else {
        authorText.textContent = quote.author
    }

    // check quote length to determine styling
    if (quote.text.length > 70) {
        quoteText.classList.add('long-quote')
    }
    else {
        quoteText.classList.remove('long-quote')
    }

    // Set quote, hide loader
    quoteText.textContent = quote.text
    complete()
}

// Get Quotes From API
async function getQuotes() {
    loading()
    const apiURL = "https://type.fit/api/quotes"
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // catch error here
    }
}

// tweet function
function tweetQuote() {
    const tweetURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(tweetURL, '_blank')
}

//  assign new quotes to New Quote Button
newQuoteBtn.onclick = newQuote
// assigning tweet quote button
tweetBtn.onclick = tweetQuote

// On Load
getQuotes();



