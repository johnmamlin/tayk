import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-500">
      {children}
    </div>
  )
}

export default Layout