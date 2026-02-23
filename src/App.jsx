// ==============================================
// MADLIB ADVENTURE GAME
// CENTERED LAYOUT + MOBILE SAFE MASCOT FIX
// ==============================================

import React, { useState, useEffect } from "react";

export default function App() {

  const steps = ["welcome", "name", "animal", "state", "sport", "tool", "result"];
  const [stepIndex, setStepIndex] = useState(0);
  const [titleMinimized, setTitleMinimized] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [selection, setSelection] = useState({ name:"", animal:"", state:"", sport:"", tool:"" });

  const [mascotPosition, setMascotPosition] = useState(0);
  const [mascotFlip, setMascotFlip] = useState(false);

  const themes = {
    welcome:"#6C5CE7",
    name:"#00B894",
    animal:"#0984E3",
    state:"#E17055",
    sport:"#D63031",
    tool:"#6C5CE7",
    result:"#1f2a2e"
  };

  const options = {
    name:["Captain Sparkle","Turbo Timmy","Ninja Noodle","Sir Giggles","Princess Pickles","Wiggly Wanda","Rocket Riley","Mighty Mango","Professor Pancake","Daring Daisy","Zooming Zach","Cosmic Chloe","Bouncing Benny","Shadow Sammy","Electric Ellie","Galaxy Gabe","Tornado Tessa","Blazing Bobby","Whirlwind Willow","Mega Max"],
    animal:["Flamingo","Dragon","Penguin","Llama","Gorilla","Hamster","Tiger","Elephant","Cheetah","Koala","Octopus","Falcon","Shark","Panda","Kangaroo","Alligator","Owl","Dolphin","Rhino","Fox"],
    state:["Texas","Alaska","Florida","Hawaii","California","New York","Colorado","Arizona","Nevada","Oregon","Washington","Utah","Montana","Wyoming","Georgia","Illinois","Michigan","Ohio","North Carolina","Tennessee"],
    sport:["Basketball","Surfing","Soccer","Wrestling","Skateboarding","Ice Skating","Baseball","Football","Tennis","Volleyball","Snowboarding","Swimming","Gymnastics","Hockey","Boxing","Archery","Karate","Rugby","Cycling","Fencing"],
    tool:["Hammer","Keyboard","Spoon","Leaf Blower","Wrench","Paintbrush","Drill","Chainsaw","Screwdriver","Ladder","Flashlight","Compass","Tape Measure","Glue Gun","Magic Wand","Shovel","Calculator","Microphone","Jetpack","Grappling Hook"]
  };

  const getRandomFour = (array) => [...array].sort(()=>0.5-Math.random()).slice(0,4);
  const [roundOptions,setRoundOptions] = useState({});

  useEffect(()=>{
    const currentKey = steps[stepIndex];
    if(options[currentKey]){
      setRoundOptions(prev=>({...prev,[currentKey]:getRandomFour(options[currentKey])}));
    }
  },[stepIndex]);

  const startGame = () => {
    setTitleMinimized(true);
    setStepIndex(1);
  };

  const handleSelect = (key,value) => {
    setSelection(prev=>({...prev,[key]:value}));
    setMascotFlip(true);
    setTimeout(()=>{
      setMascotPosition(prev=>prev+1);
      setMascotFlip(false);
      setStepIndex(prev=>prev+1);
    },400);
  };

  const restart = () => {
    setSelection({ name:"", animal:"", state:"", sport:"", tool:"" });
    setStepIndex(0);
    setMascotPosition(0);
    setTitleMinimized(false);
    setMenuOpen(false);
  };

  const currentStep = steps[stepIndex];

  return (
    <div className="app" style={{background:themes[currentStep]}}>

      <style>{`
        html,body,#root{
          height:100%;
          width:100%;
          margin:0;
          padding:0;
          overflow:hidden;
        }

        body{
          font-family:'Arial Black',Impact,system-ui,sans-serif;
        }

        .app{
          height:100dvh;
          width:100vw;
          display:flex;
          align-items:center;
          justify-content:center;
          position:relative;
          overflow:hidden;
        }

        /* CENTER CONTENT WRAPPER */
        .content{
          width:100%;
          max-width:1000px;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          text-align:center;
          padding:20px;
        }

        /* NAVBAR */
        .navbar{
          position:absolute;
          top:0;
          left:0;
          right:0;
          height:70px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:0 20px;
          background:rgba(0,0,0,0.25);
          z-index:10;
        }

        .title{
          font-size:clamp(32px,6vw,48px);
          font-weight:900;
          letter-spacing:2px;
          text-transform:uppercase;
          transition:all .8s ease;
        }

        .title.minimized{
          font-size:20px;
          transform:translateY(-4px);
        }

        .hamburger{
          width:30px;
          height:22px;
          display:flex;
          flex-direction:column;
          justify-content:space-between;
          cursor:pointer;
        }
        .hamburger span{
          height:4px;
          background:white;
          border-radius:3px;
        }

        .modalOverlay{
          position:absolute;
          inset:0;
          background:rgba(0,0,0,0.6);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:20;
        }

        .modal{
          background:white;
          color:#222;
          padding:40px;
          border-radius:14px;
          text-align:center;
          animation:pop .4s ease;
        }
        @keyframes pop{from{transform:scale(.7);}to{transform:scale(1);}}

        .legoButton{
          background:white;
          color:#222;
          padding:20px 30px;
          font-size:18px;
          font-weight:800;
          border:none;
          border-radius:8px;
          cursor:pointer;
          box-shadow:0 6px 0 rgba(0,0,0,0.25);
          transition:.15s;
          margin-top:20px;
        }
        .legoButton:active{
          transform:translateY(3px);
          box-shadow:0 3px 0 rgba(0,0,0,0.25);
        }

        .grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(140px,1fr));
          gap:16px;
          width:100%;
          margin-top:20px;
        }

        /* MASCOT FIXED SAFE POSITION */
        .mascot{
          position:absolute;
          bottom:calc(20px + env(safe-area-inset-bottom));
          left:20px;
          font-size:clamp(40px,5vw,70px);
          transition:.4s;
          z-index:5;
        }
        .flip{transform:scaleX(-1);}        
      `}</style>

      {titleMinimized && (
        <div className="navbar">
          <div className="title minimized">MADLIB ADVENTURE</div>
          <div className="hamburger" onClick={()=>setMenuOpen(true)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="modalOverlay" onClick={()=>setMenuOpen(false)}>
          <div className="modal" onClick={(e)=>e.stopPropagation()}>
            <h2>🎮 GAME MENU</h2>
            <p>Restart your adventure?</p>
            <button className="legoButton" onClick={restart}>START OVER</button>
          </div>
        </div>
      )}

      <div className="content">
        {!titleMinimized && currentStep==="welcome" && (
          <>
            <h1 className="title">MADLIB ADVENTURE</h1>
            <button className="legoButton" onClick={startGame}>START GAME</button>
          </>
        )}

        {options[currentStep] && (
          <div className="grid">
            {roundOptions[currentStep]?.map(opt=> (
              <button key={opt} className="legoButton" onClick={()=>handleSelect(currentStep,opt)}>{opt}</button>
            ))}
          </div>
        )}

        {currentStep==="result" && (
          <>
            <h2>{`${selection.name} the ${selection.animal} from ${selection.state} played ${selection.sport} using a ${selection.tool}!`}</h2>
            <button className="legoButton" onClick={restart}>PLAY AGAIN</button>
          </>
        )}
      </div>

      <div className={`mascot ${mascotFlip?"flip":""}`} style={{left:20+mascotPosition*90}}>
        {currentStep==="result"?"🙌":"🤖"}
      </div>

    </div>
  );
}
