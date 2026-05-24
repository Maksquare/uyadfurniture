import Navbar from '@/components/Navbar';
import Collection from '@/components/Collection';
import Footer from '@/components/Footer';

export default function CollectionPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-12">
        <Collection />
      </main>
      <Footer />
    </>
  );
}