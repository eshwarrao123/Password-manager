import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

class App extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    passwordsList: [],
    showPasswords: false,
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onToggleShowPasswords = event => {
    this.setState({showPasswords: event.target.checked})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state

    if (
      websiteInput.trim() === '' ||
      usernameInput.trim() === '' ||
      passwordInput.trim() === ''
    ) {
      return
    }

    const newPassword = {
      id: uuidv4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onDeletePassword = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(
        eachItem => eachItem.id !== id,
      ),
    }))
  }

  getFilteredPasswords = () => {
    const {passwordsList, searchInput} = this.state
    const searchText = searchInput.toLowerCase()

    return passwordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchText),
    )
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
      passwordsList,
      showPasswords,
    } = this.state

    const filteredPasswords = this.getFilteredPasswords()
    const hasPasswords = filteredPasswords.length > 0

    return (
      <div className="password-manager-bg">
        <div className="password-manager-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />

          <div className="top-card">
            <form className="add-form" onSubmit={this.onAddPassword}>
              <h1 className="form-heading">Add New Password</h1>

              <div className="input-row">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-icon"
                />
                <input
                  type="text"
                  className="input-element"
                  placeholder="Enter Website"
                  value={websiteInput}
                  onChange={this.onChangeWebsite}
                />
              </div>

              <div className="input-row">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-icon"
                />
                <input
                  type="text"
                  className="input-element"
                  placeholder="Enter Username"
                  value={usernameInput}
                  onChange={this.onChangeUsername}
                />
              </div>

              <div className="input-row">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-icon"
                />
                <input
                  type="password"
                  className="input-element"
                  placeholder="Enter Password"
                  value={passwordInput}
                  onChange={this.onChangePassword}
                />
              </div>

              <button type="submit" className="add-btn">
                Add
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="top-card-image-lg"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="top-card-image-sm"
            />
          </div>

          <div className="bottom-card">
            <div className="passwords-header">
              <div className="count-label-container">
                <h1 className="passwords-heading">Your Passwords</h1>
                <p className="count-badge">{passwordsList.length}</p>
              </div>

              <div className="search-row">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearch}
                />
              </div>
            </div>

            <hr className="divider" />

            <div className="show-passwords-row">
              <input
                id="showPasswords"
                type="checkbox"
                className="checkbox"
                checked={showPasswords}
                onChange={this.onToggleShowPasswords}
              />
              <label htmlFor="showPasswords" className="show-passwords-label">
                Show Passwords
              </label>
            </div>

            {hasPasswords ? (
              <ul className="passwords-list">
                {filteredPasswords.map(item => {
                  const {id, website, username, password} = item
                  const firstLetter = website[0]?.toUpperCase()
                  const colorClasses = [
                    'amber',
                    'blue',
                    'orange',
                    'green',
                    'teal',
                    'red',
                  ]
                  const randomColorClass =
                    colorClasses[website.length % colorClasses.length]

                  return (
                    <li className="password-item" key={id}>
                      <div className="initial-circle-container">
                        <div className={`initial-circle ${randomColorClass}`}>
                          <p className="initial-letter">{firstLetter}</p>
                        </div>
                        <div className="details-text">
                          <p className="website-text">{website}</p>
                          <p className="username-text">{username}</p>
                          {showPasswords ? (
                            <p className="password-text">{password}</p>
                          ) : (
                            <img
                              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                              alt="stars"
                              className="stars-img"
                            />
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => this.onDeletePassword(id)}
                        data-testid="delete"
                      >
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                          alt="delete"
                          className="delete-icon"
                        />
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <div className="no-passwords-view">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-passwords-img"
                />
                <p className="no-passwords-text">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
