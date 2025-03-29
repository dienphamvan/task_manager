'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/initSupabase'
import { ModalType, useModal } from '@/hooks/useModal'
import { Modal } from './Modal'

const signupSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function SignupForm() {
    const { isOpen, modalType, message, showModal, closeModal } = useModal()

    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: { email: '', password: '' },
    })

    const onSubmit = async (values: z.infer<typeof signupSchema>) => {
        try {
            const res = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
            })

            if (res.data.user?.identities?.length === 0) {
                throw new Error('User already exists')
            }

            if (res.error) {
                throw res.error
            }

            form.reset()

            showModal(
                ModalType.Success,
                'Check your email for the confirmation link'
            )
        } catch (error: any) {
            showModal(
                ModalType.Error,
                error?.error_description ||
                    error?.message ||
                    JSON.stringify(error)
            )
        }
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4 p-4 md:max-w-1/3 w-full mx-auto border rounded-lg'
                >
                    <h2 className='text-lg font-semibold'>Sign Up</h2>

                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='you@example.com'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password Field */}
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type='password'
                                        placeholder='Enter password'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button type='submit' className='w-full'>
                        Sign Up
                    </Button>
                </form>
            </Form>

            <Modal
                isOpen={isOpen}
                message={message}
                modalType={modalType}
                onClose={closeModal}
            />
        </>
    )
}
