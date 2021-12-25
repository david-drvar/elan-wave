import RootService from "./root.service";

class BookService extends RootService {
    constructor() {
        super("https://localhost:44319" + "/api/books")
    }

    async getBooks() {
        return this.apiClient.get('').then(res => {
            return res
        }).catch(err => {
            console.error(err)
            return err
        })
    }

    async deleteBook(data) {
        return this.apiClient.delete('', {
            data: data
        }).then(res => {
            return res
        }).catch(err => {
            console.error(err)
            return err
        })
    }

    async createBook(data) {
        return this.apiClient.post('', {
            Author: data.author,
            Title: data.title,
            Genre: data.genre,
            ISBN: data.isbn,
            BookId: "temp",
            IsDeleted: false
        }).then(res => {
            return res
        }).catch(err => {
            console.error(err)
            return err
        })
    }

    async updateBook(data) {
        return this.apiClient.put('', {
            Author: data.author,
            Title: data.title,
            Genre: data.genre,
            ISBN: data.isbn,
            BookId: data.bookId,
            IsDeleted: false
        }).then(res => {
            return res
        }).catch(err => {
            console.error(err)
            return err
        })
    }
}

const bookService = new BookService()

export default bookService;