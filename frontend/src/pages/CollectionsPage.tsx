import { useEffect, useMemo, useState } from "react";
import { useGlobalContext, Products } from "../../GlobalContext";
import { useSearchParams } from "react-router-dom";
import Container from "../Container";
import Title from "../components/Title";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

const categories = ["Men", "Women", "Kids"] as const;
const types = ["Topwear", "Bottomwear", "Winterwear"] as const;
type Filter = (typeof categories)[number] | (typeof types)[number];

const CollectionsPage = () => {
  const { products, loading, isSearchBarOpen, setIsSearchBarOpen } = useGlobalContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearch(query);
  }, [searchParams]);

  const toggleFilter = (filter: Filter) => {
    setActiveFilters((current) => current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]);
  };

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    let next = products.filter((product) => {
      const matchesSearch = !query || [product.name, product.category, product.subCategory].some((value) => value.toLowerCase().includes(query));
      const matchesFilters = !activeFilters.length || activeFilters.some((filter) => product.category === filter || product.subCategory === filter);
      return matchesSearch && matchesFilters;
    });

    next = [...next];
    if (sort === "price-asc") next.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") next.sort((a, b) => b.price - a.price);
    if (sort === "name") next.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "newest") next.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return next;
  }, [products, search, activeFilters, sort]);

  const clearFilters = () => {
    setActiveFilters([]);
    setSearch("");
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      next.delete("search");
      return next;
    });
  };

  const renderFilter = (filter: Filter) => (
    <button key={filter} type="button" onClick={() => toggleFilter(filter)} className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${activeFilters.includes(filter) ? "border-stone-950 bg-stone-950 text-white" : "border-stone-200 bg-white text-stone-600 hover:border-stone-400"}`}>
      {filter}
    </button>
  );

  return (
    <main className="pb-12">
      <Container>
        <section className="border-b border-stone-200 py-12">
          <Title text1="The" text2="collection" />
          <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <h1 className="prata-regular text-4xl tracking-[-0.025em] sm:text-5xl">Find your next favorite.</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-stone-500">Search the full Trendify edit or filter by category. Everything stays one click away.</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">{filteredProducts.length} pieces</div>
          </div>
        </section>

        <div className="sticky top-[76px] z-30 mt-6 rounded-[1.5rem] border border-stone-200 bg-[#f8f7f4]/95 p-4 backdrop-blur md:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-full border border-stone-200 bg-white px-4 py-2.5">
              <span className="text-stone-400">⌕</span>
              <input value={search} onChange={(e) => { setSearch(e.target.value); setSearchParams((current) => { const next = new URLSearchParams(current); if (e.target.value) next.set("search", e.target.value); else next.delete("search"); return next; }); }} placeholder="Search products, categories or styles" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-stone-400" />
              {search && <button type="button" onClick={() => setSearch("")} className="text-xs font-semibold uppercase tracking-[0.1em] text-stone-400 hover:text-stone-900">Clear</button>}
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-stone-200 bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] outline-none">
              <option value="featured">Sort: Featured</option>
              <option value="newest">Sort: Newest</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="name">Name</option>
            </select>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">Category</span>
            {categories.map(renderFilter)}
            <span className="mx-1 hidden h-5 w-px bg-stone-200 sm:block" />
            <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">Type</span>
            {types.map(renderFilter)}
            {(activeFilters.length > 0 || search) && <button type="button" onClick={clearFilters} className="ml-auto px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500 underline underline-offset-4">Reset</button>}
          </div>
        </div>

        {isSearchBarOpen && (
          <button type="button" className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-stone-500" onClick={() => setIsSearchBarOpen(false)}>Close global search</button>
        )}

        <section className="mt-10">
          {loading ? <LoadingSpinner /> : filteredProducts.length ? <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">{filteredProducts.map((product: Products) => <ProductCard key={product._id} product={product} />)}</div> : <div className="rounded-[1.5rem] border border-dashed border-stone-300 bg-white p-16 text-center"><p className="prata-regular text-2xl">Nothing matched that search.</p><p className="mt-2 text-sm text-stone-500">Try a broader term or reset the filters.</p><button type="button" onClick={clearFilters} className="mt-6 rounded-full bg-stone-950 px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white">Reset filters</button></div>}
        </section>
      </Container>
    </main>
  );
};

export default CollectionsPage;
