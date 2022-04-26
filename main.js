// LINK SHORTENER API

let shortenLink = {
    fetchLink: function (link) {
        fetch(
            "https://api.shrtco.de/v2/shorten?url=" + link 
        )
        .then((response) => response.json())
        .then((data) => this.displayLink(data));
    },
    displayLink: (data) => {
        let inputText = document.getElementById("text");
        //Form validation
        if (inputText.value === "") {
            document.querySelector(".form-error").style.display = "block";
            document.getElementById("text").style.border = "2px solid #ff0000";
            return;
        } else {
        let listContainer = document.querySelector(".list-container");

        let outputModal = document.createElement("li");
        outputModal.classList.add("output-modal");

        let outputLeft = document.createElement("div");
        outputLeft.classList.add("output-left");

        let outputRight = document.createElement("div");
        outputRight.classList.add("output-right");

        let inputShortLink = document.createElement("input");
        inputShortLink.classList.add("input-short-link");
        inputShortLink.setAttribute("type", "text");
        inputShortLink.setAttribute("placeholder", "");
        inputShortLink.setAttribute("readonly", "");

        let button = document.createElement("button");
        button.innerText = "Copy";

        listContainer.appendChild(outputModal);
        outputModal.appendChild(outputLeft);
        outputModal.appendChild(outputRight);
        outputRight.appendChild(inputShortLink);
        outputRight.appendChild(button);
        //Link results
        let { full_short_link } = data.result;
        console.log( full_short_link );
        let x = document.getElementById("text").value;
        let y = full_short_link;
        document.querySelector(".output-left").innerText = x;
        document.querySelector(".input-short-link").value = y;
        this.array(y);
        //Resets input field after every search
        inputText.value = "";
        /*
        function save() {
            let new_data = full_short_link;

            if(localStorage.getItem('data') == null){
                localStorage.setItem('data', '[]');
            }
            let old_data = JSON.parse(localStorage.getItem('data'));
            old_data.push(new_data);

            localStorage.setItem('data', JSON.stringify(old_data));
        }
        */ 
           

        //Changes the COPY button to violet and text to copied when clicked
        button.onclick = () => {
            let button = document.querySelector(".output-right button");
            let copyText = document.querySelector(".input-short-link");
            copyText.select();
            copyText.setSelectionRange(0,9999);
            navigator.clipboard.writeText(copyText.value);
            button.innerHTML = "Copied!";
            button.style.backgroundColor = "var(--color-violet)";
            setTimeout( () => {
                button.innerHTML = "Copy";
                button.style.backgroundColor = "var(--color-cyan)";
            },6500);
        };
    };
    },
    search: function () {
        let inputText = document.getElementById("text");
        this.fetchLink(inputText.value);
    }, 
    array: function (y) {
        let linksArr = [];
        let addArr = () => {
            let shortLink = y;
            linksArr.push(shortLink);
            console.warn('added', {linksArr} );

            localStorage.setItem('MyShortLinkList', JSON.stringify(shortLink));
        };
        document.getElementById("submit").addEventListener("click", () => {
            addArr();
        });
    }
};
//Search trigger upon cliking the button
document.getElementById("submit").addEventListener("click", () => {
    shortenLink.search();
});

//Search trigger upon pressing ENTER key
document.getElementById("text").addEventListener("keypress", (e) => {
    if (e.key === "Enter" ) {
        shortenLink.search();
    }
});