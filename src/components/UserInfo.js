class UserInfo {
  constructor ({userNameElementSelector, userRoleElementSelector}) {
    this._userNameElement = document.querySelector(userNameElementSelector);
    this._userRoleElement = document.querySelector(userRoleElementSelector);
  }

  getUserInfo () {
    const name = this._userNameElement.textContent;
    const role = this._userRoleElement.textContent;
    const userInfoObject = {
      name: name,
      role: role,
    };
    return userInfoObject;
  }

  setUserInfo ({name, role}) {
    this._userNameElement.textContent = name;
    this._userRoleElement.textContent = role;
  }
}

export { UserInfo };