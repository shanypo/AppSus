import { noteService } from "../../../services/noteService.js"
import { youtubeService } from "../../../services/youtubeService.js"

export class AddNoteVideo extends React.Component {

    state = {
        info: {
            title: 'my video',
            searchKey: 'beatles',
            url: 'https://www.youtube.com/embed/yJyClObyUOs',
            isPinned: false,
            backgroundColor: '#fff'
        },
        videos: [
            { title: '', img: '', videoId: '' },
            { title: '', img: '', videoId: '' },
            { title: '', img: '', videoId: '' },
            { title: '', img: '', videoId: '' },
            { title: '', img: '', videoId: '' }
        ]

    }

    // componentDidMount() {
    // }

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

    onSelectVideo = (videoId) => {
        console.log('videoId', videoId);
        const url = `https://www.youtube.com/embed/${videoId}`;
        this.setState(prevState => ({ info: { ...prevState.info, url: url } }))
    }

    onSaveNote = (ev) => {
        ev.preventDefault()
        noteService.saveNewVideoNote(this.state.info)
            // this.props.loadNotes()
            .then(() => this.props.loadNotes())
    }

    render() {
        const videosDisplay = this.state.videos
        return (
            // <form className="add-txt" onSubmit={this.onSaveCar}>
            <div>
                <input type="text" name="title" placeholder="title" onChange={this.handleChange} />
                <form >
                    <input type="text" name="searchKey"
                        placeholder="Search a YT video" onChange={this.handleChange} />
                    <button onClick={this.onSearchVideo}>Search Video</button>
                </form>
                <section>
                    <div className="video-res" onClick={() => { this.onSelectVideo(videosDisplay[0].videoId) }} >
                        <small>{videosDisplay[0].title.substring(0, 35)}</small>
                    </div>
                    <div className="video-res" onClick={() => { this.onSelectVideo(videosDisplay[1].videoId) }} >
                        <small>{videosDisplay[1].title.substring(0, 35)}</small>
                    </div>
                    <div className="video-res" onClick={() => { this.onSelectVideo(videosDisplay[2].videoId) }} >
                        <small>{videosDisplay[2].title.substring(0, 35)}</small>
                    </div>
                    <div className="video-res" onClick={() => { this.onSelectVideo(videosDisplay[3].videoId) }} >
                        <small>{videosDisplay[3].title.substring(0, 35)}</small>
                    </div>
                    <div className="video-res" onClick={() => { this.onSelectVideo(videosDisplay[4].videoId) }} >
                        <small>{videosDisplay[4].title.substring(0, 35)}</small>
                    </div>
                </section>

                <button onClick={this.onSaveNote}>Save Note</button>
            </div>
        )
    }
}