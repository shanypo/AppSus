export class NoteFilter extends React.Component {
  state = {
    filterBy: {
      searchKey: '',
      type: ''
    }
  };

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState({ filterBy: { ...this.state.filterBy, [field]: value } }, () => {
      this.props.onSetFilter(this.state.filterBy)
    });
  };

  render() {
    const { searchKey, type } = this.state.filterBy;
    return (
      <div className='filter'>

        <label htmlFor='by-search'>Search</label>
        <input
          name='searchKey'
          id='by-search'
          type='text'
          placeholder='Search Note'
          value={searchKey}
          onChange={this.handleChange}
        />

        <select value={type} name="type" onChange={this.handleChange} >
          <option value="">All</option>
          <option value="img">Image</option>
          <option value="todo">Todo</option>
          <option value="txt">Text</option>
          <option value="video">Video</option>
        </select>

      </div>

    );
  }
}
