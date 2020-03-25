chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // console.log(request, sender);

        try{
            var course_id = getID(document.getElementById('track_form').action)
            var video_url = document.getElementsByClassName('vc-vplay-video1')[0].src
            var lecture_name = document.head.querySelector("[name~=title][content]").content

            chrome.runtime.sendMessage({
                status: 'video_frame',
                video_url: video_url,
                course_id: course_id,
                lecture_name: lecture_name
            })
            
        } catch(error){
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