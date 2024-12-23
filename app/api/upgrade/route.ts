import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export default async function POST(request: Request) {
  const headers = request.headers;
  const recievedKey = headers.get('key');

  if (recievedKey !== process.env.UPGRADE_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, {status: 401 });
  }

  try {
    const projectDir = 'D:/case-club';

    console.log('Pulling latest changes...');
    await execPromise('git pull', { cwd: projectDir });

    console.log('Installing dependencies...');
    await execPromise('npm install', { cwd: projectDir });

    console.log('Building the app...');
    await execPromise('npm run build', { cwd: projectDir });

    console.log('Restarting PM2 process...');
    await execPromise('pm2 restart case-club', { cwd: projectDir });

    return NextResponse.json({ message: 'Upgrade successful!' });
  } catch (error: any) {
    console.error('Upgrade failed: ', error);
    return NextResponse.json({ error: 'Upgrade failed', details: error, }, { status: 500 })
  }
}