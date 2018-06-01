import { observable, action, computed, runInAction } from 'mobx'
import { get } from '../utils/http'

export default class AppState {
  constructor ({ name = 'sonacy', count = 0 } = {}) {
    this.name = name
    this.count = count
  }

  @observable name
  @observable count
  @computed
  get msg () {
    return `${this.name}'s counter is ${this.count}`
  }

  @action
  add () {
    this.count++
  }

  @action
  minus () {
    this.count--
  }

  @action
  asyncTest () {
    return get('/topics').then(data => {
      runInAction(() => {
        this.count = data.data.length
      })
    })
  }

  toJson () {
    return {
      name: this.name,
      count: this.count
    }
  }
}
