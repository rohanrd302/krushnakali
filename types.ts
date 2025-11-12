export type DonationStatus = 'Successful' | 'Pending' | 'Failed';

export interface DonationFormData {
  id: string;
  amount: number | string;
  fullName: string;
  email: string;
  mobile: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  status: DonationStatus;
  date: string; // ISO string
  paymentId?: string;
}

export interface DevoteeFormData {
  id: string;
  name: string;
  email:string;
  mobile: string;
  birthDate: string;
  registrationDate: string; // ISO string
}

export interface ServiceCardData {
  title: string;
  description: string;
  icon: string;
}

export interface ContactInfoData {
  address: string;
  email: string;
  phone: string;
}

export interface LandingPageData {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText1: string;
  ctaLink1: string;
  ctaText2: string;
  ctaLink2: string;
}

export interface TempleSettings {
  logoUrl: string;
  landingPages: LandingPageData[];
  contactInfo: ContactInfoData;
  serviceCards: ServiceCardData[];
}