/* {
    "error": false,
    "category": "Dark",
    "type": "twopart",
    "setup": "Why do German showers have 11 holes?",
    "delivery": "Because Jews only have 10 fingers.",
    "flags": {
        "nsfw": false,
        "religious": false,
        "political": false,u'
        "racist": true,
        "sexist": false,
        "explicit": false
    },
    "id": 107,
    "safe": false,
    "lang": "en"
}*/


document.getElementById("themeBtn")
.addEventListener("click", () => {
    document.querySelector(".container").classList.toggle("dark");
});

let link = 'https://v2.jokeapi.dev/joke';
let response; 
let values = "";


async function onclicksJoke(event){
    event.preventDefault();

 const mode = document.querySelector('input[name="categoryMode"]:checked').value;
    let category = "Any";

    
    if (mode === "Custom") {
        const checkedCats = [...document.querySelectorAll('.cat:checked')]
                            .map(c => c.value);
        if (checkedCats.length === 0) {
            alert("Select at least one category");
            return;
        }
        category = checkedCats.join(",");
    }
     
    
    // Flag APi

    const flags = [...document.querySelectorAll('.flag:checked')]
                  .map(f => f.value)
                  .join(",");


     // Type 
           const type = document.querySelector('input[name="type"]:checked').value;

    // Amount
         const amount = document.getElementById("amount").value;

         
    //  Api request


    let url = `https://v2.jokeapi.dev/joke/${category}?type=${type}&amount=${amount}`;

    if (flags) {
         url += `&blacklistFlags=${flags}`;
    }

  fetch(url)
    .then(res => res.json())
    .then(data => {
        let result = "";

        
        if (data.type === "single") {
            result = data.joke;
        } 
        else if (data.type === "twopart") {
            result = data.setup + "\n\n" + data.delivery;
        }

       
        if (data.jokes) {
            result = data.jokes.map((j, i) => {
                return j.type === "single"
                    ? `${i + 1}. ${j.joke}`
                    : `${i + 1}. ${j.setup}\n${j.delivery}`;
            }).join("\n\n");
        }

        document.getElementById("result").innerText = result;

    

    });
    const resultEl = document.getElementById("result");


display();

}



function display(){
    const resultEl = document.getElementById("container");

    if (!resultEl) {
        console.error(" #result container not found in HTML");
        return;
    }
    
    div = `<div id="outputBox">
    <h3>Joke Output</h3>
    <pre id="result">Click Generate to see joke</pre>
    </div>
`
resultEl.innerHTML = div;
}