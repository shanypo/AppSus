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
      <div className='filter-notes flex direction-row justify-center '>
        <select id="notes-drop-down" value={type} name="type" onChange={this.handleChange} >
          <option value="">All</option>
          <option value="img">Image</option>
          <option value="todo">Todo</option>
          <option value="txt">Text</option>
          <option value="video">Video</option>
        </select>
        <label htmlFor="notes-drop-down"><img src="../../../../img/icons/filter.png" /></label>


        <input
          name='searchKey'
          id='by-search'
          type='text'
          placeholder='Search Note'
          value={searchKey}
          onChange={this.handleChange}
        />
        <label htmlFor='by-search'><img src="../../../img/icons/search-icon.png" /></label>

      </div>

    );
  }
}
