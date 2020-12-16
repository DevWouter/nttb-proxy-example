var text = "Click on the button to fetch data from nttb-ranglijsten site";
var stepSize = 50;

for (var i = 0; i < text.length; ++i) {
    const delay = stepSize * (i + 1);
    const sub = text.substring(0, i + 1);
    console.log(`After ${delay} set code to "${sub}"`);
    setTimeout(() => {
        document.querySelector("code").innerText = sub;
    }, delay);
}

async function fetchRemote() {
    const fetchResult = await fetch('/sb/api/buffer/sbdis01.json');
    const fetchBody = await fetchResult.text();
    document.querySelector("code").innerText = prettyJson(fetchBody);
}

function prettyJson(text) {
    return JSON.stringify(JSON.parse(text), undefined, 2);
}