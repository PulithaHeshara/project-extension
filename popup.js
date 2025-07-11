/*const URL_leetcode = "https://leetcode.com/problems/"



document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      const div = document.getElementById("test");

      if (tab.url.includes(URL_leetcode)) {
        chrome.tabs.sendMessage(tab.id,{type:"getQuestion"},(response)=>{
            div.innerText = response.text;

            chrome.runtime.sendMessage({
                type :"getHints",
                value :  response.text
            },(response)=>{
                console.log(response.text.candidates[0].content.parts[0].text);
            })
        })

        
      } else {
        div.innerText = "Not inside LeetCode";
      }
    });
  });
*/


