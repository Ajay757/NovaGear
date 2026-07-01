import { useState } from "react";

const priceRanges = [
  { value: "all", label: "All prices" },
  { value: "under100", label: "Under $100" },
  { value: "100to199", label: "$100 - $199" },
  { value: "200plus", label: "$200+" },
];

const ratingOptions = [
  { value: "0", label: "Any rating" },
  { value: "4.0", label: "4.0+" },
  { value: "4.5", label: "4.5+" },
  { value: "4.8", label: "4.8+" },
];

function CollapsibleFilterSection({ title, children }) {
  const sectionId = `${title.toLowerCase().replaceAll(" ", "-")}-section`;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="border-t border-zinc-200 pt-4">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls={sectionId}
        className="flex w-full items-center justify-between gap-4 rounded-2xl px-2 py-2 text-left text-sm font-black uppercase tracking-wide text-zinc-950 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        <span>{title}</span>
        <span aria-hidden="true" className="text-base leading-none text-zinc-500">
          {isOpen ? "↑" : "↓"}
        </span>
      </button>
      <div
        id={sectionId}
        hidden={!isOpen}
        className="mt-3"
      >
        {children}
      </div>
    </section>
  );
}

function CheckboxGroup({ title, options, selected, onChange }) {
  const groupId = `${title.toLowerCase().replaceAll(" ", "-")}-filters`;

  return (
    <CollapsibleFilterSection title={title}>
      <fieldset>
        <legend id={groupId} className="sr-only">
          {title}
        </legend>
        <div className="space-y-2">
          {options.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onChange(option)}
                aria-describedby={groupId}
                className="h-4 w-4 accent-violet-600"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
    </CollapsibleFilterSection>
  );
}

function SelectField({ label, value, onChange, options }) {
  const selectId = `${label.toLowerCase().replaceAll(" ", "-")}-select`;

  return (
    <CollapsibleFilterSection title={label}>
      <label htmlFor={selectId} className="sr-only">
        {label}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-950 outline-none focus:border-violet-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </CollapsibleFilterSection>
  );
}

function FilterSidebar({
  filters,
  options,
  onToggleFilter,
  onSetFilter,
  onClearFilters,
}) {
  return (
    <aside
      aria-labelledby="filter-heading"
      className="catalog-scroll rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-violet-700">Filter</p>
          <h2 id="filter-heading" className="mt-1 text-2xl font-black text-zinc-950">
            Shop Gear
          </h2>
        </div>
        <button
          type="button"
          onClick={onClearFilters}
          aria-label="Clear all product filters"
          className="btn-secondary-polish rounded-full border px-4 py-2 text-xs font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          Clear
        </button>
      </div>

      <div className="space-y-4">
        <CheckboxGroup
          title="Category"
          options={options.categories}
          selected={filters.categories}
          onChange={(value) => onToggleFilter("categories", value)}
        />
        <CheckboxGroup
          title="Brand"
          options={options.brands}
          selected={filters.brands}
          onChange={(value) => onToggleFilter("brands", value)}
        />
        <SelectField
          label="Price Range"
          value={filters.priceRange}
          onChange={(value) => onSetFilter("priceRange", value)}
          options={priceRanges}
        />
        <CheckboxGroup
          title="Connection"
          options={options.connections}
          selected={filters.connections}
          onChange={(value) => onToggleFilter("connections", value)}
        />
        <SelectField
          label="RGB"
          value={filters.rgb}
          onChange={(value) => onSetFilter("rgb", value)}
          options={[
            { value: "all", label: "All lighting" },
            { value: "yes", label: "RGB only" },
            { value: "no", label: "No RGB" },
          ]}
        />
        <SelectField
          label="Rating"
          value={filters.rating}
          onChange={(value) => onSetFilter("rating", value)}
          options={ratingOptions}
        />
      </div>
    </aside>
  );
}

export default FilterSidebar;
