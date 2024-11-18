import React, { useState } from 'react';
import { NewsletterData } from './types';
import NewsletterForm from './components/NewsletterForm';
import NewsletterPreview from './components/NewsletterPreview';

const initialData: NewsletterData = {
  date: new Date().toISOString().split('T')[0],
  greeting: 'Guten Tag',
  introduction: 'hier erhalten Sie eine Übersicht der wichtigsten Veranstaltungen zum Thema Wasserstoff den kommenden Wochen. Nutzen Sie die Gelegenheit, sich über neue Entwicklungen und spannende Projekte zu informieren. Wir freuen uns, Sie bei einer der Veranstaltungen zu sehen!',
  events: [],
  closingMessage: 'Wir freuen uns auf ein Wiedersehen bei einer der Veranstaltungen!',
  senderName: '',
};

function App() {
  const [data, setData] = useState<NewsletterData>(initialData);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Newsletter Generator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <NewsletterForm data={data} onChange={setData} />
          </div>
          
          <div className="space-y-6">
            <NewsletterPreview data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;