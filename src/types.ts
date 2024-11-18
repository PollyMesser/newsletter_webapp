export interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  learnMoreUrl: string;
  registerUrl: string;
}

export interface NewsletterData {
  date: string;
  greeting: string;
  introduction: string;
  events: Event[];
  closingMessage: string;
  senderName: string;
}