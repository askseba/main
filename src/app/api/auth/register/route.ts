import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

/**
 * POST /api/auth/register
 * Register a new user
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input structure
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'البيانات المطلوبة: البريد الإلكتروني وكلمة المرور' },
        { status: 400 }
      )
    }

    const { email, password, name } = body as {
      email?: string
      password?: string
      name?: string
    }

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'البيانات المطلوبة: البريد الإلكتروني وكلمة المرور' },
        { status: 400 }
      )
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'البريد الإلكتروني غير صحيح' },
        { status: 400 }
      )
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'البريد الإلكتروني مستخدم بالفعل' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name || null,
        role: 'user',
        statsVerified: false
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        bio: true,
        role: true,
        statsVerified: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'تم إنشاء الحساب بنجاح',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        bio: user.bio,
        role: user.role,
        statsVerified: user.statsVerified
      }
    }, { status: 201 })

  } catch (error) {
    console.error('[Register API] Error:', error)
    
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.' },
      { status: 500 }
    )
  }
}
