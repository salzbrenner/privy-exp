import { PrivyProvider, useLogin, useLogout } from "@privy-io/react-auth";
import { Buffer } from "buffer";
import { useState } from "react";

if (!window.Buffer) {
  window.Buffer = Buffer;
}

export default function Privy() {
  return (
    <div>
      <h1>Privy</h1>
      <MyPrivyProviderWrapper>
        <LoginButton />
        <LogoutButton />
      </MyPrivyProviderWrapper>
    </div>
  );
}

let cachedProviderInstance: JSX.Element | null = null;

function MyPrivyProviderWrapper({ children }: { children: React.ReactNode }) {
  const [providerInstance] = useState(() => {
    if (!cachedProviderInstance) {
      cachedProviderInstance = <MyPrivyProvider>{children}</MyPrivyProvider>;
    }
    return cachedProviderInstance;
  });

  return providerInstance;
}

function MyPrivyProvider({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_ID as string}
      config={{
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: "https://your-logo-url",
        },
        embeddedWallets: {
          createOnLogin: "all-users",
          noPromptOnSignature: true,
        },
        loginMethods: ["sms", "google", "twitter", "apple"],
      }}
    >
      {children}
    </PrivyProvider>
  );
}

function LoginButton() {
  const { login } = useLogin({
    onComplete: (user) => {
      console.log("logged in", user);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return <button onClick={() => login()}>Login</button>;
}

function LogoutButton() {
  const { logout } = useLogout({
    onSuccess: () => {
      console.log("logged out");
    },
  });

  return <button onClick={() => logout()}>Logout</button>;
}
