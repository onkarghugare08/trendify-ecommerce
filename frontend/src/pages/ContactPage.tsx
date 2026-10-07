import Container from "../Container";
import Button from "../components/Button";
import contactImg from "../assets/contact_img.png";

const ContactPage = () => (
  <main>
    <Container>
      <section className="grid gap-10 py-12 md:grid-cols-2 md:items-center"><div><p className="eyebrow">Contact Trendify</p><h1 className="prata-regular mt-4 text-5xl tracking-[-0.03em] sm:text-6xl">Let's talk.</h1><p className="mt-5 max-w-xl text-sm leading-7 text-stone-500">Have a question about an order, a product or working with us? Reach out and our team will point you in the right direction.</p><div className="mt-8 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200"><p className="eyebrow">Store</p><p className="mt-3 text-sm leading-6 text-stone-600">Trendify 354 Fashion Lane<br />Los Angeles, SC 45678, USA</p></div><div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200"><p className="eyebrow">Support</p><p className="mt-3 text-sm leading-6 text-stone-600">+11-558-669-447<br />contact.trendify@info.com</p></div></div><Button size="large" className="mt-6">Explore opportunities</Button></div><div className="overflow-hidden rounded-[2rem] bg-stone-100"><img src={contactImg} alt="Trendify contact" className="aspect-square w-full object-cover" /></div></section>
    </Container>
  </main>
);

export default ContactPage;
