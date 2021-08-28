export class BookFilter extends React.Component {
    state = {
        filterBy: {
            title: '',
            minPrice: '',
            maxPrice: ''
        }
    }
    onFilter = (ev) => {
        ev.prevantDafult()
        this.props.onSetFilter(this.state.filterBy)
    }
    handleChange = (ev) => {
        const field = ev.target.name;
        const value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value;
        this.setState({ filterBy: { ...this.state.filterBy, [field]: value } }, () => {
            this.props.onSetFilter(this.state.filterBy)
        });
    }
    render() {
        const { title, minPrice, maxPrice } = this.state.filterBy;
        return (
            < form className="book-filter" onSubmit={this.onFilter} >
                <label htmlFor="by-title">By Title</label>
                <input
                    name='title'
                    id='by-title'
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={this.handleChange}
                />
                <label htmlFor='min-price'>Min price</label>
                <input
                    name='minPrice'
                    id='min-price'
                    type='number'
                    placeholder='Min Price'
                    value={minPrice}
                    onChange={this.handleChange}
                />
                <label htmlFor='max-price'>Max price</label>
                <input
                    name='maxPrice'
                    id='max-price'
                    type='number'
                    placeholder='Max Price'
                    value={maxPrice}
                    onChange={this.handleChange}
                />
                {/* <button>Filter</button> */}
            </form >
        );
    }
}