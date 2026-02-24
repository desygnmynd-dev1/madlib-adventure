import React, { useState } from "react";

export default function App() {
  const steps = ["welcome", "name", "animal", "state", "sport", "tool", "result"];

  const [stepIndex, setStepIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selection, setSelection] = useState({
    name: "",
    animal: "",
    state: "",
    sport: "",
    tool: ""
  });

  const [mascotIndex, setMascotIndex] = useState(0);
  const [mascotFlip, setMascotFlip] = useState(false);

  const mascots = ["🤖", "🚀", "🎮", "✨", "🌟"];

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

  const stepPrompts = {
    name: "Choose a name",
    animal: "Choose an animal",
    state: "Choose a state",
    sport: "Choose a sport",
    tool: "Choose a tool"
  };

  const adlibTemplates = [
    "{name} and a {animal} from {state} tried {sport} with a {tool}, then slipped on pudding and bowed.",
    "At snack time, {name} and a {animal} from {state} played {sport} using a {tool} as a referee whistle.",
    "During recess, {name} and a {animal} from {state} invented {sport} with a {tool} and won jellybean medals.",
    "On Tuesday, {name} and a {animal} from {state} practiced {sport} with a {tool} while giggling at pigeons.",
    "In the hallway, {name} and a {animal} from {state} did {sport} with a {tool} and high-fived a plant.",
    "At sunrise, {name} and a {animal} from {state} attempted {sport} using a {tool} and shocked the pancakes.",
    "At lunch, {name} and a {animal} from {state} coached {sport} with a {tool} and celebrated with pickles.",
    "Before class, {name} and a {animal} from {state} played {sport} with a {tool} and moonwalked to math.",
    "At the park, {name} and a {animal} from {state} tried {sport} with a {tool} and scared the squirrels.",
    "After school, {name} and a {animal} from {state} hosted {sport} using a {tool} and glitter fireworks.",
    "In art class, {name} and a {animal} from {state} mixed {sport} with a {tool} and painted silly trophies.",
    "At bedtime, {name} and a {animal} from {state} whispered about {sport} while polishing a {tool} for luck.",
    "During science, {name} and a {animal} from {state} tested {sport} with a {tool} and launched marshmallows.",
    "On the bus, {name} and a {animal} from {state} planned {sport} using a {tool} and sang noodle songs.",
    "At the library, {name} and a {animal} from {state} played {sport} with a {tool} and shushed a robot.",
    "In gym, {name} and a {animal} from {state} attempted {sport} with a {tool} and cartwheeled into applause.",
    "At the fair, {name} and a {animal} from {state} judged {sport} using a {tool} and handed out cupcakes.",
    "In the kitchen, {name} and a {animal} from {state} practiced {sport} with a {tool} and dodged waffles.",
    "At the zoo, {name} and a {animal} from {state} announced {sport} through a {tool} and everyone cheered.",
    "On Friday, {name} and a {animal} from {state} finished {sport} with a {tool} and danced like noodles."
  ];

  const renderAdlibWithButtons = (template) => {
    const tokenPattern = /(\{name\}|\{animal\}|\{state\}|\{sport\}|\{tool\})/g;
    const tokenMap = {
      "{name}": { value: selection.name, color: themes.name },
      "{animal}": { value: selection.animal, color: themes.animal },
      "{state}": { value: selection.state, color: themes.state },
      "{sport}": { value: selection.sport, color: themes.sport },
      "{tool}": { value: selection.tool, color: themes.tool }
    };

    return template.split(tokenPattern).map((part, index) => {
      const token = tokenMap[part];
      if (!token) return part;

      return (
        <button
          key={`${part}-${index}`}
          className="legoButton selectionButton"
          style={{ background: token.color }}
        >
          {token.value}
        </button>
      );
    });
  };

  const getRandomFour = (array) =>
    [...array].sort(() => 0.5 - Math.random()).slice(0, 4);

  const [roundOptions, setRoundOptions] = useState({});
  const [resultAdlib, setResultAdlib] = useState("");

  const startGame = () => {
    setMascotIndex(0);
    setRoundOptions({
      name: getRandomFour(options.name)
    });
    setStepIndex(1);
  };

  const handleSelect = (key, value) => {
    const nextSelection = { ...selection, [key]: value };
    setSelection(nextSelection);
    setMascotFlip(true);

    setTimeout(() => {
      setMascotIndex((prev) => (prev + 1) % mascots.length);
      setMascotFlip(false);
      setStepIndex((prev) => {
        const nextStepIndex = prev + 1;
        const nextStepKey = steps[nextStepIndex];

        if (options[nextStepKey]) {
          setRoundOptions((prevOptions) => ({
            ...prevOptions,
            [nextStepKey]: getRandomFour(options[nextStepKey])
          }));
        }

        if (steps[nextStepIndex] === "result") {
          const randomIndex = Math.floor(Math.random() * adlibTemplates.length);
          setResultAdlib(adlibTemplates[randomIndex]);
        }
        return nextStepIndex;
      });
    }, 400);
  };

  const restart = () => {
    setStepIndex(0);
    setMascotIndex(0);
    setRoundOptions({});
    setSelection({ name: "", animal: "", state: "", sport: "", tool: "" });
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
          font-size: clamp(48px, 8vw, 64px);
          font-weight: 900;
          text-align: center;
          margin-bottom: 20px;
          padding: 0 20px;
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

          .legoButton {
            height: 45px !important;
          }
        }

        /* Base button style (fixed size) */
        .legoButton {
          background: white;
          color: #222;
          padding: 12px 18px;
          font-size: 16px;
          font-weight: 800;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 6px 0 rgba(0,0,0,0.25);
          transition: .15s;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: normal;
          word-break: break-word;
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

        @media (max-width: 600px) {
          .storyWrapper {
            line-height: 3.4;
          }
        }

        .storyBox {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 6px;
          font-weight: 900;
          color: white;
          margin: 6px;
        }

        .selectionButton {
          display: inline-flex;
          margin: 0 6px;
          vertical-align: middle;
        }

        .mascot {
          position: absolute;
          bottom: 30px;
          left: calc(50% - 45px);
          font-size: 90px;
          transition: transform .4s ease;
        }

        .partyHat {
          display: inline-block;
          margin-top: 30px;
          animation: bobbing 0.8s ease-in-out infinite;
        }

        @keyframes bobbing {
          0%, 100% {
            transform: translateY(0px) rotateZ(0deg);
          }
          50% {
            transform: translateY(-15px) rotateZ(5deg);
          }
        }

        .modalOverlay {
          position: fixed;
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
          margin: 16px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .modal button {
          align-self: center;
          background: #00B894;
          color: white;
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
            <h2>GAME MENU</h2>
            <div style={{ fontSize: "54px", lineHeight: 1 }}>🎮</div>
            <p>Restart your adventure?</p>
            <button className="legoButton" onClick={restart}>START OVER</button>
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: currentStep === "result" ? "80px" : "40px",
          textAlign: "center",
          transform: currentStep === "result" ? "none" : "translateY(-10vh)"
        }}
      >
        {currentStep === "welcome" && (
          <>
            <h1 className="mainTitle">MADLIB ADVENTURE</h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="legoButton" onClick={startGame}>START GAME</button>
            </div>
          </>
        )}

        {options[currentStep] && (
          <>
            <h2 className="mainTitle">{stepPrompts[currentStep]}</h2>
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
          </>
        )}

        {currentStep === "result" && (
          <>
            <div className="storyWrapper">{renderAdlibWithButtons(resultAdlib)}</div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
              <button className="legoButton" onClick={restart}>PLAY AGAIN</button>
            </div>
            <svg className="partyHat" width="120" height="140" viewBox="0 0 120 140">
              {/* Main cone of hat */}
              <polygon points="60,10 20,100 100,100" fill="#FF1744" stroke="white" strokeWidth="2" />
              {/* Stripe 1 */}
              <line x1="45" y1="40" x2="75" y2="40" stroke="white" strokeWidth="2" />
              {/* Stripe 2 */}
              <line x1="35" y1="65" x2="85" y2="65" stroke="white" strokeWidth="2" />
              {/* Brim */}
              <ellipse cx="60" cy="100" rx="41" ry="8" fill="#FFD54F" stroke="white" strokeWidth="2" />
              {/* Pom pom on top */}
              <circle cx="60" cy="8" r="8" fill="#FFD54F" stroke="white" strokeWidth="2" />
            </svg>
          </>
        )}
      </div>

      <div
        className="mascot"
        style={{
          transform: mascotFlip ? "scaleX(-1)" : ""
        }}
      >
        {currentStep === "result" ? "" : mascots[mascotIndex]}
      </div>

    </div>
  );
}