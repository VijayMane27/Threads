import { ClerkProvider, UserButton } from "@clerk/nextjs";
import "../globals.css";

export default function () {
  return (
    <>
      {/* <ClerkProvider>
        <UserButton afterSignOutUrl="/" />
      </ClerkProvider> */}
      <h1 className="head-text text-left">Home</h1>
    </>
  );
}
