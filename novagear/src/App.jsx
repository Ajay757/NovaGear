import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Survey from "./pages/Survey";
import Favourites from "./pages/Favourites";
import PCBuilds from "./pages/PCBuilds";
import PCBuildCompare from "./pages/PCBuildCompare";
import Deals from "./pages/Deals";
import Account from "./pages/Account";

function HashScroll() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      window.requestAnimationFrame(() => {
        document
          .getElementById(location.hash.slice(1))
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [favouriteItems, setFavouriteItems] = useState([]);
  const [accountUser, setAccountUser] = useState(null);

  const cartItemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );
  const favouriteItemCount = favouriteItems.length;

  function addLineItemToCart(lineItem) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === lineItem.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === lineItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { ...lineItem, quantity: 1 }];
    });
  }

  function addToCart(product) {
    addLineItemToCart({ ...product, itemType: "product" });
  }

  function addBundleToCart(bundle) {
    addLineItemToCart(bundle);
  }

  function updateCartQuantity(productId, quantity) {
    if (quantity < 1) {
      setCartItems((currentItems) =>
        currentItems.filter((item) => item.id !== productId),
      );
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }

  function isFavourite(productId) {
    return favouriteItems.some((item) => item.id === productId);
  }

  function toggleFavourite(product) {
    setFavouriteItems((currentItems) => {
      if (currentItems.some((item) => item.id === product.id)) {
        return currentItems.filter((item) => item.id !== product.id);
      }

      return [...currentItems, product];
    });
  }

  function loginAccount(credentials) {
    const nameFromEmail =
      credentials.email
        .split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase()) || "NovaGear Player";

    setAccountUser({
      fullName: nameFromEmail,
      email: credentials.email,
      phone: "613-555-0188",
      address: "120 Campus Drive",
      city: "Ottawa",
      province: "ON",
      postalCode: "K1N 6N5",
      memberSince: "June 2026",
    });
  }

  function signupAccount(values) {
    setAccountUser({
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      address: values.address,
      city: values.city,
      province: values.province,
      postalCode: values.postalCode,
      memberSince: "June 2026",
    });
  }

  function logoutAccount() {
    setAccountUser(null);
  }

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-[#F4F2F8] text-zinc-950">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar
          cartItemCount={cartItemCount}
          favouriteItemCount={favouriteItemCount}
          accountUser={accountUser}
        />
        <HashScroll />
        <main
          id="main-content"
          className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12"
        >
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onAddToCart={addToCart}
                  onToggleFavourite={toggleFavourite}
                  isFavourite={isFavourite}
                />
              }
            />
            <Route
              path="/products"
              element={
                <Products
                  onAddToCart={addToCart}
                  onToggleFavourite={toggleFavourite}
                  isFavourite={isFavourite}
                />
              }
            />
            <Route
              path="/favourites"
              element={
                <Favourites
                  favouriteItems={favouriteItems}
                  onAddToCart={addToCart}
                  onAddBundleToCart={addBundleToCart}
                  onToggleFavourite={toggleFavourite}
                  isFavourite={isFavourite}
                />
              }
            />
            <Route
              path="/pc-builds"
              element={
                <PCBuilds
                  onAddBundleToCart={addBundleToCart}
                  onToggleFavourite={toggleFavourite}
                  isFavourite={isFavourite}
                />
              }
            />
            <Route path="/pc-builds/compare" element={<PCBuildCompare />} />
            <Route
              path="/deals"
              element={
                <Deals
                  onAddBundleToCart={addBundleToCart}
                  onToggleFavourite={toggleFavourite}
                  isFavourite={isFavourite}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  onUpdateQuantity={updateCartQuantity}
                  onRemoveItem={removeFromCart}
                  onAddToCart={addToCart}
                  onToggleFavourite={toggleFavourite}
                  isFavourite={isFavourite}
                />
              }
            />
            <Route
              path="/checkout"
              element={<Checkout cartItems={cartItems} accountUser={accountUser} />}
            />
            <Route
              path="/confirmation"
              element={<Confirmation cartItems={cartItems} />}
            />
            <Route
              path="/account"
              element={
                <Account
                  user={accountUser}
                  onLogin={loginAccount}
                  onSignup={signupAccount}
                  onLogout={logoutAccount}
                  cartItemCount={cartItemCount}
                  favouriteItemCount={favouriteItemCount}
                />
              }
            />
            <Route path="/survey" element={<Survey />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
