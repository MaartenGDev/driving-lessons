import Request from '../helpers/Request'

class QuestionApi {
  static createOrUpdate (question) {
    if (question.id === undefined) return QuestionApi.store(question)

    return QuestionApi.update(question)
  }

  static store (question) {
    return new Promise((res, rej) => {
      Request.postJson('/api/v1/questions', question)
        .then(response => res(response.data))
        .catch(err => rej(err))
    })
  }

  static all () {
    return new Promise((res, rej) => {
      Request.getJson('/api/v1/questions')
        .then(response => res(response.data))
    })
  }

  static update (question) {
    return new Promise((res, rej) => {
      Request.patchJson(`/api/v1/questions/${question.id}`, question)
        .then(response => res(response.data))
        .catch(err => rej(err))
    })
  }

  static destroy(question){
    return new Promise((res, rej) => {
      Request.destroyJson(`/api/v1/questions/${question.id}`)
        .then(response => res(response.data))
        .catch(err => rej(err))
    })
  }
}

export default QuestionApi