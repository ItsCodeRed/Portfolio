const webpages = {
    "Home": "index",
    "Marble Mania": "marble-mania",
    "RedUtils": "redutils",
    "YouTube": "youtube"
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadInHeading() {
    let heading = document.getElementsByClassName("heading")
    let title = heading[0].innerHTML;

    heading[0].innerHTML = "";

    for (let i = 0; i < title.length; i++)
    {
        heading[0].innerHTML = heading[0].innerHTML + title.charAt(i);
        await sleep(50 + Math.floor(Math.random() * 150));
    }
}

async function fetchHtml(address)
{
    let response = await fetch(address);
    return await response.text();
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
    let searchTerms = searchField.value.toLowerCase().split(" ");

    if (searchField.value.length == 0)
    {
        $('#results-collapse').collapse('hide');
        return;
    }

    let results = {};

    for (let name in webpages)
    {
        let link = webpages[name];
        let pageContent = text[name].toLowerCase();
        let count = 0;

        for (let i = 0; i < searchTerms.length; i++)
        {
            count += pageContent.split(searchTerms[i]).length - 1;
        }

        if (count > 0)
        {
            $('#results-collapse').collapse('show');
            results[`<a class=\"list-group-item list-group-item-action\" href=\"/${link}\">${name}</a>`] = count;
        }
    }

    results = sortDic(results);

    let first = true;

    for (let item in results)
    {
        if (first)
        {
            item = item.slice(0, 10) + "first " + item.slice(10);
            first = false;
        }
        searchResults.innerHTML += item;
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

document.addEventListener('DOMContentLoaded', async function() {
    loadInHeading();
    await getData();
    let searchField = document.getElementById("search");
    searchField.addEventListener('keyup', filter);
    document.addEventListener('submit', search);
});