import React from 'react';
import { createBrowserRouter, Outlet } from "react-router";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin";
import { Distributor } from "./pages/Distributor";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

const Root = () => <Outlet />;

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900">
    <h1 className="text-6xl font-light tracking-tighter mb-4">404</h1>
    <p className="text-gray-500 uppercase tracking-widest text-sm mb-8">System offline or path invalid</p>
    <a href="/" className="border-b border-black pb-1 hover:text-gray-500 transition">Return to Base</a>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "product/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "login", Component: Login },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "admin", Component: Admin },
      { path: "distributor", Component: Distributor },
      { path: "*", Component: NotFound },
    ],
  },
]);
