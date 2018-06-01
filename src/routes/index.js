import Loadable from 'react-loadable'
import React from 'react'
import { Redirect } from 'react-router-dom'
import Loading from '../components/loading'
// import List from '../views/list'
// import Item from '../views/item'

const List = Loadable({
  loader: () => import(/* webpackChunkName: "list" */'../views/list'),
  loading: Loading,
  timeout: 10000,
  delay: 300
})

const Item = Loadable({
  loader: () => import(/* webpackChunkName: "item" */'../views/item'),
  loading: Loading,
  timeout: 10000,
  delay: 300
})

export default [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to='/list' />
  },
  {
    path: '/list',
    component: List,
    loadData: ({ store, route }) => {
      return store.appState.asyncTest()
    }
  },
  {
    path: '/item',
    component: Item,
    loadData: ({ store, route }) => {
      console.log(route)
    }
  }
]
