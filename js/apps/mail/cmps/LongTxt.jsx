export class LongTxt extends React.Component {
    state = {
        isLongTxtShown: false
    }

    toggleIsTxtShown = () => {
        this.setState((prevState) => ({ isLongTxtShown: !prevState.isLongTxtShown }))
    }

    render() {
        const { isLongTxtShown } = this.state;
        const { body, subject } = this.props;
        return (
            <React.Fragment>
                <p>
                    {isLongTxtShown ? subject : subject.substring(0, 15)}
                </p>
                <p>
                    {isLongTxtShown ? body : body.substring(0, 50)}
                </p>
            </React.Fragment>
        )
    }
}