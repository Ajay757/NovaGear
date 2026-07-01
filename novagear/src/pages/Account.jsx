import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const loginInitialValues = {
  email: "",
  password: "",
};

const signupInitialValues = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  province: "",
  postalCode: "",
  password: "",
  confirmPassword: "",
};

const signupFields = [
  { name: "fullName", label: "Full name", type: "text", placeholder: "Alex Chen" },
  { name: "email", label: "Email", type: "email", placeholder: "alex@example.com" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "613-555-0148" },
  { name: "address", label: "Address", type: "text", placeholder: "120 Campus Drive" },
  { name: "city", label: "City", type: "text", placeholder: "Ottawa" },
  { name: "province", label: "Province", type: "text", placeholder: "ON" },
  { name: "postalCode", label: "Postal code", type: "text", placeholder: "K1N 6N5" },
  { name: "password", label: "Password", type: "password", placeholder: "Create a password" },
  {
    name: "confirmPassword",
    label: "Confirm password",
    type: "password",
    placeholder: "Re-enter your password",
  },
];

const pastOrders = [
  {
    id: "NG-48219",
    date: "June 24, 2026",
    status: "Delivered",
    total: "$329.97",
    items: ["NovaGear Phantom TKL", "Razer Viper V3 HyperSpeed", "NovaGear ArcPad XL"],
  },
  {
    id: "NG-47102",
    date: "May 18, 2026",
    status: "Shipped",
    total: "$1,715.74",
    items: ["Creator Stream Build", "Logitech G Pro X Lightspeed"],
  },
];

function TextInput({ field, value, onChange, error }) {
  const id = `account-${field.name}`;

  return (
    <div>
      <label htmlFor={id} className="text-sm font-black text-zinc-800">
        {field.label}
      </label>
      <input
        id={id}
        name={field.name}
        type={field.type}
        value={value}
        placeholder={field.placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(field.name, event.target.value)}
        className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3.5 text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-violet-500 ${
          error ? "border-rose-400" : "border-zinc-200"
        }`}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm font-semibold text-rose-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function AccountProfile({ user, onLogout, cartItemCount, favouriteItemCount }) {
  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.22),transparent_22rem),linear-gradient(135deg,#111113,#2A2037_58%,#F8F5FF)] p-8 text-white shadow-sm sm:p-10 lg:p-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-violet-200">
              NovaGear Account
            </p>
            <h1 className="mt-3 text-5xl font-black tracking-tight">
              Welcome back, {user.fullName.split(" ")[0]}.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/78">
              Review your profile, saved gear, cart status, and recent NovaGear
              orders from one place.
            </p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-wide text-zinc-950 hover:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            Log out
          </button>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-[2rem] bg-white p-7 shadow-sm">
          <p className="text-sm font-black uppercase tracking-wide text-violet-700">
            Profile
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-zinc-950">
            Account details
          </h2>
          <dl className="mt-6 space-y-4">
            <div>
              <dt className="text-sm font-black uppercase tracking-wide text-zinc-500">
                Name
              </dt>
              <dd className="mt-1 font-bold text-zinc-950">{user.fullName}</dd>
            </div>
            <div>
              <dt className="text-sm font-black uppercase tracking-wide text-zinc-500">
                Email
              </dt>
              <dd className="mt-1 font-bold text-zinc-950">{user.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-black uppercase tracking-wide text-zinc-500">
                Shipping address
              </dt>
              <dd className="mt-1 font-bold text-zinc-950">
                {user.address
                  ? `${user.address}, ${user.city}, ${user.province} ${user.postalCode}`
                  : "No saved address yet"}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-black uppercase tracking-wide text-zinc-500">
                Member since
              </dt>
              <dd className="mt-1 font-bold text-zinc-950">{user.memberSince}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-[2rem] bg-white p-7 shadow-sm">
          <p className="text-sm font-black uppercase tracking-wide text-violet-700">
            Quick Status
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-zinc-950">
            Your setup activity
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-violet-50 p-5">
              <p className="text-3xl font-black text-violet-700">{cartItemCount}</p>
              <p className="mt-1 text-sm font-black uppercase tracking-wide text-zinc-600">
                Cart items
              </p>
            </div>
            <div className="rounded-3xl bg-amber-50 p-5">
              <p className="text-3xl font-black text-amber-700">{favouriteItemCount}</p>
              <p className="mt-1 text-sm font-black uppercase tracking-wide text-zinc-600">
                Saved items
              </p>
            </div>
            <div className="rounded-3xl bg-emerald-50 p-5">
              <p className="text-3xl font-black text-emerald-700">{pastOrders.length}</p>
              <p className="mt-1 text-sm font-black uppercase tracking-wide text-zinc-600">
                Past orders
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/cart"
              className="btn-primary-glow rounded-full px-5 py-3 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              View Cart
            </Link>
            <Link
              to="/favourites"
              className="btn-secondary-polish rounded-full border px-5 py-3 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              View Favourites
            </Link>
          </div>
        </section>
      </div>

      <section className="rounded-[2rem] bg-white p-7 shadow-sm">
        <p className="text-sm font-black uppercase tracking-wide text-violet-700">
          Past Orders
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-zinc-950">
          Recent NovaGear orders
        </h2>
        <div className="mt-6 grid gap-5">
          {pastOrders.map((order) => (
            <article
              key={order.id}
              className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xl font-black text-zinc-950">{order.id}</p>
                  <p className="mt-1 text-sm font-bold text-zinc-500">
                    {order.date} / {order.status}
                  </p>
                </div>
                <p className="text-2xl font-black text-zinc-950">{order.total}</p>
              </div>
              <p className="mt-4 text-sm font-semibold text-zinc-600">
                {order.items.join(", ")}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Account({
  user,
  onLogin,
  onSignup,
  onLogout,
  cartItemCount,
  favouriteItemCount,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [loginValues, setLoginValues] = useState(loginInitialValues);
  const [signupValues, setSignupValues] = useState(signupInitialValues);
  const [errors, setErrors] = useState({});
  const returnTo = location.state?.returnTo;

  if (user) {
    return (
      <AccountProfile
        user={user}
        onLogout={onLogout}
        cartItemCount={cartItemCount}
        favouriteItemCount={favouriteItemCount}
      />
    );
  }

  function updateLogin(name, value) {
    setLoginValues((current) => ({ ...current, [name]: value }));
  }

  function updateSignup(name, value) {
    setSignupValues((current) => ({ ...current, [name]: value }));
  }

  function submitLogin(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!loginValues.email.trim()) {
      nextErrors.loginEmail = "Enter your email to log in.";
    }

    if (!loginValues.password.trim()) {
      nextErrors.loginPassword = "Enter your password to log in.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      onLogin(loginValues);
      if (returnTo) {
        navigate(returnTo);
      }
    }
  }

  function submitSignup(event) {
    event.preventDefault();
    const nextErrors = {};

    signupFields.forEach((field) => {
      if (!signupValues[field.name].trim()) {
        nextErrors[field.name] = `Enter your ${field.label.toLowerCase()}.`;
      }
    });

    if (
      signupValues.password &&
      signupValues.confirmPassword &&
      signupValues.password !== signupValues.confirmPassword
    ) {
      nextErrors.confirmPassword = "Passwords must match.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      onSignup(signupValues);
      if (returnTo) {
        navigate(returnTo);
      }
    }
  }

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10 lg:p-12">
        <p className="text-sm font-black uppercase tracking-wide text-violet-700">
          Account
        </p>
        <div className="mt-3 max-w-3xl">
          <h1 className="text-5xl font-black tracking-tight text-zinc-950">
            Sign in to manage your setup.
          </h1>
          <p className="mt-4 text-lg leading-8 text-zinc-600">
            Log in for a quick demo session or create an account with the
            details NovaGear would need for orders, shipping, and saved gear.
          </p>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[2rem] bg-zinc-950 p-7 text-white shadow-sm">
          <p className="text-sm font-black uppercase tracking-wide text-violet-200">
            Why sign in?
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            Keep your upgrades organized.
          </h2>
          <div className="mt-6 space-y-3 text-sm font-bold text-white/78">
            <p className="rounded-2xl bg-white/10 p-4">Track past orders and demo shipping details.</p>
            <p className="rounded-2xl bg-white/10 p-4">Jump back into your cart and favourites faster.</p>
            <p className="rounded-2xl bg-white/10 p-4">Prepare for future NovaGear bundle recommendations.</p>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-7 shadow-sm">
          <div className="grid grid-cols-2 rounded-full bg-zinc-100 p-1">
            {["login", "signup"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setMode(option);
                  setErrors({});
                }}
                className={`rounded-full px-5 py-3 text-sm font-black uppercase tracking-wide transition focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                  mode === option
                    ? "bg-zinc-950 text-white"
                    : "text-zinc-600 hover:text-violet-700"
                }`}
              >
                {option === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          {mode === "login" ? (
            <form onSubmit={submitLogin} className="mt-7 space-y-5" noValidate>
              <TextInput
                field={{
                  name: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "you@example.com",
                }}
                value={loginValues.email}
                onChange={updateLogin}
                error={errors.loginEmail}
              />
              <TextInput
                field={{
                  name: "password",
                  label: "Password",
                  type: "password",
                  placeholder: "Enter your password",
                }}
                value={loginValues.password}
                onChange={updateLogin}
                error={errors.loginPassword}
              />
              <button
                type="submit"
                className="btn-primary-glow w-full rounded-full px-6 py-3 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                Log In
              </button>
            </form>
          ) : (
            <form onSubmit={submitSignup} className="mt-7 space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                {signupFields.map((field) => (
                  <TextInput
                    key={field.name}
                    field={field}
                    value={signupValues[field.name]}
                    onChange={updateSignup}
                    error={errors[field.name]}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="btn-primary-glow w-full rounded-full px-6 py-3 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default Account;
