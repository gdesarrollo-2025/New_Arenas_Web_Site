import { useState, useEffect } from "react";

export default function useTypewriter(words, typingSpeed = 80, deletingSpeed = 50, delayBetweenWords = 800) {
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);       // palabra actual
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[index];

        let timeout;

        if (!isDeleting) {
            // escribiendo
            timeout = setTimeout(() => {
                const nextText = currentWord.substring(0, text.length + 1);
                setText(nextText);

                if (nextText === currentWord) {
                    // espera antes de borrar
                    setTimeout(() => setIsDeleting(true), delayBetweenWords);
                }
            }, typingSpeed);
        } else {
            // borrando
            timeout = setTimeout(() => {
                const nextText = currentWord.substring(0, text.length - 1);
                setText(nextText);

                if (nextText === "") {
                    setIsDeleting(false);
                    setIndex((prev) => (prev + 1) % words.length); // pasa a la siguiente palabra
                }
            }, deletingSpeed);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, index, words, typingSpeed, deletingSpeed, delayBetweenWords]);

    return text;
}