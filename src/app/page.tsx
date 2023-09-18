'use client'
import { Input, TextArea } from "@/components/input";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from "react";
import { sendEmailAction } from "./_actions";

const formSchema = z.object({
  fullName: z.string().nonempty(), // required
  email: z.string().email().nonempty(), // type of email and required
  message: z.string().nonempty() // required
})

// Form values type
export type FormProps = z.infer<typeof formSchema>

export default function Home() {
  const [data, setData] = useState<{
      success: boolean
      error?:string | null
      loading: boolean
      message?: string
    }>({
    success: false,
    error: null,
    loading: false,
    message: ''
  })

  // create form hook
  const {
    register,
    handleSubmit,
    reset,
    formState:{ errors }
  } = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      message: ''
    }
  })

  // submit function
  const submit = async (values: FormProps) => {
    setData(prev => ({ ...prev, loading: true })) // set loading true for better ux experience
    const data = await sendEmailAction(values); // call server action and send data to it.
    if (data.success) { // if sent successfully
      setData({
        loading: false,
        success: true,
        error: null,
        message: data.message
      })
      reset() // reset form fields
    } else { // if there is an error
      setData({
        loading: false,
        success: false,
        error: data.error,
      })
    }
  }

  return (
   <main className='my-20'>
    <div className='max-w-xl mx-auto border border-slate-500 shadow-xl p-5'>
      <h1 className="text-center font-bold text-2xl mb-5">Send Email</h1>
      <form onSubmit={handleSubmit(submit)}>
        <div className="grid grid-cols-1 gap-2">
          {
            !data.success && data.error ? (
              <div className="my-1 p-2 bg-red-500/25 text-red-500 border border-red-500">
                {data.error}
              </div>
            ) : null
          }
          {
            data.success && !data.error ? (
              <div className="my-1 p-2 bg-green-500/25 text-green-500 border border-green-500">
                {data.message}
              </div>
            ) : null
          }
          <Input
            placeholder="Full Name"
            label="Full Name"
            type="text"
            register={register('fullName')}
            error={errors?.fullName?.message || null}
          />
          <Input
            placeholder="Email"
            label='Email'
            type="text"
            register={register('email')}
            error={errors?.email?.message || null}
          />
          <TextArea
            placeholder="Message"
            label='Message'
            register={register('message')}
            error={errors?.message?.message || null}
          />

          <button type="submit" disabled={data.loading} className="bg-black text-white outline-none border-none p-2 rounded-lg disabled:opacity-50">
            {data.loading ? 'Sending ...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
   </main>
  )
}
