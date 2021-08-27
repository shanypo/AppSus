import { noteService } from "../../../services/noteService.js"
import { youtubeService } from "../../../services/youtubeService.js"
import { VideoResult } from '../../VideoResult.jsx'

export class AddNoteVideo extends React.Component {

    state = {
        info: {
            searchKey: 'beatles',
            title: 'my video',
            url: 'https://www.youtube.com/embed/yJyClObyUOs',
            isPinned: false,
            backgroundColor: '#fff'
        },
        videos: [
            { title: '', img: '', videoId: '1' },
            { title: '', img: '', videoId: '2' },
            { title: '', img: '', videoId: '3' },
            { title: '', img: '', videoId: '4' },
            { title: '', img: '', videoId: '5' }
        ],
        selectedVideo: null,
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ info: { ...prevState.info, [field]: value } }))
    }

    onSearchVideo = (ev) => {
        ev.preventDefault()
        youtubeService.searchYT(this.state.info.searchKey)
            .then(videosData => this.setState(prevState => ({ ...prevState, videos: videosData })));
    }

    onSelectVideo = (videoId, idx) => {
        console.log('videoId', videoId);
        const url = `https://www.youtube.com/embed/${videoId}`;
        this.setState(prevState => ({ info: { ...prevState.info, url: url } }))
        this.setState({ selectedVideo: idx })
    }

    onSaveNote = (ev) => {
        ev.preventDefault()
        noteService.saveNewVideoNote(this.state.info)
            .then(() => this.props.loadNotes())
    }

    render() {
        const videosDisplay = this.state.videos
        const selectedVideo = this.state.selectedVideo
        return (
            <div>
                <input type="text" name="title" placeholder="title" onChange={this.handleChange} />
                <form >
                    <input type="text" name="searchKey"
                        placeholder="Search a YT video" onChange={this.handleChange} />
                    <button onClick={this.onSearchVideo}>Search Video</button>
                </form>
                <section>
                    {videosDisplay.map((video, idx) =>
                        <VideoResult selectedVideo={selectedVideo} idx={idx} key={video.videoId} video={video} onSelectVideo={this.onSelectVideo} />
                    )}
                </section>

                <button onClick={this.onSaveNote}>Save Note</button>
            </div>
        )
    }
}