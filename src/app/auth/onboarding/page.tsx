import ProfileDetailsForm from "@/components/auth/onboarding/ProfileDetailsForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OnboardingPage() {
  return (
    <main className="w-full flex justify-center py-24">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>Welcome to DesignLib community!</CardTitle>
          <CardDescription>
            Let&apos;s get you started with your account. Fill in the form below and we&apos;ll get
            you set up.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileDetailsForm />
        </CardContent>
      </Card>
    </main>
  );
}
