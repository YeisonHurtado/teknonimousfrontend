import React from 'react'
import Header from './Header'
import Footer from './Footer'
interface Props {
    children: any
}
export const StaticLayout = ({children}: Props) => {
  return (
    <>
    <Header/>
    {children}
    <Footer/>
    </>
  )
}
