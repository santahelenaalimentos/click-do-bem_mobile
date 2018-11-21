import { createStore } from 'redux'
import reducer from './reducers'

export const Store = createStore(reducer)
