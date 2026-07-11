import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

/**
 * ImageLightbox — reusable full-screen image viewer.
 *
 * Usage:
 *   const [lightboxSrc, setLightboxSrc] = useState(null);
 *   <img src={src} onClick={() => setLightboxSrc(src)} className="cursor-zoom-in" />
 *   <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
 */
function ImageLightbox({ src, alt = '', onClose }) {
    useEffect(() => {
        if (!src) return;
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [src, onClose]);

    if (!src) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
                onClick={onClose}
                aria-label="Close"
            >
                <X size={22} />
            </button>

            {/* Image */}
            <img
                src={src}
                alt={alt}
                className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
                onClick={(e) => e.stopPropagation()}
            />
        </div>,
        document.body
    );
}

export default ImageLightbox;
