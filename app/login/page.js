export const metadata = {
  title: 'login'
}
import SignInButton from "../_components/SignInButton";

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
        <SignInButton />
      </h2>
    </div>
  );
}
