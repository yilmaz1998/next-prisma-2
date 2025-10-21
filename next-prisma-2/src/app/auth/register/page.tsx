"use client"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation";


const page = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();

  const handleRegister = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()

    if (res.ok) {
      router.push("/auth/login");
    } else {
      console.error(data.message);
      alert(`Registration failed: ${data.message}`);
    }
  }

  return (
    <div className="w-full  min-h-[calc(100vh-5rem)] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl text-center mb-12">Register</h1>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" type="text" placeholder="Max Leiter" value={username} onChange={(e) => setUsername(e.target.value)} />
              <FieldDescription>
                Choose a unique username for your account.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Field>
          </FieldGroup>
        </FieldSet>
        <div className="mt-4 flex justify-center">
          <Button onClick={handleRegister} variant="outline">Register</Button>
          <Link href="/">
            <Button className="ml-2" variant="outline">Go Back</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page