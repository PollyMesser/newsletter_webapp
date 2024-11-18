import React from 'react';
import { NewsletterData } from '../types';

interface Props {
  data: NewsletterData;
}

export default function NewsletterPreview({ data }: Props) {
  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr || typeof dateStr !== 'string') return '';
    
    // Try parsing as ISO date first (YYYY-MM-DD)
    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const [_, year, month, day] = match;
      return `${day}.${month}.${year}`;
    }

    // Try parsing as a date object
    try {
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      }
    } catch (error) {
      console.error('Error parsing date:', error);
    }

    return dateStr;
  };

  const formatTime = (timeStr: string | null | undefined) => {
    if (!timeStr || typeof timeStr !== 'string') return '';
    
    // Handle HH:mm or HH:mm:ss format
    const match = timeStr.match(/^(\d{2}):(\d{2})/);
    if (match) {
      const [_, hours, minutes] = match;
      return `${hours}:${minutes}`;
    }

    // Try parsing as a date object
    try {
      const date = new Date(`1970-01-01T${timeStr}`);
      if (!isNaN(date.getTime())) {
        return date.toLocaleTimeString('de-DE', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
      }
    } catch (error) {
      console.error('Error parsing time:', error);
    }

    return timeStr;
  };

  const formatText = (text: string | null | undefined) => {
    if (!text || typeof text !== 'string') return '';
    return text
      .replace(/\\n/g, '<br>')
      .replace(/\\/g, '')
      .replace(/\n/g, '<br>');
  };

  const generateHtml = () => {
    const template = `
      <!DOCTYPE html>
      <html lang='en'>
      <head>
          <meta charset='UTF-8'>
          <meta name='viewport' content='width=device-width, initial-scale=1.0'>
          <title>H2 Update ${formatDate(data.date)}</title>
          <style>
              body {
                  font-family: Verdana, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
              }
              .container {
                width: 100%;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: white;
              }
              .header, .footer {
                text-align: center;
                padding: 20px;
                background-color: #407fb7;
                color: white;
              }
              .content {
                padding: 20px;
              }
              .hello {
                line-height: 1.5;
              }
              .event-wrapper {
                display: flex;
                justify-content: center;
              }
              .event-card {
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 16px;
                margin: 20px 0;
                background-color: #c7ddf2;
                max-width: 600px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                width: 100%;
              }
              .event-title {
                font-weight: bold;
                font-size: 1.25em;
                margin-bottom: 1em;
              }
              .event-links {
                margin-top: 15px;
              }
              .event-links a {
                  display: inline-block;
                  padding: 10px 15px;
                  margin-right: 10px;
                  margin-bottom: 10px;
                  text-decoration: none;
                  font-size: 1em;
                  color: white;
                  border-radius: 5px;
              }
              .event-link, .event-register-link {
                display: inline-block;
                padding: 10px 15px;
                margin-right: 10px;
                text-decoration: none;
                font-size: 1em;
                color: white;
                border-radius: 5px;
                background-color: #407fb7;
              }
              .event-link:hover, .event-register-link:hover {
                opacity: 0.8;
              }
              @media only screen and (max-width: 600px) {
                  .event-links a {
                      display: block;
                      width: 90%;
                      margin-right: 0;
                  }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                <h1>Newsletter H2 Update – ${formatDate(data.date)}</h1>
              </div>

              <div class="content">
                <p class="hello">${formatText(data.greeting)},</p>
                <p class="hello">${formatText(data.introduction)}</p>

                ${data.events.map(event => `
                  <div class="event-wrapper">
                      <div class="event-card">
                          <div class="event-title">${formatText(event.title)}</div>
                          <p><strong>Wann:</strong> ${formatDate(event.date)}</p>
                          ${event.time ? `<p><strong>Uhrzeit:</strong> ${formatTime(event.time)} Uhr</p>` : ''}
                          <p><strong>Wo:</strong> ${formatText(event.location)}</p>
                          <p>${formatText(event.description)}</p>
                          ${(event.learnMoreUrl || event.registerUrl) ? `
                            <div class="event-links">
                              ${event.learnMoreUrl ? `
                                <a href="${event.learnMoreUrl}" target="_blank" class="event-link">Mehr erfahren</a>
                              ` : ''}
                              ${event.registerUrl ? `
                                <a href="${event.registerUrl}" target="_blank" class="event-register-link">Jetzt anmelden</a>
                              ` : ''}
                            </div>
                          ` : ''}
                      </div>
                  </div>
                `).join('')}
              </div>

              <div class="footer">
                <p>${formatText(data.closingMessage)}</p>
                <p>Falls Sie keine H2 Updates mehr erhalten möchten, melden Sie sich bitte per E-Mail ab.</p>
                <p>Sonnige Grüße,<br>${formatText(data.senderName)}</p>
              </div>
          </div>
      </body>
      </html>
    `;

    return template;
  };

  const downloadHtml = () => {
    const html = generateHtml();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-${formatDate(data.date)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Preview</h2>
        <button
          onClick={downloadHtml}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Download HTML
        </button>
      </div>
      <div className="border rounded-lg p-4">
        <div dangerouslySetInnerHTML={{ __html: generateHtml() }} />
      </div>
    </div>
  );
}