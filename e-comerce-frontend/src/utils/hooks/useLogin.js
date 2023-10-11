import  {useCallback, useEffect, useState} from 'react'
import {useHistory} from 'react-router'
import {Api} from '../Api'
import {logout} from '../localstorage'

function useLogin() {
  const [loginInfo, setLoginInfo] = useState({
    loading: true,
    isLogin: false,
  })
  const {replace} = useHistory()
  const checkLogin = useCallback(async () => {
    const {statusCode} = await Api.getRequest(`/api/user/me`)
    if (statusCode === 400 || statusCode === 500) {
      replace('/')
      logout()
      return
    }
    setLoginInfo({loading: false, isLogin: true})
  }, [replace])
  useEffect(() => {
    checkLogin()
  }, [checkLogin])
  return {loginInfo}
}

export default useLogin
