var text = "This is some cool stuff";
var stepSize = 300;

for (var i = 0; i < text.length; ++i) {
    const delay = stepSize * (i + 1);
    const sub = text.substring(0, i+1);
    console.log(`After ${delay} set code to "${sub}"`);
    setTimeout(() => {
        document.querySelector("code").innerText = sub;
    }, delay);
}