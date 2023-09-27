// @refresh reload
import { Show, Suspense, createEffect, onCleanup, onMount } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Route,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import { logout, pb, pbStore, setPbStore, subscribe, unsubscribe, user } from "./service";
import { User } from "./types";
import { Toaster } from "solid-toast";
import { AuthProvider } from "./service/auth/AuthContext";
import { Navbar } from "./components/nav/Navbar";

const UNPROTECTED_PATHS = ["/login", "/create"]

export default function Root() {

  onCleanup(() => {
    unsubscribe()
  })

  const onLogout = () => {
    logout()
    window.location.pathname = "/login"
  }

  return (
    <Html lang="en" data-theme="corporate">
      <Head>
        <Title>ChapterLink</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <Toaster />
            <AuthProvider>
              <Navbar />
              <Routes>
                <FileRoutes />
              </Routes>
            </AuthProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
