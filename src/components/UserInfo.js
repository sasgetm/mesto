class UserInfo {
  constructor ({userNameElementSelector, userRoleElementSelector, userAvatarElementSelector}) {
    this._userNameElement = document.querySelector(userNameElementSelector);
    this._userRoleElement = document.querySelector(userRoleElementSelector);
    this._userAvatarElement = document.querySelector(userAvatarElementSelector);
  }

  getUserInfo () {
    const name = this._userNameElement.textContent;
    const role = this._userRoleElement.textContent;
    const avatar = this._userAvatarElement.src;
    return {name, role, avatar};
  }

  setUserInfo ({name, role, avatar}) {
    this._userNameElement.textContent = name;
    this._userRoleElement.textContent = role;
    this._userAvatarElement.src = avatar;
    this._userAvatarElement.alt = name;
  }
}

export { UserInfo };