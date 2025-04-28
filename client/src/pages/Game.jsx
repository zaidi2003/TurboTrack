import React, { useState, useEffect, useRef } from "react";
import { UserProfile, SideNavBar } from "../components";

export default function Game() {
  const canvasRef = useRef(null);
  const PLAYER_COLOR = 'red';
  const [player, setPlayer] = useState({
    progress: 0,
    speed: 0,
    accelerating: false,
    position: { x: 100, y: 200 },
    lap: 0,
    currentLapStart: 0,
    currentLapTime: 0,
    penaltyFactor: 0,
    accelerationEnergy: 100, 
    energyRecharging: false, 
    energyDepletionWarning: false 
  });
  const [debug, setDebug] = useState(false);
  const [bestLapTime, setBestLapTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const gameStartTimeRef = useRef(null);
  const drawLoopRef = useRef(); 

  const animationActive = useRef(true);
  
  const trackPath = [
    { x: 100, y: 200 },
    { x: 150, y: 200 },
    { x: 200, y: 200 },
    { x: 225, y: 180 },
    { x: 250, y: 160 },
    { x: 275, y: 130 },
    { x: 300, y: 100 },
    { x: 315, y: 80 },
    { x: 330, y: 80 },
    { x: 390, y: 80 },
    { x: 450, y: 80 },
    { x: 470, y: 95 },
    { x: 480, y: 110 },
    { x: 490, y: 130 },
    { x: 500, y: 150 },
    { x: 470, y: 175 },
    { x: 440, y: 200 },
    { x: 420, y: 210 },
    { x: 400, y: 220 },
    { x: 380, y: 230 },
    { x: 360, y: 230 },
    { x: 300, y: 230 },
    { x: 250, y: 230 },
    { x: 210, y: 240 },
    { x: 180, y: 250 },
    { x: 165, y: 260 },
    { x: 150, y: 270 },
    { x: 135, y: 260 },
    { x: 120, y: 250 },
    { x: 110, y: 225 },
    { x: 100, y: 200 }
  ];

  function getPlayerColors(colorName) {
    const colors = {
      'red': {
        glow: 'rgba(200, 0, 0, 0.3)',
        bright: '#FF3333',
        medium: '#CC0000',
        dark: '#8B0000',
        trail: 'rgba(200, 0, 0, ',
        heading: '#ff4747',
        penalty: 'rgba(255, 0, 0, ',
        energy: '#ff6666',
        energyBg: '#550000',
        energyWarning: '#ffff00'
      }
    };
    return colors[colorName] || colors['red'];
  }

  function getInterpolatedPosition(path, progress) {
    if (progress < 0) progress = 0;
    if (isNaN(progress)) progress = 0;
    const index = Math.floor(progress) % path.length;
    const t = progress - Math.floor(progress);
    const p0 = path[(index - 1 + path.length) % path.length];
    const p1 = path[index % path.length];
    const p2 = path[(index + 1) % path.length];
    const p3 = path[(index + 2) % path.length];
    
    if (!p0 || !p1 || !p2 || !p3) {
      return { x: 100, y: 200 };
    }
    
    const t2 = t * t;
    const t3 = t2 * t;
    
    const x = 0.5 * (
      (2 * p1.x) +
      (-p0.x + p2.x) * t +
      (2*p0.x - 5*p1.x + 4*p2.x - p3.x) * t2 +
      (-p0.x + 3*p1.x - 3*p2.x + p3.x) * t3
    );
    
    const y = 0.5 * (
      (2 * p1.y) +
      (-p0.y + p2.y) * t +
      (2*p0.y - 5*p1.y + 4*p2.y - p3.y) * t2 +
      (-p0.y + 3*p1.y - 3*p2.y + p3.y) * t3
    );
    
    return { x, y };
  }

  function calculateCurveSharpness(progress) {
    if (isNaN(progress)) return 0;
    const index = Math.floor(progress) % trackPath.length;
    const p0 = trackPath[index % trackPath.length];
    const p1 = trackPath[(index + 1) % trackPath.length];
    const p2 = trackPath[(index + 2) % trackPath.length];
    
    if (!p0 || !p1 || !p2) return 0;
    
    const v1 = { x: p1.x - p0.x, y: p1.y - p0.y };
    const v2 = { x: p2.x - p1.x, y: p2.y - p1.y };
    
    const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
    
    if (mag1 === 0 || mag2 === 0) return 0;
    
    const dotProduct = v1.x * v2.x + v1.y * v2.y;
    const cosAngle = dotProduct / (mag1 * mag2);
    
    return Math.max(0, (1 - cosAngle) / 2);
  }

  function formatTime(timeMs) {
    const minutes = Math.floor(timeMs / 60000);
    const seconds = Math.floor((timeMs % 60000) / 1000);
    const ms = Math.floor((timeMs % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
  }

  const updateGame = (time) => {
    if (!animationActive.current) return;
    
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
      if (!gameStartTimeRef.current) {
        gameStartTimeRef.current = Date.now();
      }
    }
    
    const deltaTime = Math.min(time - previousTimeRef.current, 100) / 1000;
    previousTimeRef.current = time;
    
    setCurrentTime(Date.now() - gameStartTimeRef.current);
    
    setPlayer(prevPlayer => {
      const curveSharpness = calculateCurveSharpness(prevPlayer.progress);
      let newSpeed = prevPlayer.speed;
      let newPenaltyFactor = prevPlayer.penaltyFactor;
      let newAccelerationEnergy = prevPlayer.accelerationEnergy;
      let newEnergyRecharging = prevPlayer.energyRecharging;
      let newEnergyDepletionWarning = prevPlayer.energyDepletionWarning;
      
      const safeSpeedThreshold = 0.15 - curveSharpness * 0.125;
      
      const isTooFast = newSpeed > safeSpeedThreshold && curveSharpness > 0.15;
      
      if (isTooFast) {
        newPenaltyFactor = Math.min(newPenaltyFactor + deltaTime * 6 * curveSharpness, 1);
      } else {
        newPenaltyFactor = Math.max(newPenaltyFactor - deltaTime * 1.5, 0);
      }
      
      let rechargeRate = 0;
      
      if (!prevPlayer.accelerating) {
        rechargeRate = 15;
        
        if (curveSharpness > 0.15) {
          rechargeRate += curveSharpness * 60;
          newEnergyRecharging = true;
        } else {
          newEnergyRecharging = false;
        }
      } else {
        newEnergyRecharging = false;
        
        const depletionRate = 30 + (newSpeed * 30) + (curveSharpness * 20);
        newAccelerationEnergy = Math.max(0, newAccelerationEnergy - depletionRate * deltaTime);
        newEnergyDepletionWarning = newAccelerationEnergy < 30;
      }
      
      if (rechargeRate > 0) {
        newAccelerationEnergy = Math.min(100, newAccelerationEnergy + rechargeRate * deltaTime);
      }
      
      const canAccelerate = newAccelerationEnergy > 0 && prevPlayer.accelerating;
      
      if (canAccelerate) {
        const maxSpeed = 0.35;
        const accelerationRate = 0.7;
        
        const baseCornerPenalty = curveSharpness * prevPlayer.speed * 4.0;
        
        const excessiveSpeedPenalty = isTooFast ?
          (prevPlayer.speed - safeSpeedThreshold) * 8 * curveSharpness : 0;
        
        const energyScalingFactor = Math.max(0.3, newAccelerationEnergy / 100);
        const effectiveAcceleration = accelerationRate * (1 - newPenaltyFactor * 0.9) * energyScalingFactor;
        
        newSpeed = Math.min(
          prevPlayer.speed + effectiveAcceleration * deltaTime -
          (baseCornerPenalty + excessiveSpeedPenalty) * deltaTime,
          maxSpeed
        );
      } else {
        const baseDeceleration = 0.25;
        
        const cornerDeceleration = isTooFast ?
          baseDeceleration + curveSharpness * 1.8 : baseDeceleration;
          
        newSpeed = Math.max(prevPlayer.speed - cornerDeceleration * deltaTime, 0);
      }
      
      newSpeed = Math.max(newSpeed, 0);
      
      let newProgress = (prevPlayer.progress + newSpeed) % trackPath.length;
      const newPosition = getInterpolatedPosition(trackPath, newProgress);
      
      let newLap = prevPlayer.lap;
      let newLapStart = prevPlayer.currentLapStart;
      let newLapTime = prevPlayer.currentLapTime;
      
      if (prevPlayer.progress > trackPath.length - 1 && newProgress < 1) {
        newLap += 1;
        if (newLap > 0) {
          const lapTime = Date.now() - newLapStart;
          if (bestLapTime === null || lapTime < bestLapTime) {
            setBestLapTime(lapTime);
          }
        }
        newLapStart = Date.now();
        newLapTime = 0;
      } else {
        newLapTime = Date.now() - newLapStart;
      }
      
      return {
        ...prevPlayer,
        speed: newSpeed,
        progress: newProgress,
        position: newPosition,
        lap: newLap,
        currentLapStart: newLapStart,
        currentLapTime: newLapTime,
        penaltyFactor: newPenaltyFactor,
        accelerationEnergy: newAccelerationEnergy,
        energyRecharging: newEnergyRecharging,
        energyDepletionWarning: newEnergyDepletionWarning
      };
    });
    
    requestRef.current = requestAnimationFrame(updateGame);
  };

  useEffect(() => {
    animationActive.current = true;
    gameStartTimeRef.current = Date.now();
    
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setPlayer(prev => ({ ...prev, accelerating: true }));
      }
      if (e.code === 'KeyD') {
        setDebug(prev => !prev);
      }
    };
    
    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setPlayer(prev => ({ ...prev, accelerating: false }));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    requestRef.current = requestAnimationFrame(updateGame);
    
    setPlayer(prev => ({
      ...prev,
      currentLapStart: Date.now()
    }));
    
    return () => {
      animationActive.current = false;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(requestRef.current);
      cancelAnimationFrame(drawLoopRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const playerColors = getPlayerColors(PLAYER_COLOR);
    
    function drawTrack(ctx) {
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(100, 200);
      ctx.lineTo(200, 200);
      ctx.quadraticCurveTo(230, 190, 250, 160);
      ctx.lineTo(300, 100);
      ctx.quadraticCurveTo(310, 80, 330, 80);
      ctx.lineTo(450, 80);
      ctx.quadraticCurveTo(470, 85, 480, 110);
      ctx.lineTo(500, 150);
      ctx.quadraticCurveTo(480, 170, 440, 200);
      ctx.lineTo(400, 220);
      ctx.quadraticCurveTo(380, 230, 360, 230);
      ctx.lineTo(250, 230);
      ctx.quadraticCurveTo(200, 230, 180, 250);
      ctx.lineTo(150, 270);
      ctx.lineTo(120, 250);
      ctx.quadraticCurveTo(100, 240, 100, 200);
      ctx.stroke();
      
      ctx.strokeStyle = '#444';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(90, 200);
      ctx.lineTo(110, 200);
      ctx.stroke();
      
      const checkSize = 3;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 2; j++) {
          ctx.fillStyle = (i + j) % 2 === 0 ? '#fff' : '#000';
          ctx.fillRect(95 + i * checkSize, 195 + j * checkSize, checkSize, checkSize);
        }
      }
      
      if (debug) {
        for (let i = 0; i < trackPath.length; i++) {
          const sharpness = calculateCurveSharpness(i);
          
          if (sharpness > 0.3) {
            ctx.fillStyle = `rgba(255, 0, 0, 0.8)`;
          } else if (sharpness > 0.15) {
            ctx.fillStyle = `rgba(255, 165, 0, 0.8)`;
          } else {
            ctx.fillStyle = 'rgba(255, 255, 0, 0.7)';
          }
          
          ctx.beginPath();
          ctx.arc(trackPath[i].x, trackPath[i].y, 3, 0, 2 * Math.PI);
          ctx.fill();
        }
        
        ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(trackPath[0].x, trackPath[0].y);
        for (let i = 1; i < trackPath.length; i++) {
          ctx.lineTo(trackPath[i].x, trackPath[i].y);
        }
        ctx.stroke();
      }
    }
    
    function drawTimers(ctx) {
      ctx.fillStyle = '#fff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`Lap: ${player.lap}`, 300, 30);
      ctx.fillText(`Time: ${formatTime(player.currentLapTime)}`, 300, 50);
      if (bestLapTime !== null) {
        ctx.fillStyle = '#FFD700';
        ctx.fillText(`Best: ${formatTime(bestLapTime)}`, 300, 70);
      }
    }
    
    function drawEnergyBar(ctx) {
      ctx.fillStyle = playerColors.energyBg;
      ctx.fillRect(20, 370, 150, 15);
      
      const fillWidth = (player.accelerationEnergy / 100) * 150;
      
      ctx.fillStyle = player.energyDepletionWarning ? 
        (Math.sin(Date.now() / 100) > 0 ? playerColors.energyWarning : playerColors.energy) : 
        playerColors.energy;
      
      ctx.fillRect(20, 370, fillWidth, 15);
      
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.strokeRect(20, 370, 150, 15);
      
      if (player.energyRecharging) {
        ctx.fillStyle = '#fff';
        const pulseSize = 1 + 0.3 * Math.sin(Date.now() / 100);
        
        for (let i = 0; i < 3; i++) {
          const x = 190 + i * 10;
          ctx.save();
          ctx.translate(x, 377);
          ctx.scale(pulseSize, pulseSize);
          
          ctx.beginPath();
          ctx.moveTo(-4, 0);
          ctx.lineTo(4, 0);
          ctx.moveTo(0, -4);
          ctx.lineTo(0, 4);
          ctx.lineWidth = 2;
          ctx.stroke();
          
          ctx.restore();
        }
      }
      
      ctx.fillStyle = '#fff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('BOOST', 25, 382);
    }
    
    function draw() {
      if (!animationActive.current) return;
      
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      drawTrack(ctx);
      
      const { x, y } = player.position;
      
      if (player.penaltyFactor > 0) {
        ctx.beginPath();
        ctx.arc(x, y, 25 + player.penaltyFactor * 15, 0, 2 * Math.PI);
        ctx.fillStyle = `${playerColors.penalty}${player.penaltyFactor * 0.7})`;
        ctx.fill();
      }
      
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, 2 * Math.PI);
      ctx.fillStyle = playerColors.glow;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
      gradient.addColorStop(0, playerColors.bright);
      gradient.addColorStop(0.7, playerColors.medium);
      gradient.addColorStop(1, playerColors.dark);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x - 3, y - 3, 3, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fill();
      
      if (player.speed > 0.01) {
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${player.speed * 2})`;
        ctx.fill();
        
        for (let i = 1; i <= 5; i++) {
          const trailOpacity = (5 - i) / 5 * player.speed * 3;
          if (trailOpacity > 0.05) {
            let prevIndex = Math.floor(player.progress - 1);
            if (prevIndex < 0) prevIndex = trackPath.length - 1;
            const prevPoint = trackPath[prevIndex % trackPath.length];
            const angle = Math.atan2(prevPoint.y - y, prevPoint.x - x);
            const trailX = x - Math.cos(angle) * i * 4;
            const trailY = y - Math.sin(angle) * i * 4;
            
            ctx.beginPath();
            ctx.arc(trailX, trailY, 10 - i, 0, 2 * Math.PI);
            ctx.fillStyle = `${playerColors.trail}${trailOpacity})`;
            ctx.fill();
          }
        }
      }
      
      drawEnergyBar(ctx);
      
      drawTimers(ctx);
      
      if (debug) {
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Progress: ${player.progress.toFixed(2)}`, 10, 20);
        ctx.fillText(`Speed: ${player.speed.toFixed(3)}`, 10, 40);
        ctx.fillText(`Position: ${x.toFixed(1)}, ${y.toFixed(1)}`, 10, 60);
        ctx.fillText(`Accelerating: ${player.accelerating ? 'Yes' : 'No'}`, 10, 80);
        
        const sharpness = calculateCurveSharpness(player.progress);
        const safeSpeed = (0.15 - sharpness * 0.125).toFixed(2);
        ctx.fillText(`Corner Sharpness: ${sharpness.toFixed(2)}`, 10, 100);
        ctx.fillText(`Safe Speed: ${safeSpeed}`, 10, 120);
        ctx.fillText(`Penalty Factor: ${player.penaltyFactor.toFixed(2)}`, 10, 140);
        ctx.fillText(`Energy: ${player.accelerationEnergy.toFixed(1)}%`, 10, 160);
        ctx.fillText(`Recharging: ${player.energyRecharging ? 'Yes' : 'No'}`, 10, 180);
        ctx.fillText(`Lap: ${player.lap}`, 10, 200);
        
        ctx.fillStyle = player.penaltyFactor > 0.5 ? '#FF0000' :
                        player.penaltyFactor > 0.2 ? '#FFAA00' : '#00FF00';
        ctx.fillRect(150, 140, 20, 10);
        
        ctx.fillStyle = player.accelerationEnergy < 20 ? '#FF0000' :
                        player.accelerationEnergy < 50 ? '#FFAA00' : '#00FF00';
        ctx.fillRect(150, 160, 20, 10);
      }
      
      drawLoopRef.current = requestAnimationFrame(draw);
    }
    
    draw();
    
    return () => {
      cancelAnimationFrame(drawLoopRef.current);
    };
  }, [player, debug]);

  return (
    <div style={{
      backgroundColor: '#111',
      width: "100%",
      height: 982,
      position: "relative",
      color: '#eee',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
        
     <SideNavBar />
     <UserProfile style={{ position: "absolute", top: 30, right: 40 }} />

      <h1 style={{ marginBottom: 20, color: getPlayerColors(PLAYER_COLOR).heading }}>🏁 TurboTrack</h1>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        style={{
          backgroundColor: '#222',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
        }}
      />
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <p style={{ margin: 5 }}>Press and hold <strong>SPACEBAR</strong> to accelerate</p>
        <p style={{ margin: 5 }}>Press <strong>D</strong> to toggle debug view</p>
      </div>
    </div>
  );
}