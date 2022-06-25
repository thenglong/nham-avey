import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { THEME_CONFIG } from "src/config/app-config"

// TODO: extract from i18next
type Locale = "en" | "kh"

export interface ThemeState {
  navCollapsed: boolean
  locale: Locale
  mobileNav: boolean
  currentTheme: "light" | "dark"
}

export const themeSlice = createSlice({
  name: "theme",
  initialState: THEME_CONFIG,
  reducers: {
    toggleCollapsedNav: (state, action: PayloadAction<boolean>) => {
      state.navCollapsed = action.payload
    },
    onLocaleChange: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload
    },
    onMobileNavToggle: (state, action: PayloadAction<boolean>) => {
      state.mobileNav = action.payload
    },
    onSwitchTheme: (state, payload: PayloadAction<"light" | "dark">) => {
      state.currentTheme = payload.payload
    },
  },
})

export default themeSlice
