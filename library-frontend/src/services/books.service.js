import RootService from "./root.service";

class BookService extends RootService {
    constructor() {
        super("https://localhost:44319" + "/api/books")
    }

    async getBooks(jwt) {
        const headers = this.setupHeaders(jwt);

        return this.apiClient.get('', {headers}).then(res => {
            return res
        }).catch(err => {
            console.error(err)
            return err
        })
    }

    async deleteBook(data, jwt) {
        const headers = this.setupHeaders(jwt);

        return this.apiClient.delete('', {
            data: data,
            headers : headers
        }).then(res => {
            return res
        }).catch(err => {
            console.error(err)
            return err
        })
    }

    async createBook(data, jwt) {
        const headers = this.setupHeaders(jwt);

        return this.apiClient.post('', {
            Author: data.author,
            Title: data.title,
            Genre: data.genre,
            ISBN: data.isbn,
            BookId: "temp",
            IsDeleted: false
        }, {headers}).then(res => {
            return res
        }).catch(err => {
            console.error(err)
            return err
        })
    }

    async updateBook(data, jwt) {
        const headers = this.setupHeaders(jwt);

        return this.apiClient.put('', {
            Author: data.author,
            Title: data.title,
            Genre: data.genre,
            ISBN: data.isbn,
            BookId: data.bookId,
            IsDeleted: false
        }, {headers}).then(res => {
            return res
        }).catch(err => {
            console.error(err)
            return err
        })
    }
}

const bookService = new BookService()

export default bookService;