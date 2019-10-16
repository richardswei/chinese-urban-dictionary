


export let Api = {
	authenticateUser: function(email, password) {
		let login = {
			auth: {
				email: email,
				password: password
			}
		}
		fetch('/user_token', {
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					dataType: 'json',
					body: JSON.stringify(login)
				}).then(response => {
					response.data.jwt
				}).catch((error) => console.log(error))
	},
	getCurrentUser: function(jwt) {
		let config = {
			method: 'GET',
			headers: {}
		}
		if (jwt) {
			config['headers']['Authorization'] = 'Bearer ' + jwt
		}

		return fetch('/api/users/current', config)
			.then((response) => response.data)
			.catch(function (error) {
				console.log(error);
				return undefined
			})
	}
}