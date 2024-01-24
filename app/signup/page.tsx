import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "@node_modules/next/link";

export default function SignUpPage() {
  return (
    <div className="flex-center w-full mt-20">
      <div className="w-full max-w-md">
        <Card className="mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">University email</Label>
                <Input id="email" placeholder="Enter your email (.edu)" required type="email"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Password</Label>
                <Input id="newPassword" required type="password"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" required type="password"/>
              </div>
              <Button className="w-full" type="submit">
                Create Account
              </Button>
            </div>
            <div className="flex-center mt-4 text-center text-sm gap-2">
              <p>Already have an account?</p>
              <Link className="underline" href="#">
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
)
}

