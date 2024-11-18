import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { read, utils } from 'xlsx';
import { Event } from '../types';

interface Props {
  onImport: (events: Event[]) => void;
}

export default function ExcelImport({ onImport }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = read(data, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet);

      const events: Event[] = jsonData.map((row: any) => {
        // Convert Excel date number to YYYY-MM-DD format if needed
        let date = row.start_date || '';
        if (typeof date === 'number') {
          const excelDate = new Date((date - 25569) * 86400 * 1000);
          date = excelDate.toISOString().split('T')[0];
        }

        // Convert Excel time number to HH:mm format if needed
        let time = row.start_time || '';
        if (typeof time === 'number') {
          const totalSeconds = time * 86400;
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        }

        return {
          title: row.summary || '',
          date,
          time,
          location: row.location || '',
          description: row.description || '',
          learnMoreUrl: '',
          registerUrl: '',
        };
      });

      onImport(events);
      if (fileRef.current) fileRef.current.value = '';
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={fileRef}
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        className="hidden"
      />
      <button
        onClick={() => fileRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <Upload className="w-4 h-4" />
        Import Excel
      </button>
    </div>
  );
}