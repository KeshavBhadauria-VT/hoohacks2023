import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import Logout from './logout';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Head>
        <title>HooHacks</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

        <h1>{user ? `Hello ${user.email}`: "Hello Guest"}</h1>

        {user ? <Logout/> : <></>}
             

        
      </main>
    </>
  )
}
