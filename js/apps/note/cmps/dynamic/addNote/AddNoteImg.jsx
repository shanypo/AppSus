import { noteService } from "../../../services/noteService.js"

export class AddNoteImg extends React.Component {

    state = {
        info: {
            title: 'my video',
            // searchKey: 'beatles',
            url: 'https://picsum.photos/200/300',
            isPinned: false,
            backgroundColor: '#fff'
        },

    }

    // componentDidMount() {
    // }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ info: { ...prevState.info, [field]: value } }))
    }

    // onSearchVideo = (ev) => {
    //     ev.preventDefault()
    //     youtubeService.searchYT(this.state.info.searchKey)
    //         .then(videosData => this.setState(prevState => ({ ...prevState, videos: videosData })));
    // }

    // onSelectVideo = (videoId) => {
    //     console.log('videoId', videoId);
    //     const url = `https://www.youtube.com/embed/${videoId}`;
    //     this.setState(prevState => ({ info: { ...prevState.info, url: url } }))
    // }

    onSaveNote = (ev) => {
        ev.preventDefault()
        noteService.saveNewVideoNote(this.state.info)
            .then(() => this.props.loadNotes())
    }

    render() {
        const videosDisplay = this.state.videos
        return (
            <div>
                <form >
                    <input type="text" name="title" placeholder="title" onChange={this.handleChange} />
                    <input type="text" name="url"
                        placeholder="Type photo Url" onChange={this.handleChange} />
                </form>

                <button onClick={this.onSaveNote}>Save Note</button>
            </div>
        )
    }
}