import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const isBrowser = typeof window !== 'undefined'

export const logout = () => {
    if (!isBrowser) return

    // Clear localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    // Clear cookies
    Cookies.remove('token', { path: '/' })
    Cookies.remove('user', { path: '/' })

    // Hard redirect to signin
    window.location.href = '/signin'
}

export const getUser = () => {
    if (!isBrowser) return null

    const userStr = localStorage.getItem('user')
    if (!userStr) return null

    try {
        return JSON.parse(userStr)
    } catch {
        return null
    }
}

export const getUserId = () => {
    const user = getUser()
    return user?.id || null
}

export const isAdmin = () => {
    if (!isBrowser) return false
    const user = getUser()
    return user?.role === 'admin'
}

export const isAuthenticated = () => {
    if (!isBrowser) return false
    return !!localStorage.getItem('token')
}

// Hàm lấy token để gửi API request
export const getToken = () => {
    if (!isBrowser) return null
    return localStorage.getItem('token')
} 