import RootService from "./root.service";

class UserService extends RootService {
    constructor() {
        super("https://localhost:44319" + "/api/users")
    }

    // async login(data) {
    //     const {username, password} = data
    //     const response = this.apiClient.post('/login', {
    //         username,
    //         password
    //     }).then(res => {
    //         return res
    //     }).catch(err => {
    //         console.error(err)
    //         return err
    //     })
    //     return response
    // }

    // async registerUser(data) {
    //     const {username, password} = data
    //     const response = this.apiClient.post('', {
    //         username, password
    //     }).then(res => {
    //         return res
    //     }).catch(err => {
    //         return err
    //     })
    //     return response
    // }

    async isUsernameUnique(username, jwt) {
        const headers = this.setupHeaders(jwt);

        const response = this.apiClient.post('is-username-unique/' + username, {headers}).then(res => {
            return res
        }).catch(err => {
            return err
        })
        return response
    }
}

const userService = new UserService()

export default userService;