// speeds are in ms between letters
const INITIAL_TYPING_DELAY = 600;
const HEADING_SWITCH_DELAY = 50;
const TYPING_SPEED = 60
const SUBTITLE_TYPING_SPEED = 30
const TYPING_VARIATION = 0
const TYPING_NEW_WORD_PAUSE = 0

// translation between page names and their keyword counterparts 
const webpages = {
    "Home": "index",
    "YouTube": "youtube",
    "Games": "games",
    "BALLoon" : "balloon",
    "MAGNET to a GUNFIGHT": "magnettoagunfight",
    "Dodgeblob": "dodgeblob",
    "Death in Strange Places": "deathinstrangeplaces",
    "Rivals Airshow": "rivals",
    "Molten": "molten",
    "Beast Hunter": "beasthunter",
    "Marble Mania": "marblemania",
    "RedUtils": "redutils",
}

// quick sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// plays a little animation that types out the heading of each page
async function loadInHeading() {
    let titleElements = document.getElementsByClassName("title")

    if (titleElements.length == 0) return;

    let titleElement = titleElements[0];
    let title = titleElement.innerHTML;
    console.log(titleElement.scrollHeight);

    while (titleElement.scrollHeight < 25)
    {
        await sleep(100);
    }

    console.log(titleElement.scrollHeight);
    var contentHeight = titleElement.scrollHeight;
    titleElement.style.height = contentHeight + "px";

    titleElement.innerHTML = ``;

    // waits a bit for the page to fade in
    await sleep(INITIAL_TYPING_DELAY);

    for (let i = 0; i < title.length; i++) 
    {
        await typeLetter(titleElement, i, title);
    }

    titleElement.classList.add("blink");

    let subtitleElement = document.getElementsByClassName("subtitle")[0];
    if (subtitleElement == null) 
    {
        return;
    }

    titleElement.classList.add("slide-up");
    subtitleElement.classList.add("fade-in");
}

async function typeLetter(target, index, text, typingSpeed=TYPING_SPEED)
{
    target.textContent += text.charAt(index);
    let pause = index > 0 && text.charAt(index - 1) == ' ' ? TYPING_NEW_WORD_PAUSE : 0;
    await sleep(typingSpeed + Math.floor(Math.random() * TYPING_VARIATION) + pause);
}

async function fetchHtml(address)
{
    let response = await fetch(address);
    return await response.text();
}

function fadeOut(obj)
{
    obj.classList.add("fade-out");
}

let text = {};

function stripHtml(html)
{
    var div = document.createElement('div');
    div.innerHTML = html;
    var scripts = div.getElementsByTagName('script');
    var i = scripts.length;
    while (i--) {
      scripts[i].parentNode.removeChild(scripts[i]);
    }
    return div.innerHTML.replace(/<[^>]*>?/gm, '');
}

async function getData()
{
    for(var name in webpages)
    {
        let link = webpages[name];
        text[name] = await fetchHtml("/" + link).then(text => {return stripHtml(text);});
    }
}

function sortDic(obj) {
    items = Object.keys(obj).map(function(key) {
        return [key, obj[key]];
    });
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    sorted_obj={}
    items.forEach(function(v) {
        use_key = v[0]
        use_value = v[1]
        sorted_obj[use_key] = use_value
    })
    return(sorted_obj)
}

function filter() {
    let searchField = document.getElementById("search");
    let searchResults = document.getElementById("search-results");

    searchResults.innerHTML = "";
    let searchTerms = searchField.value.toLowerCase().match(/[^ ]+/g);

    if (searchTerms == null)
    {
        if (!$('#results-collapse').is(":hidden"))
        {
            $('#results-collapse').dropdown('toggle');
        }
        return;
    }

    let results = {};

    for (let name in webpages)
    {
        let link = webpages[name];
        let pageContent = text[name].toLowerCase();
        let count = 1;

        for (let i = 0; i < searchTerms.length; i++)
        {
            let numOnPage = pageContent.split(searchTerms[i]).length; 

            for (let webpage in webpages)
            {
                if (webpage.toLowerCase().split(searchTerms[i]).length > 1)
                {
                    numOnPage = numOnPage - 1;
                }
            }

            count *= numOnPage;
        }

        if (count > 1)
        {
            if ($('#results-collapse').is(":hidden"))
            {
                $('#results-collapse').dropdown('toggle');
            }
            results[`<a class=\"list-group-item list-group-item-action\" href=\"/${link}\">${name}</a>`] = count;
        }
    }

    results = sortDic(results);

    let first = true;
    let mostResults;

    for (let item in results)
    {
        if (first)
        {
            mostResults = results[item];
            item = item.slice(0, 10) + "first " + item.slice(10);
            first = false;
        }
        else if (results[item] < mostResults * 0.2) continue;
        searchResults.innerHTML += item;
    }

    if (Object.keys(results).length == 0 && !($('#results-collapse').is(":hidden")))
    {
        $('#results-collapse').dropdown('toggle');
    }
}

function search()
{
    let form = document.getElementById("search-form");
    let first = document.getElementsByClassName("first");

    if (first.length > 0)
    {
        form.setAttribute("action", first[0].getAttribute("href"));
    }
}

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementBottom = reveals[i].getBoundingClientRect().bottom;
      var elementVisible = reveals[i].getBoundingClientRect().height * 0.8;
  
      if (elementTop < windowHeight - elementVisible && elementBottom > elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

document.addEventListener('DOMContentLoaded', async function() {
    loadInHeading();
    await getData();
    let searchField = document.getElementById("search");
    searchField.addEventListener('keyup', filter);
    document.addEventListener('submit', search);
    window.addEventListener("scroll", reveal);

    var mediaquery = window.matchMedia("(max-width: 768px)");
    if (mediaquery.matches) { 
        // on mobile
        $('.dropdown-toggle').not("#search").removeClass("dropdown-toggle");
        $('.auto-open').removeClass("auto-open");
    }
});