import confetti from "canvas-confetti";
import { useState, useEffect } from "react";

const targetDate = new Date("2025-03-11T00:00:00-05:00"); // Fecha objetivo (11 de marzo) con hora de Ecuador (GMT-5)

const phrases = [
  {
    title: "Que todos tus sueños se hagan realidad. ⭐️",
  },
  {
    title: "Eres una persona increíble. 😇",
  },
  {
    title: "Disfruta tu día al máximo. 🎂",
  },
];

const customPhrases = [
  {
    title:
      "Hoy es un día especial, y de corazón espero que tengas mucha alegría y éxito. 🥰",
  },
  {
    title: "Ojalá este año te traiga un montón de oportunidades. 😎",
  },
  {
    title:
      "Recuerda, cada pequeño paso te lleva más cerca de donde quieres estar. Confía en ti. 💫",
  },
  {
    title: "Para lo que necesites, aquí estará su servidor. 😊",
  },
  {
    title:
      "Nunca dejes que nada te haga decaer, incluso cuando sientas que las cosas no salen como lo planeaste. Lo importante es seguir adelante. 💪",
  },
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
      }, 4 * 1000);

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

  const lanzarSerpentinas = () => {
    confetti({
      particleCount: 100,
      spread: 160,
      startVelocity: 30,
      scalar: 1.2,
      origin: { y: 0.6 }, // Desde la parte superior
      colors: ["#FF69B4", "#FFD700", "#00FFFF", "#FF4500"], // Rosado, dorado, celeste, naranja
    });
  };

  const handleButtonClick = () => {
    setAutoChangeEnabled(false);
    lanzarSerpentinas();

    const randomPhrase =
      customPhrases[Math.floor(Math.random() * customPhrases.length)];
    setCurrentPhrase(randomPhrase);
  };

  const isMarch11 = new Date().getMonth() === 2 && new Date().getDate() === 11;

  return (
    <div className="container">
      <h1>
        {isMarch11
          ? "💚 🎨 ¡Feliz cumpleaños Mafer! 🎸 🎮"
          : "💚 🎨 11 de Marzo 🎸 🎮"}
      </h1>

      {!showContent && <p>Tiempo restante: {formatTime(timeLeft)}</p>}

      {showContent ? (
        <div>
          <div className="sticker-container">
            <h2>{currentPhrase.title}</h2>
          </div>

          {isButtonEnabled && (
            <div className="button-container">
              <button onClick={handleButtonClick}>¡ Sorpréndeme !</button>
            </div>
          )}
        </div>
      ) : (
        <div className="wait">
          <p>¡Esperando! ⏳</p>
        </div>
      )}
    </div>
  );
};

export default Counter;
