const getLeetCodeQuestion = ()=>{
    const description = document.querySelector('[data-track-load="description_content"]');
    return description ? description.innerText : "Description not found";
}

const getCurrentWork = ()=>{

    const lineDivs = document.querySelectorAll('.view-lines .view-line');
    if (!lineDivs.length) return "User havent start coding yet.";
  
    const codeLines = Array.from(lineDivs).map(lineDiv => lineDiv.innerText);
    return codeLines.join("\n");
}

/*chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "getQuestion") {
      const data = getLeetCodeQuestion();
        console.log(data);
      sendResponse({text : data});
    }
}); */

const add_hint_btn = ()=>{

    const title = document.querySelector('a[href^="/problems/"][class*="no-underline"]');

    if (!title || document.getElementById("leetcode-hint-button")) return;

    const hintButton  = document.createElement("div");

    hintButton.innerText = "💡 HINT"
    hintButton.id = "leetcode-hint-button";

    hintButton.style.cssText = `
    margin-left: 12px;
    background: #6200ea;
    color: white;
    border: none;
    border-radius: 12px;
    padding: 4px 10px;
    cursor: pointer;
    font-size: 14px;
    display: inline-block;
  `;
    
    title.insertAdjacentElement("afterend", hintButton);

    let hintPopup = null;

    hintButton.addEventListener('click',()=>{
       

        if (hintPopup) {
            hintPopup.remove();
            hintPopup = null;
            return;
          }

        hintPopup = document.createElement("div");
        hintPopup.id = "leetcode-hint-popup";

        hintPopup.style.cssText = `
        position: absolute;
        top: 75px;
        margin-inline: 10px;
        color: white;
        background: #6200ea;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 10px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        font-size: 14px;
        width: 100;
        max-width: 80vw;
        z-index: 1001;

        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
      `;

        hintPopup.innerText = "⏳ generating a hint...."

      hintButton.parentNode.insertBefore(hintPopup, hintButton.nextSibling);

      requestAnimationFrame(() => {
        hintPopup.style.opacity = "1";
        hintPopup.style.transform = "translateY(0)";
      });

      document.addEventListener('click',(event)=>{
        if(hintPopup && !hintPopup.contains(event.target) && event.target != hintButton){
            hintPopup.remove();
            hintPopup = null;
            console.log('\nhi\n');
            return;
        }
      })

     const question = getLeetCodeQuestion()
     const currentwroking = getCurrentWork();

        chrome.runtime.sendMessage({
            type :"getHints",
            value :  {question : question, 
                    working : currentwroking}
        },(response)=>{
            hintPopup.innerText = response.text.candidates[0].content.parts[0].text;
        })
    })

}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "NEW_QUESTION") {
        add_hint_btn();
    }
});

add_hint_btn();
