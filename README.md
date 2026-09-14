# MediTrace — SIH Prototype

A working demo of MediTrace: a centralized medical-history platform that lets
authorized doctors see a patient's history across hospitals, and lets patients
view their own records. Built for a live SIH presentation — no real backend,
auth, or database. All data lives in `localStorage`.

## Run it

```
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Demo accounts

**Doctor Portal**
- Doctor ID: `DR-4471`
- Password: `demo1234`
- Or click **Use Demo Doctor Account** on the login screen.

**Patient Portal**
- Patient ID: `MT-20481` (Aarav Mehta) — password `demo1234`
- Or click **Use Demo Patient**, or **Scan QR → Use Demo Patient** from the
  doctor dashboard's search bar.

Four more seeded patients to search for as a doctor: `MT-10932` (Priya Sharma),
`MT-31042` (Kabir Malhotra), `MT-40218` (Neha Kulkarni), `MT-52907` (Vikram Rathod).

## What's in the doctor portal

- **Overview** — connected-network status, animated metrics, recent patients,
  a patient-network visual, upcoming follow-ups, and a live activity feed
- **Patients** — search/filter, plus **+ New Patient** to register a new case
- A patient's profile page — quick health summary, the medical journey
  timeline (expandable, animated), connected providers, categorized reports,
  and any notes the patient has logged themselves
- **Appointments** — Today / Upcoming / Completed, derived from visit follow-ups
- **Analytics** — visits by year/severity/hospital, reports by category
- **Settings** — doctor profile, demo data reset, session/trust indicators

## What's in the patient portal

- **Dashboard** — health snapshot, current medications, personal activity feed
- **Medical Timeline** — the same connected history, read-only
- **Reports** — searchable, filterable by category, document-style preview
- **My Notes** — patients can log how they're feeling between visits (kept
  separate from the doctor-verified record on purpose)
- **Profile** — DOB, blood group, emergency contact, allergies, conditions

## Suggested demo flow

1. Landing → **Doctor Portal** → **Use Demo Doctor Account**
2. Overview → search `MT-20481` (or use **Scan QR**)
3. Open Aarav Mehta → expand a past visit on the timeline
4. Click **+ Add Visit**, fill in the sectioned form (try "Add another
   medication"), **Save Visit** → new entry animates into the timeline
5. Check **Appointments** and **Analytics** to show the rest of the product
6. Log out → **Patient Portal** → **Use Demo Patient**
7. Confirm the same visit shows up on the patient's timeline, read-only
8. Open **Reports**, filter by category, preview a document
9. Check **My Notes** to show the patient-side feature

Use **Reset demo data** (in the doctor Settings page) between rehearsal runs.

## Project structure

```
src/
  components/   reusable UI (Timeline, Modal, Sidebar, Avatar, charts, etc.)
  layouts/      DoctorLayout / PatientLayout (sidebar + routed pages)
  pages/        one file per screen
  context/      AuthContext, DataContext (patients/reports/notes/activity + localStorage), ToastContext
  data/         mockData.js — seed patients, visits, reports, activity log
  hooks/        useLocalStorage, useCountUp
  utils/        shared date/format helpers
```

To add another demo patient or hospital, edit `src/data/mockData.js` — the UI
reads entirely from that file plus whatever gets added at runtime.

## Notes on data realism

Avatars are illustrated placeholders (not real photos), generated per patient
ID with a graceful fallback to initials if there's no internet at the venue.
QR scanning, login, and document download/print are all simulated — there's
no real backend, encryption, or hospital integration behind this. It's built
to demonstrate the product experience, not to be production-ready — and the
app says so in a couple of places (Settings, Profile) rather than implying
otherwise.
