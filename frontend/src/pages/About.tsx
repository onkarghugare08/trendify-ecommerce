import Container from "../Container";
import Title from "../components/Title";
import aboutImg from "../assets/about_img.png";

const About = () => (
  <main>
    <Container>
      <section className="py-12 text-center"><Title text1="About" text2="Trendify" /><h1 className="prata-regular mx-auto mt-5 max-w-3xl text-4xl leading-tight tracking-[-0.025em] sm:text-6xl">Fashion should feel personal, not complicated.</h1><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-stone-500 sm:text-base">Trendify brings together modern essentials and thoughtful details so getting dressed — and shopping — feels more intentional.</p></section>
      <section className="grid gap-10 pb-20 md:grid-cols-2 md:items-center"><div className="overflow-hidden rounded-[2rem] bg-stone-100"><img src={aboutImg} alt="About Trendify" className="h-full w-full object-cover" /></div><div className="max-w-xl"><p className="eyebrow">Our point of view</p><h2 className="prata-regular mt-4 text-3xl sm:text-4xl">A sharper edit. A smoother experience.</h2><div className="mt-6 space-y-5 text-sm leading-7 text-stone-500"><p>We started Trendify with a simple idea: great style should be easy to discover. Our collections are curated around wearable silhouettes, quality materials and pieces that earn their place in your rotation.</p><p>From browsing to delivery, we aim to keep the experience clear, useful and human. Less clutter. Better choices. More confidence in what you bring home.</p></div></div></section>
      <section className="grid gap-4 pb-20 md:grid-cols-3">{[["Quality first","We select products with attention to feel, finish and everyday value."],["Easy by design","Simple navigation, clear product information and a calm checkout flow."],["Here when needed","Friendly support when you need an answer — without the runaround."]].map(([title, copy]) => <div key={title} className="rounded-[1.5rem] border border-stone-200 bg-white p-7"><p className="eyebrow">0{["Quality first","Easy by design","Here when needed"].indexOf(title)+1}</p><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-500">{copy}</p></div>)}</section>
    </Container>
  </main>
);

export default About;
