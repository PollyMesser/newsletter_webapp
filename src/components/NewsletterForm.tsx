import React from 'react';
import { CalendarDays, Mail, User, Plus } from 'lucide-react';
import { NewsletterData, Event } from '../types';
import ExcelImport from './ExcelImport';

interface Props {
  data: NewsletterData;
  onChange: (data: NewsletterData) => void;
}

export default function NewsletterForm({ data, onChange }: Props) {
  const addEvent = () => {
    const newEvent: Event = {
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      learnMoreUrl: '',
      registerUrl: '',
    };
    onChange({ ...data, events: [...data.events, newEvent] });
  };

  const updateEvent = (index: number, updatedEvent: Partial<Event>) => {
    const newEvents = [...data.events];
    newEvents[index] = { ...newEvents[index], ...updatedEvent };
    onChange({ ...data, events: newEvents });
  };

  const removeEvent = (index: number) => {
    const newEvents = data.events.filter((_, i) => i !== index);
    onChange({ ...data, events: newEvents });
  };

  const handleExcelImport = (importedEvents: Event[]) => {
    onChange({ ...data, events: [...data.events, ...importedEvents] });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Newsletter Details
        </h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Newsletter Date</label>
          <input
            type="date"
            value={data.date}
            onChange={(e) => onChange({ ...data, date: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Greeting</label>
          <input
            value={data.greeting}
            onChange={(e) => onChange({ ...data, greeting: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="e.g., Guten Tag"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Introduction</label>
          <textarea
            value={data.introduction}
            onChange={(e) => onChange({ ...data, introduction: e.target.value })}
            className="w-full px-3 py-2 border rounded-md h-24"
            placeholder="Enter newsletter introduction..."
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            Events
          </h2>
          <div className="flex gap-2">
            <ExcelImport onImport={handleExcelImport} />
            <button
              onClick={addEvent}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </button>
          </div>
        </div>

        {data.events.map((event, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Event {index + 1}</h3>
              <button
                onClick={() => removeEvent(index)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Event Title"
                value={event.title}
                onChange={(e) => updateEvent(index, { title: e.target.value })}
                className="px-3 py-2 border rounded-md"
              />
              <input
                type="date"
                value={event.date}
                onChange={(e) => updateEvent(index, { date: e.target.value })}
                className="px-3 py-2 border rounded-md"
              />
              <input
                type="time"
                value={event.time}
                onChange={(e) => updateEvent(index, { time: e.target.value })}
                className="px-3 py-2 border rounded-md"
              />
              <input
                placeholder="Location"
                value={event.location}
                onChange={(e) => updateEvent(index, { location: e.target.value })}
                className="px-3 py-2 border rounded-md"
              />
              <input
                placeholder="Learn More URL (optional)"
                value={event.learnMoreUrl}
                onChange={(e) => updateEvent(index, { learnMoreUrl: e.target.value })}
                className="px-3 py-2 border rounded-md"
              />
              <input
                placeholder="Register URL (optional)"
                value={event.registerUrl}
                onChange={(e) => updateEvent(index, { registerUrl: e.target.value })}
                className="px-3 py-2 border rounded-md"
              />
              <textarea
                placeholder="Event Description"
                value={event.description}
                onChange={(e) => updateEvent(index, { description: e.target.value })}
                className="px-3 py-2 border rounded-md col-span-2"
                rows={3}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <User className="w-5 h-5" />
          Footer Details
        </h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Closing Message</label>
          <textarea
            value={data.closingMessage}
            onChange={(e) => onChange({ ...data, closingMessage: e.target.value })}
            className="w-full px-3 py-2 border rounded-md h-24"
            placeholder="Enter closing message..."
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Sender Name</label>
          <input
            value={data.senderName}
            onChange={(e) => onChange({ ...data, senderName: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Your name"
          />
        </div>
      </div>
    </div>
  );
}