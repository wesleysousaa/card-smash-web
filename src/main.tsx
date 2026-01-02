import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

import Home from './pages/home/index.tsx'
import Lobby from './pages/lobby/index.tsx'
import { Container } from './global-sx.style.ts'
import { BattleProvider } from './context/BattleContext.tsx'
import Battle from './pages/battle/index.tsx'

const rootRoute = createRootRoute({
  component: () => (
    <BattleProvider autoConnect>
      <Outlet />
    </BattleProvider>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const lobbyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/lobby',
  component: Lobby,
})

const battleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/battle/$roomId',
  component: Battle,
})

const routeTree = rootRoute.addChildren([indexRoute, lobbyRoute, battleRoute])

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <Container>
        <RouterProvider router={router} />
      </Container>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
