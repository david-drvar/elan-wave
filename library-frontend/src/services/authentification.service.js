import RootService from "./root.service";

class AuthenticationService extends RootService {
    constructor() {
        super("https://localhost:44319" + "/api/authentication")
    }

    async login(data) {
        const {username, password} = data
        const response = this.apiClient.post('/login', {
            username,
            password
        }).then(res => {
            return res
        }).catch(err => {
            console.error(err)
            return err
        })
        return response
    }
}

const authenticationService = new AuthenticationService()

export default authenticationService;