# Azure Portfolio (Mini Project for Learning)

This is a static portfolio project deployed on **Azure Static Web Apps**.

## Live Demo
[View Live Site](https://wonderful-meadow-00820a500.3.azurestaticapps.net)

## Project Overview
- Pure static website using HTML, CSS & JS (JS added for interactive contact form)
- Contact form handled via **Azure Functions** (Node.js runtime)
- Deployed via **Azure Static Web Apps** with GitHub Actions
- Workflow configured with `skip_app_build: true` to skip unnecessary build steps

## Folder Structure
portfolio/
├─ src/
│ ├─ functions/
│ │ └─ ContactFormFunction.js
│ ├─ index.html
│ ├─ styles.css
│ └─ script.js
├─ .github/
│ └─ workflows/
│ └─ azure-static-web-apps-*.yml
└─ local.settings.json

## Local Development
1. Clone repository:
   ```bash
   git clone https://github.com/newtonraphson14/azure-portfolio.git
   cd azure-portfolio

## Install dependencies:
- npm install
- npm install -g @azure/static-web-apps-cli

## Run locally:
- swa start

## Local settings file: local.settings.json

{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  }
}


## Deployment Process
- Push changes to the main branch
- GitHub Actions automatically deploys the updated site

## Contact Form
- Form posts to /api/ContactFormFunction
- Local testing available via Azure Functions Core Tools or SWA CLI
- Form captures name, email, and message
- Ready for integration with Azure Table Storage / Cosmos DB

## Sample Form Code (HTML)
<form id="contactForm">
  <input type="text" name="name" placeholder="Name" required>
  <input type="email" name="email" placeholder="Email" required>
  <textarea name="message" placeholder="Message" required></textarea>
  <button type="submit">Send</button>
</form>

<script>
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  const res = await fetch('/api/ContactFormFunction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(result.success ? 'Message sent!' : 'Error sending message');
});
</script>

## Key Takeaways
- app_location and output_location set to / (root folder)
- Placeholder page replaced with actual content after deployment
- Workflow ensures automatic redeployment on every commit

## Future Improvements
- Make the site fully responsive
- Optimize load time and assets
- Add SEO meta tags and favicon
- Enhance contact form functionality and store messages in Azure
- Include portfolio gallery or additional interactive components