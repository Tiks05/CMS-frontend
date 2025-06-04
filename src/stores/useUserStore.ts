import { defineStore } from 'pinia'

interface UserInfo {
  id: number
  username: string
  role: 'user' | 'guest' | 'author' | 'admin'
  token?: string
  avatar?: string
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
      this.user = { ...user }
      localStorage.setItem('user', JSON.stringify(this.user))
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
