import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useContext, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Logout from './logout';
import {createImage, segmentStory} from './api/test.js';
import albumItems from "../components/album.json"
import Header from '../components/Header'
import {Main} from '../components/Main'

const inter = Inter({ subsets: ['latin'] })

const prompt = 'yellow ferrari'

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
      {/* <main>
    
    
    
    
      </main> */}

      <div>
        <Header user={user}/>
        <Main user={user} album={albumItems}/>
        {/* <Footer /> */}
      </div>


    </>
  )
}