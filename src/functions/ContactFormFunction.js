const { app } = require('@azure/functions');  // HARUS ADA


app.http('ContactFormFunction', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('Contact form submitted');

        const body = await request.json(); // ambil POST body sebagai JSON
        const name = body.name;
        const email = body.email;
        const message = body.message;

        // TODO: simpan ke Azure Table Storage / Cosmos DB

        return {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: true, data: { name, email, message } })
};

    }
});
