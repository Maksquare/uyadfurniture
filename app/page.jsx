import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
export default function Home() {
  return (
    <>
      <Navbar />
      {/* pt-24 gives standard spacing beneath our fixed header layout */}
      <main className="min-h-screen pt-24 md:pt-28">
        <Hero />
        <Collection />
        <About />
      </main>
      <Footer />
    </>
  );
}
