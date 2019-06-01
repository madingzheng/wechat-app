import {HTTP} from '../unti/http'

class BookModels extends HTTP {

  /**
   * 获取书籍列表
   */
  getHotBookList() {
    return this.request({url: '/book/hot_list'})
  }

  /**
   * 获取喜欢的总人数
   */
  getMyBookCount() {
    return this.request({url: '/book/favor/count'})
  }

  /**
   * 获取书籍详细信息
   */
  getBookDetail(bookId) {
    return this.request({url: '/book/' + bookId + '/detail'})
  }

  /**
   * 获取书籍短评
   */
  getBookComment(bookId) {
    return this.request({url: '/book/' + bookId + '/short_comment'})
  }

  /**
   * 获取书籍点赞情况
   */
  getBookFavor(bookId) {
    return this.request({url: '/book/' + bookId + '/favor'})
  }

  /**
   * 添加评论
   * @param {书籍id} bookId 
   * @param {评论内容} content 
   */
  addBookComment(bookId, content) {
    return this.request({url: '/book/add/short_comment',data: {book_id: bookId, content: content}, method: "POSt"})
  }
}

export {BookModels}