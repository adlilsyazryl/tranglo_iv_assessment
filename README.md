# Tranglo IV Assessment
**1. Overview**

This project contains POM automated tests built using Playwright with TypeScript that includes:

- Web UI Automation from Swag Labs

- API Automation from JSONPlaceholder for /posts

**2. Pre-requisites**

Make sure to install:

- Node.js (latest version)
	
- npm
	
- Git (for cloning)


**3. Project Setup**

A) Clone the repository:

	git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
	cd YOUR-REPO

B) Install Dependencies:

	npm install

C) Install Playwright:

	npx playwright install

D) How to run test:

i. Run all tests

	npm test

ii. Run Web UI test only

	npx playwright test tests/webui.spec.ts

iii. Run API test only

	npx playwright test tests/api.spec.ts

iv. Test Report

	npm run report


