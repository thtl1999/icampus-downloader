COURSE = {}



chrome.browserAction.onClicked.addListener(function(tab) {
    if (tab.url.includes("https://canvas.skku.edu/")){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {function: "open"}, function(response) {
                // console.log(response)
                COURSE[response.id] = response.title
                chrome.tabs.create({ url: response.url })
            })
        })
    }
    else if (tab.url.includes("https://lcms.skku.edu/")){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {function: "download"}, function(response) {
                // console.log(response)
                chrome.downloads.download({
                    url: response.url,
                    filename: COURSE[response.id] + ' ' + response.name + '.mp4'
                })
            })
        })
    }
    else{
        alert('아이캠퍼스 동영상 페이지로 이동해 주세요')
    }

    
})

