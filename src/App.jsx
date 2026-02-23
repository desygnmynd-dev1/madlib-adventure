import React, { useState, useEffect } from "react";

export default function App() {
  const steps = ["welcome", "name", "animal", "state", "sport", "tool", "result"];
  const maxSteps = 5;

  const [stepIndex, setStepIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const [selection, setSelection] = useState({
    name: "",
    animal: "",
    state: "",
    sport: "",
    tool: ""
  });

  const [mascotPosition, setMascotPosition] = useState(0);
  const [mascotFlip, setMascotFlip] = useState(false);

  const themes = {
    welcome: "#6C5CE7",
    name: "#00B894",
    animal: "#0984E3",
    state: "#E17055",
    sport: "#D63031",
    tool: "#6C5CE7",
    result: "#2f3e46"
  };

  const options = {
    name: ["Captain Sparkle","Turbo Timmy","Ninja Noodle","Sir Giggles","Princess Pickles","Wiggly Wanda","Rocket Riley","Mighty Mango","Professor Pancake","Daring Daisy","Zooming Zach","Cosmic Chloe","Bouncing Benny","Shadow Sammy","Electric Ellie","Galaxy Gabe","Tornado Tessa","Blazing Bobby","Whirlwind Willow","Mega Max"],
    animal: ["Flamingo","Dragon","Penguin","Llama","Gorilla","Hamster","Tiger","Elephant","Cheetah","Koala","Octopus","Falcon","Shark","Panda","Kangaroo","Alligator","Owl","Dolphin","Rhino","Fox"],
    state: ["Texas","Alaska","Florida","Hawaii","California","New York","Colorado","Arizona","Nevada","Oregon","Washington","Utah","Montana","Wyoming","Georgia","Illinois","Michigan","Ohio","North Carolina","Tennessee"],
    sport: ["Basketball","Surfing","Soccer","Wrestling","Skateboarding","Ice Skating","Baseball","Football","Tennis","Volleyball","Snowboarding","Swimming","Gymnastics","Hockey","Boxing","Archery","Karate","Rugby","Cycling","Fencing"],
    tool: ["Hammer","Keyboard","Spoon","Leaf Blower","Wrench","Paintbrush","Drill","Chainsaw","Screwdriver","Ladder","Flashlight","Compass","Tape Measure","Glue Gun","Magic Wand","Shovel","Calculator","Microphone","Jetpack","Grappling Hook"]
  };

  const getRandomFour = (array) =>
    [...array].sort(() => 0.5 - Math.random()).slice(0, 4);

  const [roundOptions, setRoundOptions] = useState({});

  useEffect(() => {
    const currentKey = steps[stepIndex];
    if (options[currentKey]) {
      setRoundOptions((prev) => ({
        ...prev,
        [currentKey]: getRandomFour(options[currentKey])
      }));
    }
  }, [stepIndex]);

  const mascotStep = 100 / (maxSteps + 2);

  const startGame = () => {
    setMascotPosition(0);
    setStepIndex(1);
  };

  const handleSelect = (key, value) => {
    setSelection((prev) => ({ ...prev, [key]: value }));
    setMascotFlip(true);

    setTimeout(() => {
      setMascotPosition((prev) => Math.min(prev + 1, maxSteps));
      setMascotFlip(false);
      setStepIndex((prev) => prev + 1);
    }, 400);
  };

  const restart = () => {
    setSelection({ name:"", animal:"", state:"", sport:"", tool:"" });
    setStepIndex(0);
    setMascotPosition(0);
    setMenuOpen(false);
  };

  const currentStep = steps[stepIndex];

  return (
    <div className="app" style={{ background: themes[currentStep] }}>

      <style>{`
        html, body, #root {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        body {
          font-family: 'Arial Black', Impact, system-ui, sans-serif;
        }

        .app {
          height: 100dvh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          color: white;
        }

        .navbar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 70px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(0,0,0,0.25);
          backdrop-filter: blur(6px);
          z-index: 10;
        }

        .navTitle {
          font-size: 20px;
          font-weight: 900;
        }

        .hamburger {
          width: 30px;
          height: 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
        }

        .hamburger span {
          height: 4px;
          background: white;
          border-radius: 3px;
        }

        .mainTitle {
          font-size: clamp(36px, 6vw, 52px);
          font-weight: 900;
          text-align: center;
          margin-bottom: 20px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 24px;
          width: 100%;
          max-width: 900px;
          padding: 0 32px;
          box-sizing: border-box;
          margin-top: 40px;
        }

        @media (max-width: 600px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Base button style (natural width) */
        .legoButton {
          background: white;
          color: #222;
          padding: 18px;
          font-size: 16px;
          font-weight: 800;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 6px 0 rgba(0,0,0,0.25);
          transition: .15s;
        }

        /* Only grid buttons stretch */
        .grid .legoButton {
          width: 100%;
        }

        .legoButton:active {
          transform: translateY(3px);
          box-shadow: 0 3px 0 rgba(0,0,0,0.25);
        }

        .storyWrapper {
          max-width: 900px;
          font-size: clamp(18px,3vw,26px);
          text-align: center;
          line-height: 1.6;
          padding: 0 24px;
        }

        .storyBox {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 6px;
          font-weight: 900;
          color: white;
          margin: 6px;
        }

        .mascot {
          position: absolute;
          bottom: 30px;
          left: 40px;
          font-size: 90px;
          transition: transform .4s ease;
        }

        .modalOverlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
        }

        .modal {
          background: white;
          color: #222;
          padding: 40px;
          border-radius: 16px;
          text-align: center;
          max-width: 320px;
          width: 90%;
        }
      `}</style>

      <div className="navbar">
        <div className="navTitle">MADLIB ADVENTURE</div>
        <div className="hamburger" onClick={() => setMenuOpen(true)}>
          <span></span><span></span><span></span>
        </div>
      </div>

      {menuOpen && (
        <div className="modalOverlay" onClick={() => setMenuOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>🎮 GAME MENU</h2>
            <p>Restart your adventure?</p>
            <button className="legoButton" onClick={restart}>START OVER</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: "80px", textAlign: "center" }}>
        {currentStep === "welcome" && (
          <>
            <h1 className="mainTitle">MADLIB ADVENTURE</h1>
            <button className="legoButton" onClick={startGame}>START GAME</button>
          </>
        )}

        {options[currentStep] && (
          <div className="grid">
            {roundOptions[currentStep]?.map(opt => (
              <button
                key={opt}
                className="legoButton"
                onClick={() => handleSelect(currentStep, opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {currentStep === "result" && (
          <>
            <div className="storyWrapper">
              One day,
              <span className="storyBox" style={{ background: themes.name }}>{selection.name}</span>
              the brave
              <span className="storyBox" style={{ background: themes.animal }}>{selection.animal}</span>
              from
              <span className="storyBox" style={{ background: themes.state }}>{selection.state}</span>
              competed in
              <span className="storyBox" style={{ background: themes.sport }}>{selection.sport}</span>
              using a magical
              <span className="storyBox" style={{ background: themes.tool }}>{selection.tool}</span>.
            </div>

            <button className="legoButton" onClick={restart}>PLAY AGAIN</button>
            <div style={{ fontSize: "120px", marginTop: "20px" }}>🎉</div>
          </>
        )}
      </div>

      <div
        className="mascot"
        style={{
          transform: `translateX(calc(${mascotPosition * mascotStep}vw)) ${mascotFlip ? "scaleX(-1)" : ""}`
        }}
      >
        {currentStep === "result" ? "" : "🤖"}
      </div>

    </div>
  );
}