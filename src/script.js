

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // console.log(request, sender);
        if (request.function == "open"){
            try{
                var title = document.getElementById('context_title').value
                var id = getID(window.location.href)
                var iframeURL = document.getElementById('tool_content')
                iframeURL = iframeURL.contentWindow.document.getElementsByClassName('xnvc-video-frame')[0]
                iframeURL = iframeURL.contentWindow.document.getElementsByClassName('xn-content-frame')[0]
                iframeURL = iframeURL.src
                
            } catch(error){
                alert('동영상 페이지로 이동해 주세요')
                return
            }

            sendResponse({
                url: iframeURL,
                title: title,
                id: id
            })
            
        }
        else if (request.function == "download"){
            try{
                var id = getID(document.getElementById('track_form').action)
                var video_url = document.getElementsByClassName('vc-vplay-video1')[0].src
                var name = document.head.querySelector("[name~=title][content]").content
                
            }catch(error){
                alert("동영상을 재생해 주세요")
                return
            }

            sendResponse({
                url: video_url,
                id: id,
                name: name
            })
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