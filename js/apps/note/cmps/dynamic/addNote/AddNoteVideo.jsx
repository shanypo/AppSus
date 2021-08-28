import { noteService } from "../../../services/noteService.js"
import { youtubeService } from "../../../services/youtubeService.js"
import { VideoResult } from '../../VideoResult.jsx'

export class AddNoteVideo extends React.Component {

    state = {
        note: {
            id: '',
            type: 'video',
            isPinned: false,
            info: {
                title: 'My video',
                url: 'https://www.youtube.com/embed/yJyClObyUOs',
                txt: ''
            },
            style: {
                backgroundColor: 'white'
            },
            searchKey: 'beatles'
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
        noteService.saveNewNote(this.state.note)
            .then(() => this.props.loadNotes())
    }

    render() {
        const videosDisplay = this.state.videos
        const selectedVideo = this.state.selectedVideo
        const note = this.state.note
        return (
            <div className="add-video flex direction-col align-center" >
                <input className="note-title" type="search" name="title" placeholder="Title" onChange={this.handleChange} />
                <textarea value={note.info.txt} placeholder="Think of something?" name="txt" cols="30" rows="10" onChange={this.handleChange}></textarea>
                <section>
                    {videosDisplay.map((video, idx) =>
                        <VideoResult selectedVideo={selectedVideo} idx={idx} key={video.videoId} video={video} onSelectVideo={this.onSelectVideo} />
                    )}
                </section>
                <form >
                    <input type="search" name="searchKey"
                        placeholder="Search a YT video" onChange={this.handleChangeSearch} />
                    <button onClick={this.onSearchVideo}><img src="./././img/icons/search-icon.png" /></button>
                </form>
                <button className="save-note" onClick={this.onSaveNote}>Save Note</button>
            </div>
        )
    }
}