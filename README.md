# js-recruitment-assignment

The **js-recruitment-assignment** is a task for a job recruitment. The idea is to create a working solution for an application to reschedule an appointment within 4-5 hours

Live environment: https://reschedule-appointment.vercel.app/

## Next Steps

The application is just a prototype; therefore, a lot of improvements can be made, with the highest priorities being:

- **Architecture:** Although the main code architecture is done, better abstractions using TypeScript to create adapters for the API would be beneficial.
- **Design:** The design does not have a proper mobile layout and must be updated.
- **Design:** The design does not have proper loaders or skeletons pages
- **Business Logic:** Unavailable slots are not being displayed.
- **Testing:** Unit tests are only covering a small part of the application.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
