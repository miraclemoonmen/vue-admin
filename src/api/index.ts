import { instance } from '@/axios/request'
import { RouteRecordRaw } from 'vue-router'

export const getShibes = () => instance.get('/api/shibes')

export const getMap = (): Promise<any> => instance.get('/sd.json')

export const getList = (): Promise<any> => instance.get('https://www.fastmock.site/mock/9610740db4aff3d4fa9b3f816a2ced43/mock/getList')

export const getTree = (): Promise<any> => instance.get('https://www.fastmock.site/mock/9610740db4aff3d4fa9b3f816a2ced43/mock/getTree')

export const getRouter = (): Promise<RouteRecordRaw[]> => instance.get('/jsonServer/data')

export const login = (): Promise<any> => instance.get('/jsonServer/user')
