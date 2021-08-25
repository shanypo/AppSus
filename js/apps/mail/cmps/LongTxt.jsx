export class LongTxt extends React.Component {
    state = {
        isLongTxtShown: false
    }

    toggleIsTxtShown = () => {
        this.setState((prevState) =>({ isLongTxtShown: !prevState.isLongTxtShown }))
    }

    render() {
        const { isLongTxtShown } = this.state;
        const { body } = this.props;
        console.log();
        return (
            <p>
                {isLongTxtShown ? body : body.substring(0, 80)}
            </p>

        )
    }
}