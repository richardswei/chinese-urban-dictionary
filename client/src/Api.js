
export function authenticateUser(email, password) {
		let login = {
      auth: {
        email: email,
        password: password
      }
    };
		return fetch('/user_token', {
          method: 'POST',
          "headers": {
              "Content-Type": "application/json",
              "Accept": "*/*"
          },
          body: JSON.stringify(login)
        }).then(function (response) {
        return response.json();
      }).then(function (json) { return json.jwt })
      .catch(function (error) {
        return undefined
      })
	}
	
export function getCurrentUser(jwt) {
		let config = {
			method: 'GET',
			headers: {}
		}
		if (jwt) {
			config['headers']['Authorization'] = 'Bearer ' + jwt
		}
		return fetch('/users/current', config)
			.then((response) => response.json())
			.then(json => json)
			.catch(function (error) {
				console.log(error);
				return undefined
			})
	}