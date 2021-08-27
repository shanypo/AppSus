import { noteService } from "../../../services/noteService.js"
import { youtubeService } from "../../../services/youtubeService.js"
import { VideoResult } from '../../VideoResult.jsx'

export class EditNoteVideo extends React.Component {
    state = {
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

    handleChange = ({ target }) => {
        const value = target.value
        const field = target.name
        let newInfo = this.state.note.info
        newInfo[field] = value
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
        const classNote = `note ${note.style.backgroundColor}`
        return (
            <div className={classNote}>
                <input value={note.info.title} type="text" name="title" placeholder="title" onChange={this.handleChange} />
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
                <textarea value={note.info.txt} placeholder="Type descrition" name="txt" cols="30" rows="10" onChange={this.handleChange}></textarea>
                <button onClick={this.onSaveNote}>Save Note</button>
            </div>
        )
    }
}