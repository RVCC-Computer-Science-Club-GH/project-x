**Created:** 3/5/2026  
**Last Updated:** 4/9/2026

# Pathster

## Table of Contents

- [Overview](#overview)
- [Project Description](#project-description)
- [The Pitch](#the-pitch)
- [Goals & Objectives](#goals--objectives)
- [Market Research](#market-research)
- [Personas](#personas)
- [Research Questions](#research-questions)
- [Scope & Out-of-Scope](#scope--out-of-scope)
- [Influences](#influences)
- [Key Features & User Journeys](#key-features--user-journeys)
- [Stretch Goals](#stretch-goals)
- [High-Level System Architecture](#high-level-system-architecture)
- [Assumptions & Constraints](#assumptions--constraints)
- [Risks & Mitigations](#risks--mitigations)
- [Appendix](#appendix-glossary-references-meeting-notes)
- [Glossary](#glossary)
- [References](#references)
- [Revision History](#revision-history)

## Overview

## Project Description

Develop "X" mobile app (iOS + Android) + progressive web app for RVCC campus community using React Native + Expo. Integrate digital radio broadcast in partnership with Radio Club.

**Core Features:**

* Live digital radio streaming
* GPS-powered interactive campus map
* Citizen science data collection (pins, photos, AR via Expo modules)

Data collection via citizen science: users submit AR scans, sensor tags, or crowd-sourced pins, incentivized with gift cards, meals, and competitions.

Cross-platform development with React Native + Expo for efficient deployment to app stores and as a PWA. Prototype and proposal prepared for Student Life board presentation. Coordinate with Kiswah Khan for implementation support and promotion at orientations to maximize adoption. Prioritize GPS mapping rollout, followed by radio integration.

## The Pitch

"X" is RVCC's all-in-one campus app: dead-accurate GPS map to every classroom plus live Radio Club streaming, right on your phone or browser.

Students build the map themselves with quick AR scans and pins, gift cards, or free meals while competing for prizes.

Built with React Native + Expo, cross-platform, and fast to launch. Backed by Student Life and ready for board approval.

One app. Find your class. Hear campus live. "X" guides RVCC.

## Goals & Objectives

**Primary Goal:** Deliver "X," a unified RVCC mobile/web app that improves daily campus navigation and fosters community connection through live digital radio.

**Key Objectives**

* Provide accurate, real-time GPS-powered interactive map showing all classrooms, buildings, and key locations.
* Enable seamless live streaming of Radio Club broadcasts accessible on Android, iOS, and any web browser.
* Build and maintain campus map data through engaging citizen science (AR scans, location pins, sensor tags) with meaningful incentives (academic credits, gift cards, meals, competitions).
* Achieve high user adoption via promotion at new student orientations and ongoing campus engagement.
* Present functional prototype and clear proposal to Student Life board for approval and integration into RV Connect ecosystem.
* Ensure efficient, maintainable development using React Native + Expo.
* Prioritize phased rollout: GPS mapping first, digital radio second.

## Market Research

| Audience | Feature Priorities | Personas |
| --- | --- | --- |
| RVCC Students | Navigation, radio streaming, rewards | Active Student, Inactive Student, Alumni |
| RVCC Staff | Communication, engagement analytics | Professors, Student Life |

### Personas

#### Professor

Dr. Jane Doe, 45, full-time faculty in Biology, teaches multiple classes across campus buildings. Uses a smartphone for scheduling but relies on paper maps for navigation.

**Needs:** Quick access to classroom locations, real-time updates on campus events via radio, tools to share announcements with students.

**Conflicts:** Limited time for app learning; privacy concerns with location sharing.

**Design Choices:** Simple interface with voice search; integration with calendar apps; optional notifications.

#### Student Life

Steph Doe, 35, Student Life Coordinator, manages events and orientations, interacts with 100+ students weekly.

**Needs:** Tools to promote events via radio and map pins; analytics on user engagement; easy incentive distribution.

**Conflicts:** Budget constraints for rewards; ensuring app compliance with college policies.

**Design Choices:** Admin dashboard for moderation; gamified leaderboards; secure data handling.

#### Active Student

Jordan Lee, 20, sophomore in Engineering, involved in clubs, attends classes daily, uses public transport.

**Needs:** Accurate navigation to avoid being late; live radio for downtime; ways to earn rewards through contributions.

**Conflicts:** Data usage limits; competing apps on phone.

**Design Choices:** Low-data mode, lightweight app footprint, quick actions for frequent routes.

#### Alumni

Alex Patel, 28, a recent graduate, visits campus for events and mentors current students remotely.

**Needs:** Updated map for occasional visits; radio access for nostalgia; contribution options without on-campus presence.

**Conflicts:** Infrequent use; forgetting app features.

**Design Choices:** Guest mode; email reminders; simple remote pinning.

### Research Questions

**Why create this application?**

It is a prevalent issue that incoming students struggle with the layout and current map of RVCC. Implementation of a radio can not only act as a news update and commuting update for students new and seasoned; radio can also bring forth many voices and community through segments both musical and talk focused.

**What is the focus?**

The focus is to bring students together and make both the incoming and seasoned students more connected. Using a more innovative map system to provide less stress during on-campus commuting. Providing students with a greater sense of community through a digital radio broadcast.

**What is the difference?**

Unlike competitors (e.g., Mappedin for navigation and Guidebook for events), "X" uniquely integrates radio and incentives for RVCC.

**What pain points exist in campus navigation and radio access?**

Large campuses cause confusion; indoor navigation lacks; radio limited to FM without mobile streaming.

**What similar apps or tools are competitors (e.g., campus apps at other colleges)?**

Mappedin (multi-building navigation), Pladia (landmark directions), Guidebook (event maps), Canvas (learning integration).

**What is the potential user base size at RVCC?**

~7,000 students (Fall 2024 headcount: 6,762; annual: 9,716), plus 500+ staff/alumni.

**Which features (GPS mapping, digital radio) are most desired?**

GPS mapping (top priority for 80% users), followed by radio streaming.

**What incentives drive user participation in citizen science?**

Gamification (badges, leaderboards), non-financial (learning, social), financial (gift cards, meals).

**How likely are users to download and engage?**

High with orientation promotion; 70% adoption potential if barriers are addressed. Incoming students are most likely to find the app especially effective, while seasoned students can use it to navigate areas that are new to them.

**What feedback on prototype concepts from potential users?**

Positive on simplicity; suggestions for offline support and privacy.

**What barriers to adoption exist (e.g., tech access, privacy concerns)?**

Complex interfaces, data privacy, lack of personalization, and affordability concerns.

## Scope & Out-of-Scope

**In-Scope:** Core features (map, radio, citizen science); React Native + Expo development; prototype for board; phased rollout; basic incentives.

**Out-of-Scope:** FM radio integration; advanced AR without plugins; full RV Connect API; paid marketing; hardware sensors.

## Influences

**Saturn** – Calendar for High School and College: Supports block schedules, event sharing; inspires onboarding flow.

**Mappedin** – Multi-building navigation; informs indoor mapping.

**Guidebook** – Event resources and maps; guides incentive dashboards.

**Pladia** – Landmark-based directions; enhances accessibility.

## Key Features & User Journeys

### Key Features

1. Interactive GPS Campus Map
   1. Real-time location of classrooms, buildings, offices, parking, restrooms
   2. Search by room number/name
   3. Offline caching support
2. Live Digital Radio Streaming
   1. Radio Club broadcasts streamed live
   2. Play/pause, volume, background play
   3. Schedule view of upcoming shows
3. Citizen Science Map Contribution
   1. Submit location pins via GPS or AR scan
   2. Tag rooms/buildings with photos/notes
   3. Competitions and leaderboards
4. Incentives & Rewards Dashboard
   1. Track earned credits, gift cards, meals
   2. View personal contributions and rankings
5. Orientation & Onboarding Flow
   1. Quick tutorial + prompt to contribute map data
   2. Easy download/install links

### Primary User Journeys

1. New Student – First Day Navigation
   1. Open app → Grant location permission → Search classroom → Follow guided route → Discover radio stream
2. Student Contributor – Add Map Data
   1. Tap “Contribute” → Choose AR scan or manual pin → Scan/tag room → Submit → See reward credited
3. Radio Listener – Tune In
   1. Open app → Tap Radio tab → Play live stream → Continue in background while navigating
4. Orientation Attendee
   1. Scan QR at event → Install/open Pathster → Guided onboarding → Prompted to pin first location for bonus reward
5. Returning User – Daily Use
   1. Open app → See personalized map shortcuts + live radio notification → Navigate + listen simultaneously

### Stretch Goals

* AI chatbot for queries.
* Event calendar integration.
* Social sharing of contributions.
* Analytics for admin insights.
* Technical support with ticket creation.
* Password generator for students.

## High-Level System Architecture

**Frontend:** React Native (Expo) for iOS, Android, and web (via React Native Web)

**Authentication**: Microsoft Entra ID (MSAL) → JWT passed to backend

**Backend**: Node.js + TypeScript

* **Database**: MongoDB (map data, user contributions, profiles, rewards)
* **Cache / real-time:** Redis (leaderboards, session data, pub/sub for notifications)
* **API:** Express / NestJS
* **Maps**: react-native-maps
* **Audio**: expo-av
* **Streaming:** Backend proxies Radio Club stream or uses direct WebSocket / HTTP stream

## Assumptions & Constraints

### Assumptions

* Student Life (Kiswah Khan) will provide necessary approvals and ongoing support.
* Radio Club exists and is willing to collaborate as stakeholder for content.
* RVCC provides access to basic campus location data or allows crowd-sourced collection.
* Students have smartphones with GPS, camera, and internet access.
* Expo web/PWA will meet accessibility needs for browser users.
* Incentives (credits, gift cards, meals) can be coordinated and funded through Student Life or sponsors.
* Board will review and approve prototype within current semester.

### Constraints

* Limited team size and volunteer/student developers → prioritize MVP (map first).
* No dedicated budget for development or incentives initially.
* Must comply with RVCC IT/security policies and app store guidelines.
* No access to official campus API → rely on citizen science for map data.
* FCC/state regulations may delay or restrict future live FM frequency (digital-only for now).
* Development timeline tied to academic calendar and board meeting dates.
* Cross-platform limitations on advanced AR/WebAR.
* Expo managed workflow → restricted native code unless ejected.
* Self-hosted/cloud database management required.
* Must implement JWT verification, rate limiting, and input sanitization.
* Redis adds operational complexity (persistence, failover).
* Higher development effort for real-time features.

## Risks & Mitigations

**Risk 1:** Low user participation in citizen science map building **Mitigation:** Offer strong incentives (credits, gift cards, meals); run competitions with leaderboards; promote heavily at orientations; start with simple contribution methods (manual pins before AR).

**Risk 2:** Inaccurate or incomplete map data **Mitigation:** Implement moderation/review queue; cross-check submissions against known campus info; allow easy reporting/correction by users; seed initial data from Student Life if available.

**Risk 3:** Technical delays or React Native/Expo limitations (e.g., AR, streaming quality) **Mitigation:** Prioritize MVP (basic map + simple audio); use proven packages (react-native-maps, expo-av); test early on target devices; have fallback web-only features.

**Risk 4:** Board rejection or delayed approval **Mitigation:** Prepare polished prototype + clear proposal early; involve Kiswah Khan for feedback; align with RV Connect goals; present multiple phased options.

**Risk 5:** Funding shortfall for incentives **Mitigation:** Start with low-cost rewards (academic credits, recognition); seek Student Life/sponsor support; tie to existing campus programs.

**Risk 6:** Privacy/security concerns (location data) **Mitigation:** Anonymize contributions where possible; require opt-in permissions; comply with RVCC IT policies; use secure storage and encryption; maintain a transparent privacy notice.

**Risk 7:** Radio Club disengagement or content gaps **Mitigation:** Establish clear collaboration agreement; provide easy streaming tools; schedule fallback content (recorded shows); promote club involvement for visibility.

**Risk 8:** Timeline slippage due to academic calendar **Mitigation:** Set strict milestones tied to board dates; work in short sprints; focus on core map feature first; use student volunteers flexibly.

**Risk 9:** Entra ID integration approval delay or scope restrictions **Mitigation:** Engage Kiswah Khan + RVCC IT early; prepare fallback anonymous/guest mode for map viewing and radio.

**Risk 10:** Increased backend maintenance burden **Mitigation:** Use managed MongoDB Atlas + Redis Cloud; keep API surface small.

**Risk 11:** Security misconfiguration in custom auth/backend **Mitigation:** Strict JWT validation, Helmet, CORS, input validation, and OWASP practices.

## Appendix (Glossary, References, Meeting Notes)

### Glossary

* **PWA**: Progressive Web App.
* **AR**: Augmented Reality.
* **MVP**: Minimum Viable Product.
* **GPS**: Global Positioning System.

### References

* **RVCC Enrollment Data:** raritanval.edu.
* **Competitors:** Mappedin.com, joinsaturn.com.
* **Incentives:** Nature.com articles on citizen science.

### Revision History

| Version | Date | Change |
| --- | --- | --- |
| 1.0 | 3/16/2026 | Initial draft |
| 1.1 | 3/25/2026 | Updated proposal details and architecture notes |
| 1.2 | 4/9/2026 | Final Markdown cleanup and editorial pass |