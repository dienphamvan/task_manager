import { useState } from 'react'

// type ModalType = 'success' | 'error'

export enum ModalType {
    Success = 'success',
    Error = 'error',
}

export function useModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [modalType, setModalType] = useState<ModalType>(ModalType.Success)
    const [message, setMessage] = useState('')

    const showModal = (type: ModalType, msg: string) => {
        setModalType(type)
        setMessage(msg)
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return { isOpen, modalType, message, showModal, closeModal }
}
