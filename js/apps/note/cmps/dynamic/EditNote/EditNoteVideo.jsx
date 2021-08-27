import { noteService } from "../../../services/noteService.js"
import { youtubeService } from "../../../services/youtubeService.js"
import { VideoResult } from '../../VideoResult.jsx'

export class EditNoteVideo extends React.Component {
    state = {
        info: {
            title: 'my video',
            searchKey: 'beatles',
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
        note: this.props.note

    }
    componentDidMount() {
        console.log('this.props.note', this.props.note)
        youtubeService.searchYT(this.state.note.searchKey)
            .then(videosData => this.setState(prevState => ({ ...prevState, videos: videosData })));
    }

    handleChangeTitle = ({ target }) => {
        const value = target.value
        let newInfo = this.state.note.info
        newInfo.title = value
        this.setState(prevState => ({ note: { ...prevState.note, info: newInfo } }))
    }
    handleChangeSearch = ({ target }) => {
        const value = target.value
        this.setState(prevState => ({ note: { ...prevState.note, searchKey: value } }))
    }

    onSearchVideo = (ev) => {
        ev.preventDefault()
        youtubeService.searchYT(this.state.note.searchKey)
            .then(videosData => this.setState(prevState => ({ ...prevState, videos: videosData })));
    }

    onSelectVideo = (videoId, idx) => {
        const url = `https://www.youtube.com/embed/${videoId}`;
        let newInfo = this.state.note.info
        newInfo.url = url
        this.setState(prevState => ({ note: { ...prevState.note, info: newInfo } }))
        this.setState({ selectedVideo: idx })
    }

    onSaveNote = () => {
        noteService.updateNote(this.state.note)
            .then(() => this.props.goBack())
    }

    render() {
        const videosDisplay = this.state.videos
        const selectedVideo = this.state.selectedVideo
        const note = this.state.note
        return (
            <div>
                <input value={note.info.title} type="text" name="title" placeholder="title" onChange={this.handleChangeTitle} />
                <form >
                    <input value={note.searchKey} type="text" name="searchKey"
                        placeholder="Search a YT video" onChange={this.handleChangeSearch} />
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