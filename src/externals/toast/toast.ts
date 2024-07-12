import toast from 'react-hot-toast/headless'

export const success = (message: string) => toast.success(message)
export const error = (message: string) => toast.error(message)
