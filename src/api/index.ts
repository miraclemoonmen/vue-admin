import { instance } from '@/axios/request'
import { RouteRecordRaw } from 'vue-router'

export const getShibes = () => instance.get('/api/shibes')

export const getMap = (): Promise<any> => instance.get('/sd.json')

export const getList = (): Promise<any> => instance.get('/mock/getList')

export const getTree = (): Promise<any> => instance.get('/mock/getTree')

export const getRouter = (): Promise<RouteRecordRaw[]> => instance.get('/jsonServer/data')

export const login = (): Promise<any> => instance.get('/jsonServer/user')
