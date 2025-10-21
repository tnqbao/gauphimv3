import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { selectAuth } from "@/store/slices/authSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Calendar, Shield, CheckCircle2, XCircle, Edit2, Save, X, Camera, Loader2, Crown } from "lucide-react"
import axios from "axios"
import { cn } from "@/lib/utils"

interface Verification {
    id: string
    method: string
    value: string
    is_verified: boolean
    verified_at: string | null
}

interface UserProfile {
    user_id: string
    fullname: string
    email: string
    date_of_birth: string
    avatar_url: string
    username: string
    permission: string
    is_email_verified: boolean
    is_phone_verified: boolean
    verifications: Verification[]
}

export default function ProfilePage() {
    const router = useRouter()
    const { user_id } = useSelector(selectAuth)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [activeTab, setActiveTab] = useState("info")
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingProfile, setIsLoadingProfile] = useState(true)
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [profile, setProfile] = useState<UserProfile | null>(null)

    const [formData, setFormData] = useState({
        fullname: "",
        date_of_birth: "",
        username: "",
    })

    useEffect(() => {
        if (!user_id) {
            router.push("/auth/login")
        } else {
            fetchProfile()
        }
    }, [user_id, router])

    const fetchProfile = async () => {
        setIsLoadingProfile(true)
        try {
            const token = localStorage.getItem("access_token")
            const response = await axios.get("/api/auth/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.data.status === 200) {
                const userData = response.data.user_info
                setProfile(userData)
                setFormData({
                    fullname: userData.fullname || "",
                    date_of_birth: userData.date_of_birth ? userData.date_of_birth.split('T')[0] : "",
                    username: userData.username || "",
                })
            }
        } catch (err) {
            const error = err as { response?: { data?: { message?: string } } }
            setError(error.response?.data?.message || "Có lỗi xảy ra khi tải thông tin")
        } finally {
            setIsLoadingProfile(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSave = async () => {
        setIsLoading(true)
        setError("")
        setSuccess("")

        try {
            const token = localStorage.getItem("access_token")
            const response = await axios.put("/api/auth/profile", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.data.success) {
                setSuccess("Cập nhật thông tin thành công!")
                setIsEditing(false)
                await fetchProfile()
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Có lỗi xảy ra khi cập nhật thông tin")
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        if (profile) {
            setFormData({
                fullname: profile.fullname || "",
                date_of_birth: profile.date_of_birth ? profile.date_of_birth.split('T')[0] : "",
                username: profile.username || "",
            })
        }
        setIsEditing(false)
        setError("")
        setSuccess("")
    }

    const handleAvatarClick = () => {
        fileInputRef.current?.click()
    }

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError("Vui lòng chọn file ảnh")
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError("Kích thước ảnh không được vượt quá 5MB")
            return
        }

        setIsUploadingAvatar(true)
        setError("")
        setSuccess("")

        try {
            const token = localStorage.getItem("access_token")
            const formData = new FormData()
            formData.append("file", file)

            const response = await axios.patch("/api/auth/avatar", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })

            if (response.data.success) {
                setSuccess("Cập nhật ảnh đại diện thành công!")
                await fetchProfile()
            }
        } catch (err) {
            const error = err as { response?: { data?: { message?: string } } }
            setError(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật ảnh đại diện")
        } finally {
            setIsUploadingAvatar(false)
        }
    }

    if (!user_id) {
        return null
    }

    if (isLoadingProfile) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                </div>
            </div>
        )
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-red-600">Không thể tải thông tin hồ sơ</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-green-600 mb-2">Hồ Sơ Cá Nhân</h1>
                    <p className="text-muted-foreground">Quản lý thông tin tài khoản của bạn</p>
                </div>

                {/* Avatar Card */}
                <Card className="mb-6 border-green-200 dark:border-green-800">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <Avatar className="h-32 w-32 border-4 border-green-500">
                                    <AvatarImage
                                        src={`${profile.avatar_url}?t=${Date.now()}`}
                                        alt="User avatar"
                                    />
                                    <AvatarFallback className="bg-green-100 dark:bg-green-900">
                                        <User className="h-16 w-16 text-green-600" />
                                    </AvatarFallback>
                                </Avatar>
                                <button
                                    onClick={handleAvatarClick}
                                    disabled={isUploadingAvatar}
                                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-not-allowed"
                                >
                                    {isUploadingAvatar ? (
                                        <Loader2 className="h-8 w-8 text-white animate-spin" />
                                    ) : (
                                        <Camera className="h-8 w-8 text-white" />
                                    )}
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarUpload}
                                />
                            </div>
                            <h2 className="mt-4 text-2xl font-semibold">{profile.fullname || "Người dùng"}</h2>
                            <p className="text-sm text-muted-foreground">@{profile.username || profile.email}</p>
                            <div className="mt-2 flex items-center gap-2">
                                <span className={cn(
                                    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                                    profile.permission === "admin"
                                        ? "bg-yellow-600 text-white dark:bg-yellow-600 dark:text-white"
                                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                )}>
                                    {profile.permission === "admin" ? (
                                        <>
                                            <Crown className="h-3 w-3 mr-1" />
                                            Quản trị viên
                                        </>
                                    ) : (
                                        <>
                                            <Shield className="h-3 w-3 mr-1" />
                                            Thành viên
                                        </>
                                    )}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Messages */}
                {error && (
                    <div className="mb-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-3 rounded-md text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-3 rounded-md text-sm">
                        {success}
                    </div>
                )}

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="info">Thông tin</TabsTrigger>
                        <TabsTrigger value="security">Bảo mật</TabsTrigger>
                    </TabsList>

                    {/* Information Tab */}
                    <TabsContent value="info">
                        <Card className="border-green-200 dark:border-green-800">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle>Thông Tin Cá Nhân</CardTitle>
                                        <CardDescription>Xem và chỉnh sửa thông tin của bạn</CardDescription>
                                    </div>
                                    {!isEditing ? (
                                        <Button
                                            onClick={() => setIsEditing(true)}
                                            variant="outline"
                                            className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                                        >
                                            <Edit2 className="h-4 w-4 mr-2" />
                                            Chỉnh sửa
                                        </Button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={handleSave}
                                                disabled={isLoading}
                                                className="bg-green-600 hover:bg-green-700"
                                            >
                                                {isLoading ? (
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                ) : (
                                                    <Save className="h-4 w-4 mr-2" />
                                                )}
                                                Lưu
                                            </Button>
                                            <Button
                                                onClick={handleCancel}
                                                variant="outline"
                                                disabled={isLoading}
                                            >
                                                <X className="h-4 w-4 mr-2" />
                                                Hủy
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="fullname" className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Họ và tên
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            id="fullname"
                                            name="fullname"
                                            value={formData.fullname}
                                            onChange={handleInputChange}
                                            placeholder="Nhập họ và tên"
                                            className="border-green-300 focus:border-green-500"
                                        />
                                    ) : (
                                        <p className="text-lg">{profile.fullname || "Chưa cập nhật"}</p>
                                    )}
                                </div>

                                {/* Username */}
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Tên người dùng
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            id="username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            placeholder="Nhập tên người dùng"
                                            className="border-green-300 focus:border-green-500"
                                        />
                                    ) : (
                                        <p className="text-lg">{profile.username || "Chưa cập nhật"}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        Email
                                    </Label>
                                    <p className="text-lg">{profile.email}</p>
                                    <p className="text-sm text-muted-foreground">Email không thể chỉnh sửa</p>
                                </div>

                                {/* Date of Birth */}
                                <div className="space-y-2">
                                    <Label htmlFor="date_of_birth" className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Ngày sinh
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            id="date_of_birth"
                                            name="date_of_birth"
                                            type="date"
                                            value={formData.date_of_birth}
                                            onChange={handleInputChange}
                                            className="border-green-300 focus:border-green-500"
                                        />
                                    ) : (
                                        <p className="text-lg">
                                            {profile.date_of_birth
                                                ? new Date(profile.date_of_birth).toLocaleDateString("vi-VN")
                                                : "Chưa cập nhật"
                                            }
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security">
                        <Card className="border-green-200 dark:border-green-800">
                            <CardHeader>
                                <CardTitle>Bảo Mật</CardTitle>
                                <CardDescription>Thông tin xác thực và bảo mật tài khoản</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Verification Status */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg">Trạng thái xác thực</h3>

                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-5 w-5 text-green-600" />
                                            <div>
                                                <p className="font-medium">Email</p>
                                                <p className="text-sm text-muted-foreground">{profile.email}</p>
                                            </div>
                                        </div>
                                        {profile.is_email_verified ? (
                                            <div className="flex items-center gap-2 text-green-600">
                                                <CheckCircle2 className="h-5 w-5" />
                                                <span className="text-sm font-medium">Đã xác thực</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-red-600">
                                                <XCircle className="h-5 w-5" />
                                                <span className="text-sm font-medium">Chưa xác thực</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Shield className="h-5 w-5 text-green-600" />
                                            <div>
                                                <p className="font-medium">Số điện thoại</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {profile.is_phone_verified ? "Đã liên kết" : "Chưa liên kết"}
                                                </p>
                                            </div>
                                        </div>
                                        {profile.is_phone_verified ? (
                                            <div className="flex items-center gap-2 text-green-600">
                                                <CheckCircle2 className="h-5 w-5" />
                                                <span className="text-sm font-medium">Đã xác thực</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-red-600">
                                                <XCircle className="h-5 w-5" />
                                                <span className="text-sm font-medium">Chưa xác thực</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Verification History */}
                                {profile.verifications && profile.verifications.length > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-lg">Lịch sử xác thực</h3>
                                        <div className="space-y-3">
                                            {profile.verifications.map((verification) => (
                                                <div
                                                    key={verification.id}
                                                    className="p-4 border rounded-lg"
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium capitalize">
                                                                {verification.method === 'email' ? 'Email' : 'Số điện thoại'}
                                                            </span>
                                                            {verification.is_verified ? (
                                                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                            ) : (
                                                                <XCircle className="h-4 w-4 text-red-600" />
                                                            )}
                                                        </div>
                                                        <span className={cn(
                                                            "text-xs px-2 py-1 rounded-full",
                                                            verification.is_verified
                                                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                        )}>
                                                            {verification.is_verified ? "Đã xác thực" : "Chưa xác thực"}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mb-1">{verification.value}</p>
                                                    {verification.verified_at && (
                                                        <p className="text-xs text-muted-foreground">
                                                            Xác thực lúc: {new Date(verification.verified_at).toLocaleString("vi-VN")}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Additional Actions */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => router.push("/history")}>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <h3 className="font-semibold text-lg mb-2">Lịch Sử Xem</h3>
                                <p className="text-sm text-muted-foreground">Xem lại các phim bạn đã xem</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => router.push("/favorites")}>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <h3 className="font-semibold text-lg mb-2">Phim Yêu Thích</h3>
                                <p className="text-sm text-muted-foreground">Danh sách phim bạn yêu thích</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
