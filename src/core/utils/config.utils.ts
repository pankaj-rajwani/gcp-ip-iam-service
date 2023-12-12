import dotenv from 'dotenv';

dotenv.config();

export const config = {
  idpConnectionConfig: {
    projectId: process.env.GCP_PROJECT_ID || '',
    privateKey: process.env.GCP_PRIVATE_KEY || '',
    clientEmail: process.env.GCP_CLIENT_EMAIL || '',
  },
};
