const { app } = require('@azure/functions');
const fs = require('fs-extra');
const path = require('path');

app.http('ContactFormFunction', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('Contact form submitted');

        try {
            const body = await request.json();
            const { name, email, message } = body;

            // Validasi input
            if (!name || !email || !message) {
                return {
                    status: 400,
                    body: { success: false, error: 'All fields are required' }
                };
            }

            // 📁 Lokasi file log JSON
            const logDir = path.join(__dirname, '../../logs');
            const logFile = path.join(logDir, 'contact_logs.json');

            // Pastikan foldernya ada
            await fs.ensureDir(logDir);

            // Ambil data lama (kalau ada)
            let logs = [];
            if (await fs.pathExists(logFile)) {
                const oldData = await fs.readFile(logFile, 'utf8');
                logs = oldData ? JSON.parse(oldData) : [];
            }

            // Tambahkan log baru
            const newLog = {
                timestamp: new Date().toISOString(),
                name,
                email,
                message
            };
            logs.push(newLog);

            // Simpan lagi ke JSON
            await fs.writeJson(logFile, logs, { spaces: 2 });

            // ✅ Return ke frontend
            return {
                status: 200,
                body: { success: true, data: newLog }
            };
        } catch (error) {
            context.log.error('Error processing form:', error);
            return {
                status: 500,
                body: { success: false, error: 'Internal Server Error' }
            };
        }
    }
});
