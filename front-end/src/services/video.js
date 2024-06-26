class Api {
  getVideoById = id =>
    fetch(`${import.meta.env.VITE_SERVER_URL}videos/${id}`, {
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })
}

export default new Api()