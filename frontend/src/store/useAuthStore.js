import { create } from "zustand";
import { api } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null, // Checking user authenticated or not
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true, // loading state for, Is user authenticated?
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await api.get("auth/check")

            set({ authUser: res.data })

        } catch (error) {
            console.log("Error in checkAuth", error);
            set({ authUser: null })

        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })

        try {

            const res = await api.post("/auth/signup", data)
            set({ authUser: res.data })
            toast.success("Account created successfully")

        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true })

        try {
            const res = await api.post("/auth/login", data)
            set({ authUser: res.data })
            toast.success("Logged in successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            await api.post("auth/logout")
            set({ authUser: null })
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateProfile: async (data) => {
        set({isUpdatingProfile: true})

        try {
            const res = await api.put("/auth/update-profile", data)
            set({authUser: res.data})
            toast.success("Profile updated successfully")

        } catch (error) {
            console.log("Error in updateProfile", error)
            toast.error(error.response.data.message)
        } finally {
            set({isUpdatingProfile: false})
        }
    }

}))