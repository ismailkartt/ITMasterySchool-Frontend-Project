import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowUp } from "react-icons/fa";
import "./scroll-to-top-button.scss";

const ScrollToTopButton = () => {
    // useState hook'u ile butonun görünür olup olmadığını kontrol eden bir state oluşturuyoruz.
    const [isVisible, setIsVisible] = useState(false);

    // useEffect hook'u, bileşen yüklendiğinde ve temizlendiğinde çalışan bir efekt oluşturur.
    useEffect(() => {
        // Sayfanın kaydırılma durumuna göre butonun görünürlüğünü ayarlayan bir fonksiyon tanımlıyoruz.
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true); // Sayfa 300 pikselden fazla kaydırılmışsa buton görünür.
            } else {
                setIsVisible(false); // Aksi halde buton görünmez.
            }
        };

        // Scroll event listener ekliyoruz.
        window.addEventListener('scroll', toggleVisibility);
        
        // Cleanup function: event listener'ı kaldırıyoruz.
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Butona tıklandığında sayfanın en üstüne yumuşak bir kaydırma yapacak fonksiyon.
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Button 
            variant='primary'
            className={`scroll-to-top-button ${isVisible ? "visible" : "hidden"}`}
            onClick={scrollToTop}
        >
            <FaArrowUp />
        </Button>
    );
};

export default ScrollToTopButton;
