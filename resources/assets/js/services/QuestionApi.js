import Request from '../helpers/Request'

class QuestionApi {
  static createOrUpdate (question) {
    if (question.id === undefined) return QuestionApi.store(question)

    return QuestionApi.update(question)
  }

  static store (question) {
    return new Promise((res, rej) => {
      Request.postJson('/api/v1/questions', question)
        .then(storedQuestion => res(storedQuestion))
        .catch(err => rej(err))
    })
  }

  static update (question) {
    console.log('updating...')
  }

}

export default QuestionApi