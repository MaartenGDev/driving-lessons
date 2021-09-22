import Request from '../helpers/Request'

class ExamApi {
  static all () {
    return new Promise((res, rej) => {
      Request.getJson('/api/v1/exams')
        .then(response => res(response.data))
    })
  }

  static createOrUpdate (exam) {
    if (exam.id === undefined) return ExamApi.store(exam)

    return ExamApi.update(exam)
  }

  static store (exam) {
    return new Promise((res, rej) => {
      Request.postJson('/api/v1/exams', exam)
        .then(response => res(response.data))
        .catch(err => rej(err))
    })
  }

  static update (exam) {
    return new Promise((res, rej) => {
      Request.patchJson(`/api/v1/exams/${exam.id}`, exam)
        .then(response => res(response.data))
        .catch(err => rej(err))
    })
  }

  static destroy(exam){
    return new Promise((res, rej) => {
      Request.destroyJson(`/api/v1/exams/${exam.id}`)
        .then(response => res(response.data))
        .catch(err => rej(err))
    })
  }
}

export default ExamApi