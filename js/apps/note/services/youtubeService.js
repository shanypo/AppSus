export const youtubeService = {
    searchYT
}

function searchYT(searchValue) {
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet
    &videoEmbeddable=true&type=video&key=AIzaSyDxdBjLtaEDBH2T58Kbei9jSWXlnwmgqTM&q=${searchValue}`)
        .then((rawData) => {
            const videosData = [];
            rawData.data.items.forEach(item => {
                const video = {
                    title: item.snippet.title,
                    img: item.snippet.thumbnails.default.url,
                    videoId: item.id.videoId
                }
                videosData.push(video)
            })
            return videosData
        })
        .catch((err) => {
            console.log('Cannot reach server:', err);
        })
}