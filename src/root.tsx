// @refresh reload
import { Suspense, createEffect, onCleanup, onMount } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import { logout, pb, pbStore, setPbStore, subscribe, unsubscribe, user } from "./service";
import { User } from "./types";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { Toaster } from "solid-toast";

const UNPROTECTED_PATHS = ["/login", "/create"]
const queryClient = new QueryClient()

export default function Root() {


  onMount(() => {
    const authItem = JSON.parse(localStorage.getItem("pocketbase_auth") ?? "{}")
    if (authItem.token) {
      setPbStore("user", pb.authStore.model as any as User)
      subscribe()
    }
  })

  onCleanup(() => {
    unsubscribe()
  })

  const onLogout = () => {
    logout()
    window.location.pathname = "/login"
  }

  // Send the user to the login screen if they try to access some info
  createEffect(() => {
    if (!pbStore.user && !UNPROTECTED_PATHS.includes(window.location.pathname)) {
      window.location.pathname = "/login"
    }
  }, [user()])

  return (
    <QueryClientProvider client={queryClient}>
      <Html lang="en" data-theme="default">
        <Head>
          <Title>ChapterLink</Title>
          <Meta charset="utf-8" />
          <Meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Body>
          <Suspense>
            <ErrorBoundary>
            <Toaster />
              <nav class="navbar bg-primary text-primary-content" data-theme="cupcake">
                <div class="navbar-start">
                  <div class="dropdown">
                    <label tabIndex={0} class="btn btn-ghost btn-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li><a href="/">Homepage</a></li>
                      <li><a href="/users">Users</a></li>
                      <li><a href="/events">Events</a></li>
                      <li><a>About</a></li>
                    </ul>
                  </div>
                </div>
                <div class="navbar-center">
                  <a class="btn btn-ghost normal-case text-xl" href="/">chapterLink</a>
                </div>
                <div class="navbar-end">
                  <div class="dropdown dropdown-end">
                    <label tabIndex={0} class="btn outline btn-circle">
                      {pbStore.user?.first[0] ?? "?"}
                    </label>
                    <ul tabIndex={0} class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li><a href="/settings">Settings</a></li>
                      <li>{pbStore.user !== null ? <button onClick={onLogout}>Logout</button> : <a href="/login">Login</a>}</li>
                    </ul>
                  </div>
                </div>
              </nav>
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>
          <Scripts />
        </Body>
      </Html>
    </QueryClientProvider>
  );
}
