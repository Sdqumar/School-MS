import React, { useState } from 'react'
import { signIn } from 'next-auth/client'
import Router from 'next/router'

const BtnLogin = ({children, provider, bgColor, txtColor, csrfToken, options}) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await signIn(provider.id, options)
    setLoading(false)

    if(provider.id === "credentials"){
      if(res.error){
        if(res.error === "Success! Check your email."){
          signIn('email', {email: options.email})
        }
      }

      return Router.push("/")
    }
  }
  return (
    <form onSubmit={handleSubmit}>

      {children}

      <button type="submit" className="btn w-100 my-2 py-3"
      style={{ background: `${bgColor}`, color: `${txtColor}`}}>
        Sign in 
      </button>

    </form>
  )
}

BtnLogin.defaultProps = {
  txtColor: '#eee'
}
export default BtnLogin