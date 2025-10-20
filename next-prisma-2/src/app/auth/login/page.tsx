import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const page = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl text-center mb-12">Login</h1>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" type="text" placeholder="Max Leiter" />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" placeholder="********" />
            </Field>
          </FieldGroup>
        </FieldSet>
        <div className="mt-4 flex justify-center">
          <Button variant="outline">Login</Button>
        </div>
      </div>
    </div>
  )
}

export default page