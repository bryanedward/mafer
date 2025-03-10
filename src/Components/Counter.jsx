import { useState, useEffect } from "react";

const targetDate = new Date("2025-03-10T00:00:00-05:00"); // Fecha objetivo (11 de marzo) con hora de Ecuador (GMT-5)

const phrases = [
  "Que todos tus sueños se hagan realidad.",
  "Eres una persona increíble.",
  "Disfruta tu día al máximo. 🎂",
];

const customPhrases = [
  "Hoy es un día especial, y de corazón espero que tengas mucha alegría y éxito.",
  "Ojalá este año te traiga un montón de oportunidades.",
  "Recuerda, cada pequeño paso te lleva más cerca de donde quieres estar. Confía en ti, Mafer. 💫",
  "Para lo que necesites, aquí estará su servidor. 😊",
];

const Counter = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [autoChangeEnabled, setAutoChangeEnabled] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      const now = new Date();
      const remainingTime = targetDate - now;

      setTimeLeft(remainingTime);

      if (remainingTime <= 0) {
        setIsButtonEnabled(true);
        setShowContent(true);
        clearInterval(countdown);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (autoChangeEnabled) {
      const phraseInterval = setInterval(() => {
        setCurrentPhrase((prevPhrase) => {
          const nextIndex = (phrases.indexOf(prevPhrase) + 1) % phrases.length;
          return phrases[nextIndex];
        });
      }, 2 * 1000);

      return () => clearInterval(phraseInterval);
    }
  }, [autoChangeEnabled]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (ms <= 0) {
      return "0h 0m 0s";
    }

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleButtonClick = () => {
    setAutoChangeEnabled(false);

    const randomPhrase =
      customPhrases[Math.floor(Math.random() * customPhrases.length)];
    setCurrentPhrase(randomPhrase);
  };

  const isMarch11 = new Date().getMonth() === 2 && new Date().getDate() === 10;

  return (
    <div className="container">
      <h1>
        {isMarch11
          ? "💚 🎨 ¡Feliz cumpleaños Mafer! 🎸 🎮"
          : "💚 🎨 11 de Marzo 🎸 🎮"}
      </h1>

      <p>Tiempo restante: {formatTime(timeLeft)}</p>

      {showContent ? (
        <div>
          <h2>{currentPhrase}</h2>
          {isButtonEnabled && (
            <div className="button-container">
              <button onClick={handleButtonClick}>¡ Sorpréndeme !</button>
            </div>
          )}
        </div>
      ) : (
        <p>¡Esperando! ⏳</p>
      )}
    </div>
  );
};

export default Counter;
