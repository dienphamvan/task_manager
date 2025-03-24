import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ModalProps {
    isOpen: boolean
    modalType: 'success' | 'error'
    message: string
    onClose: () => void
}

export function Modal({ isOpen, modalType, message, onClose }: ModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle>
                        {modalType === 'success' ? 'Success!' : 'Error!'}
                    </DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <Button onClick={onClose}>OK</Button>
            </DialogContent>
        </Dialog>
    )
}
