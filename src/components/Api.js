const customFetch = (url, headers) => 
    fetch(url, headers)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => console.log(err))
    

class Api {
      constructor({ baseUrl, headers }) {
      this._baseUrl= baseUrl;
      this._headers= headers;
    }
  
    getInitialCards() {
        return customFetch(`${this._baseUrl}/cards`, {
          headers: this._headers
        })
      }
      
      getUserInfo() {
        return customFetch(`${this._baseUrl}/users/me`, {
          headers: this._headers
        })
      }  

      createCard(data) {
        return customFetch(`${this._baseUrl}/cards`, {
          headers: this._headers,
          method: 'POST',
          body: JSON.stringify(data)
        })
      }

      deleteCard(cardId) {
        return customFetch(`${this._baseUrl}/cards/${cardId}`, {
          headers: this._headers,
          method: 'DELETE',
        })
      }
    
  }
  
  export const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
      authorization: "c9fcdf91-0946-4f38-ad4e-ad86375bc281",
      "Content-Type": "application/json"
    }
  });