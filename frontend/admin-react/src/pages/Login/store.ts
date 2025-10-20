import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth'

interface LoginCredentials {
  username: string
  password: string
}

interface LoginResponse {
  token: {
    accessToken: string
    refreshToken: string
    expiresIn: number
    tokenType: string
  }
  userInfo: {
    id: string
    username: string
    nickname: string
    roles: string[]
    permissions: string[]
  }
}

// 模拟登录 API 调用
const loginApi = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 模拟登录验证
  if (credentials.username === 'admin' && credentials.password === '123456') {
    return {
      token: {
        accessToken: 'mock-access-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        expiresIn: 3600,
        tokenType: 'Bearer'
      },
      userInfo: {
        id: '1',
        username: credentials.username,
        nickname: credentials.username,
        roles: ['user'],
        permissions: ['read', 'write']
      }
    }
  } else {
    throw new Error('用户名或密码错误')
  }
}

export const useLogin = () => {
  const navigate = useNavigate()
  const { setToken, setUserInfo } = useAuthStore()

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // 更新 auth store
      setToken(data.token)
      setUserInfo(data.userInfo)
      
      // 登录成功后重定向到首页
      navigate({ to: '/admin' })
    },
    onError: (error) => {
      console.error('登录失败:', error)
    }
  })
}
