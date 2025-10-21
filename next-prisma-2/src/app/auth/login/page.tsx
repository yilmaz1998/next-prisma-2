"use client"

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { signIn } from "next-auth/react"
import React, { useState } from "react"


const page = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    await signIn("credentials", {
      username: username,
      password: password,
      callbackUrl: "/",
    })
  }

  return (
    <div className="w-full flex items-center min-h-[calc(100vh-5rem)] justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl text-center mb-12">Login</h1>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" type="text" placeholder="Max Leiter" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Field>
          </FieldGroup>
        </FieldSet>
        <div className="mt-4 flex justify-center">
          <Button onClick={handleLogin} variant="outline">Login</Button>
          <Link href="/">
            <Button className="ml-2" variant="outline">Go Back</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page