// Include data for accessing Google APIs
// This web app has been written by Albert Sanchez

const apiKey = 'AIzaSyCvZ1J5-mVL9rb_bOajxidWL8sLak2hnOw';
const url = 'https://www.googleapis.com/urlshortener/v1/url';

//transformations

const $inputField = $('#input');
const $expandButton = $('#expand');
const $shortenButton = $('#shorten');
//const $responseField = $('#responseField');
const $copyurl = $('#copyurl');
const $output = $('#output');



// Ajax functions

//GET function

function expandUrl(){

    const urlToExpand = url + '?key=' + apiKey + '&' + 'shortUrl=' + $inputField.val();

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = function(){

    if(xhr.readyState === XMLHttpRequest.DONE)
    {var boshka = xhr.response.longUrl; valueInput(boshka);}

    }

    xhr.open('GET', urlToExpand);
    xhr.send();
}

function expand() {
  //$responseField.empty();
  if(document.getElementById('input').value){
  expandUrl();
  return false;
}
else{
    const invalidToExpand = 'There is no url to expand';
    valueInput(invalidToExpand);
    return false;
}
}

//POST function

function shortenUrl() {
    const urlWithKey = url + '?key=' + apiKey;
    const urlToShorten = $inputField.val();
    const data = JSON.stringify({longUrl: urlToShorten});

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = function() {
        if(xhr.readyState === XMLHttpRequest.DONE){ var boshka = xhr.response.id; valueInput(boshka);}

    }
    xhr.open('POST', urlWithKey);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);
}

function shorten() {
  //$responseField.empty();
  if(document.getElementById('input').value){
  shortenUrl();
  return false;
}
else{
    const invalidToShort = 'There is no url to compress';
    valueInput(invalidToShort);
    return false;
}
}


//Button triggers

$expandButton.click(expand);
$shortenButton.click(shorten);
$copyurl.click(toCopyClip);

//Display value in an input html tag

function valueInput(newUrl){

    document.getElementById('output').value = newUrl;
}

// Display when a url has been copied successfully

function messagecopied(){

    var successful = '✔ Url copied to clipboard, paste it to use it';
    var checkurl = document.getElementById('output').value
    if(checkurl[0] === 'h'){
    document.getElementById('copymessage').value = successful;
}
else{
    const addurl = '☓ There is no url to copy'
    document.getElementById('copymessage').value = addurl;
}
}


//Function to copy text

function toCopyClip() {
    let copyText = document.getElementById('output');
    copyText.select();
    document.execCommand("Copy");
    messagecopied();
}
