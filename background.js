const API_KEY = "AIzaSyAFQbmuwy0yFxAgct2kiNIRtGkj5rbnXFo"

async function generateHintWithGemini(questionText) {
  const prompt = `Based on the following LeetCode problem and the user's current approach, give a concise, helpful hint (1–2 sentences) that nudges them in the right direction without giving away the full solution.

Problem: 
${questionText.question}
Current approach or code:
${questionText.working}

Focus on guiding their thinking or helping them correct misconceptions.`

 console.log(prompt);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt}],
            role: "user"
          }
        ]
      })
    }
  );

  const data = await response.json();
  return data;
}


chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    if (request.type === "getHints") {
        generateHintWithGemini(request.value)
        .then((data)=>{
            sendResponse({text : data});
        }).catch((err)=>{
            sendResponse({text:`error : ${err}`})
        })    
      return true;
    }
});

const URL_leetcode = "https://leetcode.com/problems/"

chrome.tabs.onUpdated.addListener((tabId,tab)=>{
    if(tab.url && tab.url.includes(URL_leetcode)){
        chrome.tabs.sendMessage(tabId,{
            type: "NEW_QUESTION"
        })
    }
})

