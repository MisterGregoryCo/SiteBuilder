import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const ALLOWED_TYPES = [
  'image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp',
  'application/pdf',
  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'File type not supported. Upload images, PDFs, or documents.' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum 10MB.' }, { status: 400 });
    }

    const supabase = createServiceRoleClient();

    // Generate unique filename
    const ext = file.name.split('.').pop() || 'bin';
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
    const storagePath = `site-assets/${timestamp}-${safeName}`;

    // Convert to buffer for upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('site-builder')
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      // If bucket doesn't exist, try to create it
      if (error.message?.includes('not found') || error.message?.includes('Bucket')) {
        // Create the bucket
        await supabase.storage.createBucket('site-builder', {
          public: true,
          fileSizeLimit: MAX_FILE_SIZE,
        });

        // Retry upload
        const { data: retryData, error: retryError } = await supabase.storage
          .from('site-builder')
          .upload(storagePath, buffer, {
            contentType: file.type,
            upsert: false,
          });

        if (retryError) {
          return NextResponse.json({ error: 'Upload failed: ' + retryError.message }, { status: 500 });
        }

        const { data: urlData } = supabase.storage.from('site-builder').getPublicUrl(retryData.path);

        return NextResponse.json({
          url: urlData.publicUrl,
          name: file.name,
          type: categorizeFile(file.type),
          size: file.size,
        });
      }

      return NextResponse.json({ error: 'Upload failed: ' + error.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage.from('site-builder').getPublicUrl(data.path);

    return NextResponse.json({
      url: urlData.publicUrl,
      name: file.name,
      type: categorizeFile(file.type),
      size: file.size,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

function categorizeFile(mimeType: string): 'logo' | 'photo' | 'document' | 'other' {
  if (mimeType.startsWith('image/svg') || mimeType.includes('svg')) return 'logo';
  if (mimeType.startsWith('image/')) return 'photo';
  if (mimeType.includes('pdf') || mimeType.includes('word') || mimeType.includes('document')) return 'document';
  return 'other';
}
