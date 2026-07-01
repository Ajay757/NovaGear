import { useState } from "react";
import { Link } from "react-router-dom";

const recommendationOptions = ["Yes", "Maybe", "No"];

function Survey() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    rating: 0,
    recommend: "Yes",
    favorite: "",
    improvements: "",
    comments: "",
  });

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="rounded-[2rem] bg-white p-10 text-center shadow-sm lg:p-14">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-4xl font-black text-white">
          ✓
        </div>
        <p className="mt-6 text-sm font-black uppercase tracking-wide text-violet-700">
          Feedback received
        </p>
        <h1 className="mt-3 text-5xl font-black tracking-tight text-zinc-950">
          Thanks for helping NovaGear improve.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
          Your notes help us make the next upgrade feel smoother, clearer, and
          more useful.
        </p>
        <Link
          to="/"
          className="btn-primary-glow mt-8 inline-flex rounded-full px-7 py-4 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          Return Home
        </Link>
      </section>
    );
  }

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10 lg:p-12">
        <p className="text-sm font-black uppercase tracking-wide text-violet-700">
          We'd love your feedback.
        </p>
        <h1 className="mt-3 text-5xl font-black tracking-tight text-zinc-950">
          Help us improve your next upgrade.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
          This quick post-purchase survey helps NovaGear keep the shopping
          experience clear, fast, and gamer-focused.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 lg:p-9"
      >
        <fieldset>
          <legend id="rating-legend" className="text-2xl font-black text-zinc-950">
            Overall rating
          </legend>
          <p className="mt-2 text-sm text-zinc-600">
            Choose one to five stars. This helps us understand the overall
            experience at a glance.
          </p>
          <div
            role="radiogroup"
            aria-labelledby="rating-legend"
            className="mt-5 flex flex-wrap gap-3"
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => updateField("rating", rating)}
                role="radio"
                aria-checked={form.rating === rating}
                className={`h-14 w-14 rounded-2xl border text-2xl font-black transition hover:-translate-y-1 ${
                  form.rating >= rating
                    ? "border-zinc-950 bg-zinc-950 text-white"
                    : "border-zinc-200 bg-zinc-50 text-zinc-400 hover:border-violet-500 hover:text-violet-700"
                }`}
                aria-label={`${rating} star rating`}
              >
                ★
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-8 border-t border-zinc-200 pt-6">
          <legend className="text-2xl font-black text-zinc-950">
            Would you recommend NovaGear?
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {recommendationOptions.map((option) => (
              <label
                key={option}
                className={`cursor-pointer rounded-2xl border p-4 text-center font-black transition hover:-translate-y-1 ${
                  form.recommend === option
                    ? "border-zinc-950 bg-zinc-950 text-white"
                    : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-violet-500"
                }`}
              >
                <input
                  type="radio"
                  name="recommend"
                  value={option}
                  checked={form.recommend === option}
                  onChange={(event) =>
                    updateField("recommend", event.target.value)
                  }
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-8 grid gap-5">
          <label className="block">
            <span
              id="favorite-label"
              className="mb-2 block text-sm font-black text-zinc-800"
            >
              Favorite part of the experience
            </span>
            <input
              aria-labelledby="favorite-label"
              type="text"
              value={form.favorite}
              onChange={(event) => updateField("favorite", event.target.value)}
              placeholder="Example: product filters, checkout clarity, clean design"
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-violet-500"
            />
          </label>

          <label className="block">
            <span
              id="improvements-label"
              className="mb-2 block text-sm font-black text-zinc-800"
            >
              Suggestions for improvement
            </span>
            <textarea
              aria-labelledby="improvements-label"
              value={form.improvements}
              onChange={(event) =>
                updateField("improvements", event.target.value)
              }
              rows="4"
              placeholder="Tell us what would make NovaGear easier or more useful."
              className="w-full resize-y rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-violet-500"
            />
          </label>

          <label className="block">
            <span
              id="comments-label"
              className="mb-2 block text-sm font-black text-zinc-800"
            >
              Optional comments
            </span>
            <textarea
              aria-labelledby="comments-label"
              value={form.comments}
              onChange={(event) => updateField("comments", event.target.value)}
              rows="3"
              placeholder="Anything else you want the NovaGear team to know?"
              className="w-full resize-y rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-violet-500"
            />
          </label>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-600">
            Welcoming feedback only. No account or personal data required.
          </p>
          <button
            type="submit"
            className="btn-primary-glow rounded-full px-6 py-3 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
}

export default Survey;
