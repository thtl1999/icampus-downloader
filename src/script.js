chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // console.log(request, sender);

        try{    //video frame
            // var course_id = getID(document.getElementById('track_form').action)
            var videos = document.getElementsByTagName('video')
            var lecture_name = document.head.querySelector("[name~=title][content]").content

            for (video of videos){
                if (video.src == '')
                    continue

                chrome.runtime.sendMessage({
                    status: 'video_frame',
                    video_url: video.src,
                    // course_id: course_id,
                    lecture_name: lecture_name
                })
            }
            
            
        } catch(error){
            console.log(error)
            //not a video frame
        }

        try{
            var course_id = getID(window.location.href)
            var course_name = document.getElementById('context_title').value

            chrome.runtime.sendMessage({
                status: 'main_frame',
                course_id: course_id,
                course_name: course_name
            })
        } catch(error){
            //not a main frame
        }

        try{
            var lecture_topic = document.getElementsByClassName('xnct-title')[0].innerText
        
            chrome.runtime.sendMessage({
                status: 'title_frame',
                lecture_topic: lecture_topic
            })
        
        } catch(error){
            //not a title frame
        }
})


function getID(str){
    //https://gist.github.com/GuillaumeJasmin/9119436
    var prefix = 'courses/'
    var suffix = '/'
    var i = str.indexOf(prefix)
	if (i >= 0) {
		str = str.substring(i + prefix.length)
	}
	else {
		return '';
	}
	if (suffix) {
		i = str.indexOf(suffix)
		if (i >= 0) {
			str = str.substring(0, i)
		}
		else {
		  return '';
		}
	}
	return str;
}