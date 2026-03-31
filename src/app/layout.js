


"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "@/app/globals.css";
import AuthInitializer from "@/components/AuthInitializer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <AuthInitializer />
          {children}
        </Provider>
      </body>
    </html>
  );
}