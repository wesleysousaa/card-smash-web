declare module 'react-native-dotenv' {
  export const EXPO_API_URL: string | undefined
}

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  // add other VITE_ variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
