import { SigninForm } from "@/components/signin-form";

export default async function Home() {

  return (

<div className="relative w-full md:h-screen  overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-[green] to-[black] skew-y-12 -translate-y-1/2 -translate-x-1/2 scale-150" />
    <div className="absolute inset-0 bg-gradient-to-tl from-[black] to-[black] -skew-y-12 translate-y-1/4 translate-x-1/2 scale-150" />
    <div className="relative z-10 flex items-center justify-center h-full">
    <SigninForm />
  </div>
</div>
  );
}
