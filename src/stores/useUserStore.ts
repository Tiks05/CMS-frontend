import { defineStore } from 'pinia'

interface UserInfo {
  id: number
  username: string
  role: 'guest' | 'user' | 'author' | 'admin'
  token?: string // 可选，如果你后续启用了 JWT
}

export const useUserStore = defineStore('user', {
  state: (): {
    user: UserInfo | null
  } => ({
    user: null
  }),

  getters: {
    isLogin: (state) => !!state.user,
    username: (state) => state.user?.username || '',
    role: (state) => state.user?.role || 'guest',
    isAdmin: (state) => state.user?.role === 'admin',
    isAuthor: (state) => state.user?.role === 'author'
  },

  actions: {
    setUser(user: UserInfo) {
      this.user = user
      // 本地持久化：如需在刷新后仍保留用户信息
      localStorage.setItem('user', JSON.stringify(user))
    },

    loadUserFromStorage() {
      const raw = localStorage.getItem('user')
      if (raw) {
        this.user = JSON.parse(raw)
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem('user')
    }
  }
})
