
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ActivityPreview from '@/components/raffle/ActivityPreview';

const ActivityPreviewPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow px-4 py-10">
        <ActivityPreview />
      </main>
      
      <Footer />
    </div>
  );
};

export default ActivityPreviewPage;
