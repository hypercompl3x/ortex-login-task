import { Form, useActionData } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const actionData = useActionData<Record<string, string> | undefined>();

  return (
    <Form
      action="/login"
      method="post"
      className="w-full flex flex-col gap-y-5 items-center"
    >
      <FieldSet className="w-full">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="text"
              placeholder="merlin@example.com"
              isErrored={!!actionData?.email}
            />
            <FieldError>{actionData?.email}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              isErrored={!!actionData?.password}
            />
            <FieldError>{actionData?.password}</FieldError>
          </Field>
        </FieldGroup>
      </FieldSet>
      <Button type="submit" className="w-full" size="lg">
        Login
      </Button>
    </Form>
  );
}
