responses = {}


chrome.browserAction.onClicked.addListener(function(tab) {
    if (tab.url.includes("https://canvas.skku.edu/")){
        //initialize
        responses = {
            main_frame: false,
            video_frame: false,
            course_id: null,
            course_name: null,
            lecture_info: [],
            lecture_topic: null
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

            
            if (responses.lecture_info.length == 1){
                //download video
                var video = responses.lecture_info[0]
                chrome.downloads.download({
                    saveAs: false,
                    url: video.video_url,
                    filename: responses.course_name + ' ' + video.lecture_name + ' ' + responses.lecture_topic + '.mp4'
                })
            }
            else{
                //download videos
                var index = 1
                for (video of responses.lecture_info){
                    chrome.downloads.download({
                        saveAs: false,
                        url: video.video_url,
                        filename: responses.course_name + ' ' + video.lecture_name + ' ' + responses.lecture_topic + ' - ' + String(index) + '.mp4'
                    })
                    index++
                }
            }

            
            

        }, 500)
    }
    else {
        alert('아이캠퍼스 동영상 페이지로 이동해 주세요')
    }
})


chrome.runtime.onMessage.addListener(
    function(req, sender) {
        console.log(req)

        if (req.status === 'main_frame'){
            responses.main_frame = true
            responses.course_id = req.course_id
            responses.course_name = validate_filename(req.course_name)
        }
        else if (req.status === 'video_frame'){
            var lecture = {}
            responses.video_frame = true
            lecture.video_url = req.video_url
            lecture.lecture_name = validate_filename(req.lecture_name)
            responses.lecture_info.push(lecture)
        }
        else if (req.status === 'title_frame'){
            responses.lecture_topic = validate_filename(req.lecture_topic)
        }
})


function validate_filename(name){
    //replace | * ? \ : < > $
    var new_name = name.replace(/\||\*|\?|\\|\:|\<|\>|\$/gi, function (x) {
        return ''
    })

    return new_name
}