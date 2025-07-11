const getLeetCodeQuestion = ()=>{
    const description = document.querySelector('[data-track-load="description_content"]');
    return description ? description.innerText : "Description not found";
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "getQuestion") {
      const data = getLeetCodeQuestion();
        console.log(data);
      sendResponse({text : data});
    }
});

