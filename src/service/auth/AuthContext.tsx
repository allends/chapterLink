import { Accessor, Match, Show, Switch, createContext, createSignal, onMount, useContext } from 'solid-js'
import { Organization, User } from '~/types'
import { pb, subscribe } from '~/service'
import { FullLoadingSpinner } from '~/components/util/FullLoadingSpinner'
import LoginPage from '~/routes/app/login'

const AuthContext = createContext()

type AuthContextType = {
  user: Accessor<User>,
  // organization: Organization,
}

export function AuthProvider(props: any) {
  const [noUser, setNoUser] = createSignal<boolean>(false)
  const [user, setUser] = createSignal<User | boolean>(false)
  const [organization, setOrganization] = createSignal<Organization | false>(false)

  onMount(async () => {
    if (window.location.pathname == "/login" || window.location.pathname == "/create") {
      setNoUser(true)
      return
    }
    const authItem = JSON.parse(localStorage.getItem("pocketbase_auth") ?? "{}")
    if (authItem.token) {
      setUser(pb.authStore.model as any as User)
      subscribe()
      pb.collection("organizations").getFirstListItem<Organization>(`id = ${authItem.model.organization}`).then(org => {
        setOrganization(org)
      }).catch(err => {
        console.log(err)
      })
    } else {
      window.location.pathname = "/login"
    }
  })

  return (
    <AuthContext.Provider value={{ user }}>
      <Switch>
        <Match when={noUser()}>
          <LoginPage />
        </Match>
        <Match when={!user()}>
          <FullLoadingSpinner />
        </Match>

        <Match when={typeof user() !== 'boolean'}>
          {props.children}
        </Match>
      </Switch>
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext) as any
}

