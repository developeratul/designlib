import ProfileDetailsForm from "@/components/auth/onboarding/ProfileDetailsForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OnboardingPage() {
  return (
    <main className="w-full flex justify-center py-24">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>Profile info</CardTitle>
          <CardDescription>
            Before we proceed, let&apos;s fill up your profile with some info.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileDetailsForm />
        </CardContent>
      </Card>
    </main>
  );
}
