responses = {}


chrome.browserAction.onClicked.addListener(function(tab) {
    if (tab.url.includes("https://canvas.skku.edu/")){
        //initialize
        responses = {
            main_frame: false,
            video_frame: false,
            course_id: null,
            course_name: null,
            lecture_name: null,
            video_url: null
        }

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {})
        })

        setTimeout(function(){
            console.log('waited for responses from frames')

            if (responses.main_frame === false){
                alert('동영상 페이지로 이동해 주세요')
                return
            }

            if (responses.video_frame === false){
                alert('동영상을 재생해 주세요')
                return
            }

            //download video
            chrome.downloads.download({
                url: responses.video_url,
                filename: responses.course_name + ' ' + responses.lecture_name + '.mp4'
            })

        }, 500)
    }
    else {
        alert('아이캠퍼스 동영상 페이지로 이동해 주세요')
    }
})


chrome.runtime.onMessage.addListener(
    function(req, sender) {
        if (req.status === 'main_frame'){
            responses.main_frame = true
            responses.course_id = req.course_id
            responses.course_name = req.course_name
        }
        else if (req.status === 'video_frame'){
            responses.video_frame = true
            responses.video_url = req.video_url
            responses.lecture_name = req.lecture_name
    }
})