import { SignIn } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
            Welcome back to Moment
          </h1>
          <p className="text-muted-foreground">
            Continue your mindfulness journey
          </p>
        </div>
        
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-primary hover:bg-primary/90 text-white",
              card: "bg-white shadow-xl border rounded-xl",
              headerTitle: "text-gray-900",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton: 
                "border border-gray-200 hover:bg-gray-50 text-gray-900",
              formFieldLabel: "text-gray-700",
              formFieldInput: 
                "border border-gray-200 focus:border-primary/50 focus:ring-primary/50",
              footerActionLink: 
                "text-primary hover:text-primary/80",
              dividerLine: "bg-gray-200",
              dividerText: "text-gray-500"
            },
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"
        />
      </div>
    </div>
  )
}