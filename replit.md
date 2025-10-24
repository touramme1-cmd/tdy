# BENO Consulting - Gulf Jobs Portal

## Overview
The BENO Consulting Gulf Jobs Portal is a professional, trilingual (Arabic RTL/English/French) job portal designed to connect skilled professionals from North Africa (Tunisia, Morocco, Algeria) with career opportunities in Gulf countries (Saudi Arabia, UAE, Qatar). The project aims to streamline the job search and application process, providing a robust platform for both job seekers and employers. Key capabilities include advanced job search and filtering, dual application methods (native form + WhatsApp), employer job submissions, and job alerts.

## User Preferences
- Language preference stored in localStorage (en/fr/ar)
- Language selection popup shown on first visit only
- Theme preference stored in localStorage
- Both persist across sessions
- Apply automatically on page load
- Language toggle cycles: EN → FR → AR → EN

## System Architecture
The portal utilizes a modern web stack:
-   **Frontend**: React with TypeScript, Wouter for routing, Tailwind CSS for styling, Shadcn UI with Radix UI primitives for components, and TanStack Query (React Query v5) for state management.
-   **Backend**: Express.js with TypeScript.
-   **Database**: PostgreSQL (Neon) managed with Drizzle ORM.
-   **Internationalization**: Custom i18n context with full RTL support for Arabic, English, and French, including a language selection popup on first visit and a header toggle.
-   **UI/UX Decisions**:
    -   **Colors**: Primary (Cyan-700: `#0E7490`), Accent (Amber-500: `#EAB308`), Success (`#16A34A`), with light (`#FFFFFF`) and dark (`#0F172A`) background modes.
    -   **Typography**: Inter for Latin text and Noto Sans Arabic for Arabic text, both with weights 400, 500, 600, 700.
    -   **RTL Support**: HTML `dir` attribute dynamically set, layouts mirrored, icons (arrows, chevrons) auto-flip, and text alignment adjusts for Arabic.
    -   **Branding**: Integration of the BENO Consulting logo and a consistent visual identity across the platform.
-   **Key Features**:
    -   **Core Functionality**: Trilingual support (Arabic RTL/English/French), advanced job search and filtering, WhatsApp integration for direct communication and applications, employer job submission forms, and job alerts via email/WhatsApp.
    -   **Pages**: Home, Jobs Listing, Job Detail, Contact, Hire with Us, Coming Soon (Job Alerts), About, and FAQ.
    -   **Database Schema**: Includes tables for `employers`, `jobs`, `applications`, `contact_submissions`, `employer_submissions`, and `job_alerts`, with defined relationships.
    -   **WhatsApp Integration**: Floating WhatsApp button, click-to-chat with pre-filled messages in the selected language, dynamic link formatting (`https://wa.me/{phone}?text={encodedMessage}`), and UTM tracking.
    -   **CV Upload**: Integration with Replit Object Storage for secure CV file uploads, using presigned URLs for direct browser-to-storage uploads. CVs are stored in a private directory with UUID-based naming.
    -   **Google Sheets Integration**: Contact form submissions, including CV links, are automatically sent to a Google Sheets webhook.

## External Dependencies
-   **Database**: Neon (for PostgreSQL hosting)
-   **ORM**: Drizzle ORM
-   **UI Library**: Shadcn UI (built on Radix UI primitives)
-   **State Management**: TanStack Query (React Query v5)
-   **Styling**: Tailwind CSS
-   **Object Storage**: Replit Object Storage (for CV uploads)
-   **Communication**: WhatsApp API (via `wa.me` links)
-   **Analytics/CRM**: Google Sheets (for contact form submissions via webhook)