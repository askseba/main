import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { auth } from '@/auth';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'غير مصرّح' }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'لا توجد صورة' }, { status: 400 });
    }

    // التحقق من الشروط (مكرر للأمان)
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      return NextResponse.json({ 
        error: 'الصورة غير صالحة، يرجى اختيار JPG/PNG/WEBP' 
      }, { status: 400 });
    }

    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ 
        error: 'حجم الصورة كبير، الحد الأقصى 2MB' 
      }, { status: 400 });
    }

    // توليد اسم فريد مع fallback للامتداد
    const fileExtension = path.extname(file.name) || `.${file.type.split('/')[1]}`;
    const fileName = `avatar-${uuidv4()}-${Date.now()}${fileExtension}`;
    
    // رفع بـ Vercel Blob
    const { url } = await put(fileName, file, {
      access: 'public',
    });

    // Ensure url is a string
    const avatarUrl = typeof url === 'string' ? url : ''

    return NextResponse.json({ 
      success: true, 
      avatarUrl,
      message: 'تم رفع الصورة بنجاح!' 
    });

  } catch (error) {
    return NextResponse.json({ 
      error: 'حدث خطأ في الخادم، جرب مرة أخرى' 
    }, { status: 500 });
  }
}
