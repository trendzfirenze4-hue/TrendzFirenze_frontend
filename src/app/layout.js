

// "use client";

// import { Provider } from "react-redux";
// import { store } from "@/redux/store";
// import "@/app/globals.css";
// import AuthInitializer from "@/components/AuthInitializer";
// import CartDrawer from "@/components/cart/CartDrawer";
// //import Navbar from "@/components/Navbar";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
// import AnnouncementBar from "../components/layout/AnnouncementBar";




// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <Provider store={store}>
//           <AuthInitializer />
//           <AnnouncementBar />
//           <Navbar />
//           {children}
//           <Footer />
//           <CartDrawer />
//         </Provider>
//       </body>
//     </html>
//   );
// }




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