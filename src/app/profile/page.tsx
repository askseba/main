'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  MessageCircle, 
  ChevronLeft,
  LogOut,
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
// import { useRouter } from 'next/navigation'; // Removed - no longer needed after logout fix
import { useQuiz } from '@/contexts/QuizContext';
import { clearAllUserData } from '@/lib/clear-user-data';
import { safeFetch, validateObject } from '@/lib/utils/api-helpers';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

// Error Toast Component with cleanup
function ErrorToast({ error, onClose }: { error: string; onClose: () => void }) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear error after 4 seconds
    timeoutRef.current = setTimeout(() => {
      onClose();
    }, 4000);

    // Cleanup: clear timeout when component unmounts or error changes
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [error, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-2xl shadow-2xl z-50 max-w-sm text-center text-sm font-medium border border-red-400/50"
    >
      {error}
    </motion.div>
  );
}

export default function ProfilePage() {
  const { data: session, update } = useSession();
  // const router = useRouter(); // Removed - no longer needed after logout fix
  const { clearQuiz } = useQuiz();
  const { isOnline } = useNetworkStatus();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [optimisticBio, setOptimisticBio] = useState(session?.user?.bio || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // مزامنة الـ Bio عند تحميل الجلسة
  React.useEffect(() => {
    if (session?.user?.bio) setOptimisticBio(session.user.bio);
  }, [session?.user?.bio]);

  const menuItems = [
    { id: 'about', label: 'قصتنا (عن صبا)', icon: <Sparkles className="w-5 h-5 text-amber-500" />, href: '/about' },
    { id: 'faq', label: 'تساؤلات تهمك', icon: <HelpCircle className="w-5 h-5 text-blue-500" />, href: '/faq' },
    { id: 'privacy', label: 'الخصوصية والأمان', icon: <ShieldCheck className="w-5 h-5 text-green-500" />, href: '/privacy' },
  ];

  const userName = session?.user?.name || 'عبدالله محمد';
  const userBio = session?.user?.bio || 'محب للعطور الشرقية ✨';
  const avatarUrl = session?.user?.image || '/default-avatar.png';

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check network status before uploading
    if (!isOnline) {
      setError('لا يوجد اتصال بالإنترنت. يرجى التحقق من اتصالك والمحاولة مرة أخرى.');
      return;
    }

    // التحقق من الشروط
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('الصورة غير صالحة، يرجى اختيار صورة بصيغة JPG أو PNG أو WEBP وبحجم لا يتجاوز 2MB.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('الصورة غير صالحة، يرجى اختيار صورة بصيغة JPG أو PNG أو WEBP وبحجم لا يتجاوز 2MB.');
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);

    setIsUploading(true);
    setError('');

    try {
      // رفع إلى Vercel Blob Storage
      const formData = new FormData();
      formData.append('file', file);

      const response = await safeFetch<{ success: boolean; avatarUrl?: string; error?: string }>(
        '/api/avatar',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.success && response.avatarUrl) {
        // Validate avatarUrl is a string
        if (typeof response.avatarUrl !== 'string') {
          throw new Error('رابط الصورة غير صحيح')
        }
        
        // تحديث Session
        await update({ image: response.avatarUrl });
        
        // تحديث localStorage أو revalidatePath
        setImagePreview(null);
      } else {
        throw new Error(response.error || 'فشل الرفع');
      }
    } catch (err) {
      setError('حدث خطأ أثناء رفع الصورة. جرب مرة أخرى.');
    } finally {
      setIsUploading(false);
    }
  };

  const openEmail = () => {
    const subject = encodeURIComponent('استفسار حول صبا');
    const body = encodeURIComponent('مرحباً فريق صبا،\n\nأود الاستفسار عن...\n\nشكراً!');
    window.open(`mailto:support@askseba.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header & Profile Card */}
      <div className="bg-white/90 backdrop-blur-sm px-6 pt-12 pb-8 rounded-b-[40px] shadow-lg border-b border-brown/20">
        <div className="flex flex-col items-center">
          {/* Avatar مع رفع */}
          <div className="relative group">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/50 shadow-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
              {imagePreview || avatarUrl ? (
                <Image
                  src={imagePreview || avatarUrl}
                  alt="صورة الملف الشخصي"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <User size={56} className="text-brown/60" />
              )}
            </div>
            
            {/* زر رفع الصورة */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="absolute bottom-1 right-1 min-w-[44px] min-h-[44px] bg-primary/90 hover:bg-primary text-white p-3 rounded-full border-2 border-white shadow-lg transition-all group-hover:scale-110 disabled:opacity-50 touch-manipulation"
              title="رفع صورة جديدة"
            >
              {isUploading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Camera size={18} />
              )}
            </button>
          </div>

          <h1 className="mt-4 text-2xl md:text-3xl font-bold text-brown leading-tight">{userName}</h1>
          <div className="relative w-full group/bio">
            <textarea
              autoComplete="off"
              value={optimisticBio}
              onChange={(e) => setOptimisticBio(e.target.value)}
              onBlur={async (e) => {
                const newBio = e.target.value;
                const previousBio = optimisticBio;
                
                try {
                  await update({ bio: newBio });
                } catch (error) {
                  setOptimisticBio(previousBio);  // Rollback
                  setError('فشل حفظ الوصف. يرجى المحاولة مرة أخرى.');
                  console.error('Bio update error:', error);
                }
              }}
              placeholder="وصف نفسك ✨"
              className="w-full p-2 mt-2 border border-brown/20 rounded-xl text-sm text-center resize-none focus:ring-1 focus:ring-amber-500/30 outline-none transition-all"
              maxLength={100}
              rows={2}
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover/bio:opacity-100 transition-opacity pointer-events-none">
              <span className="text-xs text-brown/40 bg-white/80 px-2 py-0.5 rounded-full border border-brown/10 shadow-sm whitespace-nowrap">
                يتم الحفظ تلقائياً عند الخروج ✨
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* معلومات الدعم */}
      <div className="px-6 mt-8 space-y-2">
        <h2 className="text-xs font-bold text-brown/60 mr-2 mb-3 tracking-wide uppercase">المعلومات والدعم</h2>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm border border-brown/10 overflow-hidden">
          {menuItems.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "min-h-[44px] flex items-center justify-between p-5 hover:bg-amber-50/50 transition-all group relative group touch-manipulation",
                index !== menuItems.length - 1 && "border-b border-brown/5"
              )}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brown/5 hover:bg-primary/10 group-hover:bg-primary/20 rounded-2xl transition-all w-12 h-12 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-base font-semibold text-brown leading-tight">{item.label}</span>
              </div>
              <motion.div
                initial={{ x: 4 }}
                animate={{ x: 0 }}
                className="text-brown/40 group-hover:text-brown transition-transform"
              >
                <ChevronLeft size={20} />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA: تواصل معنا */}
      <div className="px-6 mt-8">
        <button
          onClick={openEmail}
          className="min-h-[44px] w-full bg-gradient-to-r from-primary to-amber-600 text-white rounded-3xl p-5 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 transition-all font-semibold text-base touch-manipulation"
        >
          <MessageCircle size={24} />
          <span>تواصل مع فريق صبا</span>
        </button>
      </div>

      {/* تسجيل خروج */}
      <div className="px-6 mt-12 pb-8">
        <button 
          onClick={async () => {
            // Clear all user data before signOut
            clearQuiz()
            clearAllUserData()
            await signOut({ callbackUrl: '/' })
            // router.push('/') removed - signOut({ callbackUrl: '/' }) already handles redirect
          }}
          className="min-h-[44px] w-full flex items-center justify-center gap-3 text-brown/70 hover:text-red-500 hover:bg-brown/5 rounded-2xl p-4 font-medium transition-all touch-manipulation"
        >
          <LogOut size={20} />
          <span>تسجيل الخروج</span>
        </button>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-brown/40 mt-6 pb-6">
        نسخة التطبيق 2.3.1<br />
        صنع بكل حب في السعودية 🇸🇦
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Error Toast */}
      <AnimatePresence>
        {error && (
          <ErrorToast 
            error={error} 
            onClose={() => setError('')} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
