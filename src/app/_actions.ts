'use server' // tell next.js to use this at server-side not on the client-side.
import { Resend } from "resend";
import { FormProps } from "./page"; // import form data type
import Email from "@/components/email";


const RESEND_API_KEY = process.env.RESEND_API_KEY! // get API ket from .env file

console.log('RESEND_API_KEY');
console.log(RESEND_API_KEY);

const resend = new Resend(RESEND_API_KEY) // create instance of Resend

// our server action function
export async function sendEmailAction(params:FormProps) {
    try {
        const res = await resend.sendEmail({
            from: 'onboarding@resend.dev',
            to: params.email,
            react: Email(params),
            subject: `Message from ${params.fullName}`
        })
        if (!res.id) {
            return { success: false, error: "Something went wrong!" }
        }
        return { success: true, message: `Email has been sent to ${params.email}` }
    } catch (err) { // catch any unknown error if happen
        console.error(String(err));
        return { success: false, error: String(err) }
    }
}