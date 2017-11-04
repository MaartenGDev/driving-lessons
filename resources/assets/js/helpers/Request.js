class Request {
  static postJson (uri, data) {
    return fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
  }

  static getJson (uri) {
    return fetch(uri, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json())
  }
}

export default Request