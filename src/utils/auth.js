
export function getToken() {
  return sessionStorage.getItem("TOKEN_KEY")
  // return Cookies.get(TokenKey)
}

export function setToken(token, rememberMe) {
  // if (rememberMe) {
  //   return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
  // } else return Cookies.set(TokenKey, token)
  return sessionStorage.setItem("TOKEN_KEY", token)
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
  return sessionStorage.removeItem("TOKEN_KEY")
}
