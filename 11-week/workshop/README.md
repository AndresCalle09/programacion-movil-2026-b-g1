
# Week 11 - Attendance Control UX/UI Workshop

## Project overview

Attendance Control is a project designed to manage student attendance through QR codes.

The system considers two main roles: students and professors. Its main features include course management, class sessions, QR-based attendance registration, and attendance history.

This workshop focuses on improving the mobile experience for students when reviewing attendance records and interacting with class information.

## Configuration

<!-- CONFIG-START -->
- FULL_NAME: Andres Felipe Calle Gonzalez
- GITHUB_USER: AndresCalle09
- TEAM: G1
- DOCS_REPO: Team documentation repository not publicly confirmed. CORHUILA organization: https://github.com/code-corhuila
- CODE_REPO: Attendance Control backend available as a local ZIP; public repository URL not confirmed.
- BASELINE: Official Ionic React starter - https://github.com/code-corhuila/programacion-movil-2026-b-starter-react - Reference commit: eb86696b1b80402585555f30ba8984ebcb553643
- REFLECTION_DOC: https://docs.google.com/document/d/1evnGlEGZOElcaVD8F-w5a0uNEZgoN-iKEcGx7XMxS48/edit?usp=sharing
- MY_SCREENS: Attendance History, Class Detail, QR Scan
<!-- CONFIG-END -->

## Baseline

The team currently has a Spring Boot backend for QR attendance management, but no available Ionic React frontend.

The official Ionic React starter from CORHUILA is used as the initial baseline.

The starter contains a product catalog example, which is not part of Attendance Control.

The workshop will progressively adapt the frontend to attendance-related screens.

## Project repositories

### Personal fork

https://github.com/AndresCalle09/programacion-movil-2026-b-g1

### Workshop folder

https://github.com/AndresCalle09/programacion-movil-2026-b-g1/tree/main/11-week/workshop

### Official Ionic React starter

https://github.com/code-corhuila/programacion-movil-2026-b-starter-react

### CORHUILA organization

https://github.com/code-corhuila

The specific team documentation repository has not been publicly verified.

### Attendance Control backend

The backend is currently available as a local ZIP containing the Spring Boot project.

## Selected screens

### Attendance History

This screen will allow students to review their attendance records and identify the status of each registered class.

### Class Detail

This screen will present class information and related attendance details.

### QR Scan

This screen will support QR attendance registration and display feedback about the registration result.

These screens are planned for the workshop and are not yet implemented in the original starter.

## UX/UI objectives

The main improvements planned for the application are:

- Clear and consistent navigation.
- Visual hierarchy for important information.
- Consistent colors, typography, and spacing.
- Loading, empty, data, and error states.
- Retry and refresh functionality.
- Accessible buttons and descriptive labels.
- Responsive layouts for mobile devices.
- Automated testing of interface behavior.

## Technologies

- Ionic React
- React
- TypeScript
- Vite
- Vitest

## Workshop checkpoints

### CP0 - Preparation and baseline

The official Ionic React starter is used as the initial application because the team does not currently have an available mobile frontend.

### CP1 - UX audit

Review the selected screens and document usability findings, navigation problems, and proposed improvements.

### CP2 - Navigation and design tokens

Implement a consistent navigation pattern and define reusable visual tokens.

### CP3 - List states and automated testing

Implement loading, data, empty, and error states with retry and refresh functionality.

### CP4 - Accessibility and responsive design

Review accessibility and test the interface at different screen sizes.

## Implementation notes

The baseline must remain available for comparison with later changes.

Each checkpoint will be committed and published separately.

All implemented improvements must be tested before being considered complete.

The personal reflection document is maintained separately in Google Docs.

