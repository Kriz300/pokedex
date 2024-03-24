//Basic imports
import 'bootstrap/dist/css/bootstrap.min.css'
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { AppProps } from "next/app";
import { Container } from 'react-bootstrap';

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
    return(
        <>
        <div className={inter.className}>
            <main>
                <Container className='py-4'>
                    <Component {...pageProps} />
                </Container>
            </main>
        </div>
        </>
    );
}
