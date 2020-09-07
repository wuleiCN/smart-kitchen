
export function getToken(key) {
  const data = window.sessionStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
  // return Cookies.get(TokenKey)
}

export function setToken(key, value) {
  if (typeof value === "object") {
    value = JSON.stringify(value)
  }
  window.sessionStorage.setItem(key, value)
}

export function removeToken(key) {
  // return Cookies.remove(TokenKey)
  return sessionStorage.removeItem(key)
}
