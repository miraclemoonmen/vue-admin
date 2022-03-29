import { instance } from '@/axios/request'
import { RouteRecordRaw } from 'vue-router'

export function getData (): Promise<Record<string, unknown>> {
  return instance.get('api/shibes')
}

export const getMap = (): Promise<any> => {
  return instance.get('sd.json')
}

export const getList = (): Promise<any> => {
  return instance.get('mock/getList')
}

export const getTree = (): Promise<any> => {
  return instance.get('/mock/getTree')
}

export const getRouter = (): Promise<RouteRecordRaw[]> => {
  return instance.get('jsonServer/data')
}

export const login = (): Promise<any> => {
  return instance.get('jsonServer/user')
}
