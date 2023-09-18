import { FormProps } from '@/app/page'
import { Html } from '@react-email/html'
import { Button } from '@react-email/button'
import { Heading } from '@react-email/heading'
import { Head } from '@react-email/head'
import { Text } from '@react-email/text'
import { Row } from '@react-email/row'
import { Column } from '@react-email/column'
import { Tailwind } from '@react-email/tailwind' // to allow us use tailwind classes in email template

type Props = FormProps // receive contact data

const Email = ({ email, fullName, message  }: Props) => {
  return (
    <Tailwind>
        <Html lang='en'>
            <Head>
                <title>Test Resend Email with React Email & Next.js</title>
            </Head>
            <Heading as='h1' className='text-2xl mb-5 font-bold'>Hi! {fullName}</Heading>
            <Row>
                <Column>
                    <Text className='text-md my-2'>Message: {message}</Text>
                </Column>
            </Row>
            <Row>
                <Column>
                    <Text className='text-md my-2'>Your entered email was: {email}</Text>
                </Column>
            </Row>
            <Row>
                <Column>
                    <Button href='https://hamudeshahin.me' className='bg-black text-white rounded-lg px-4 py-2 text-lg'>Test Button</Button>
                </Column>
            </Row>
        </Html>
    </Tailwind>
  )
}

export default Email