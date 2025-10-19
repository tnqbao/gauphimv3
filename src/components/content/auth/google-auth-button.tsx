import React, {useState} from 'react'
import {Button} from '@/components/ui/button'
import {useRouter} from 'next/router'
import {useDispatch} from 'react-redux'
import {useGoogleLogin} from '@react-oauth/google'
import {loginSuccess, setAccessTokenToStorage} from '@/store/slices/authSlice'

interface GoogleAuthButtonProps {
    mode: 'login' | 'register'
    isLoading?: boolean
    onLoadingChange?: (loading: boolean) => void
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
                                                               mode,
                                                               isLoading = false,
                                                               onLoadingChange
                                                           }) => {
    const [localLoading, setLocalLoading] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    const loading = isLoading || localLoading

    const googleLogin = useGoogleLogin({
        flow: "implicit",
        onSuccess: async (tokenResponse) => {
            try {
                setLocalLoading(true)
                onLoadingChange?.(true)
                // Send the access token directly to backend
                const response = await fetch('/api/auth/google-sso', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: tokenResponse.access_token
                    })
                })

                const data = await response.json()

                if (response.ok && data.access_token) {
                    // Store tokens using utility function (not Redux action)
                    setAccessTokenToStorage(data.access_token, data.expires_in)

                    // Dispatch Redux action with proper user data structure
                    dispatch(loginSuccess({
                        user_id: data.user?.user_id || null,
                        fullname: data.user?.fullname || null,
                        email: data.user?.email || null,
                        permission: data.user?.permission || "member",
                        is_email_verified: data.user?.is_email_verified || false,
                        is_phone_verified: data.user?.is_phone_verified || false,
                        date_of_birth: data.user?.date_of_birth || null,
                    }))

                    // Redirect to home page
                    router.push('/')
                } else {
                    throw new Error(data.message || 'Authentication failed')
                }
            } catch (error) {
                console.error('Google Auth Error:', error)
                alert(error instanceof Error ? error.message : 'Authentication failed')
            } finally {
                setLocalLoading(false)
                onLoadingChange?.(false)
            }
        },
        onError: (error) => {
            console.error('Google OAuth failed:', error)
            alert('Google authentication failed. Please try again.')
            setLocalLoading(false)
            onLoadingChange?.(false)
        },
    })

    const handleGoogleAuth = () => {
        setLocalLoading(true)
        onLoadingChange?.(true)
        googleLogin()
    }

    return (
        <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleAuth}
            disabled={loading}
        >
            {loading ? (
                <div className="flex items-center">
                    <div
                        className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-2"></div>
                    Đang xác thực...
                </div>
            ) : (
                <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Tiếp tục với Google
                </div>
            )}
        </Button>
    )
}

export default GoogleAuthButton
