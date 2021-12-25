import RootService from "./root.service";

class BookService extends RootService {
    constructor() {
        super("https://localhost:44319" + "/api/books")
    }

    async getBooks() {
        const response = this.apiClient.get('').then(res => {
            return res
        }).catch(err => {
            console.error(err)
            return err
        })
        return response
    }
}

const bookService = new BookService()

export default bookService;