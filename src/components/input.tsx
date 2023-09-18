import { FC, HTMLAttributes, HTMLInputTypeAttribute } from "react"
import {
    FieldValues,
    UseFormRegister,
    RegisterOptions,
    UseFormRegisterReturn

  } from "react-hook-form";

type InputProps = {
    label?: string
    type?: HTMLInputTypeAttribute
    register: UseFormRegisterReturn
    error: string | null
} & HTMLAttributes<HTMLInputElement>

export const Input:FC<InputProps> = ({
    label,
    register,
    error,
    ...rest
}) => {
  return (
    <div className="flex flex-col gap-1">
        <input
            className="p-2 rounded-lg border border-slate-400 outline-none hover:border-black placeholder:text-gray-600"
            {...register}
            {...rest}
        />
        {error ? (
            <span className="text-red-600 text-sm">
                {error}
            </span>
        ) : null}

    </div>
  )
}


type TextAreaProps = {
    label?: string
    type?: HTMLInputTypeAttribute
    register: UseFormRegisterReturn
    error: string | null
} & HTMLAttributes<HTMLTextAreaElement>

export const TextArea:FC<TextAreaProps> = ({
    label,
    register,
    error,
    ...rest
}) => {
  return (
    <div className="flex flex-col gap-1">
        <textarea
            className="p-2 rounded-lg border border-slate-400 outline-none hover:border-black placeholder:text-gray-600"
            rows={4}
            {...register}
            {...rest}
        />
        {error ? (
            <span className="text-red-600 text-sm">
                {error}
            </span>
        ) : null}

    </div>
  )
}

