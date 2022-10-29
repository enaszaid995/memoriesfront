
import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingSpinner from './form/LoaddingSpinner'
import MainNavigation from './MainNavigation'

const RootLayout = () => {
  return (
    <>
        <MainNavigation/>
        <main >
          <Suspense fallback={
          <div>
            <LoadingSpinner/>
          </div>
        }>

            <Outlet/>

          
            </Suspense>
        </main>
    </>
    
  )
}

export default RootLayout