
export function getSession(key) {
  const data = window.sessionStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
  // return Cookies.get(TokenKey)
}

export function setSession(key, value) {
  if (typeof value === "object") {
    value = JSON.stringify(value)
  }
  window.sessionStorage.setItem(key, value)
}

export function removeSession(key) {
  // return Cookies.remove(TokenKey)
  return sessionStorage.removeItem(key)
}
