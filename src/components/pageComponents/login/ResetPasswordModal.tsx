import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPasswordModal() {
  return (
    <Dialog>
      <DialogTrigger className="hover:cursor-pointer">
        Forgot password?
      </DialogTrigger>
      <DialogContent className="gap-y-5">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
        </DialogHeader>
        <Field>
          <FieldLabel htmlFor="reset-email">Email</FieldLabel>
          <Input
            id="reset-email"
            name="reset-email"
            type="email"
            placeholder="merlin@example.com"
          />
        </Field>
        <Button className="w-full" size="lg">
          Send Code
        </Button>
      </DialogContent>
    </Dialog>
  );
}
