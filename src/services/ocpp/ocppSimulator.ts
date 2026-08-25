import {
  updateChargingSession,
  chargingSession,
} from '../../store/chargingStore';

// ==========================
// Start Charging Simulator
// ==========================

export function startChargingSimulator() {
  const timer = setInterval(() => {
    // ==========================
    // Energy
    // ==========================
    const energy = Number((chargingSession.energy + 0.02).toFixed(2));

    // ==========================
    // Power
    // ==========================
    const power = Number((60 + Math.random() * 5).toFixed(1));

    // ==========================
    // Voltage
    // ==========================
    const voltage = Number((395 + Math.random() * 8).toFixed(0));

    // ==========================
    // Current
    // ==========================
    const current = Number((158 + Math.random() * 8).toFixed(0));

    // ==========================
    // Battery
    // ==========================
    const battery = Math.min(chargingSession.battery + 0.05, 100);

    // ==========================
    // Charging Cost
    // ==========================
    const cost = Number((energy * chargingSession.pricePerKwh).toFixed(2));

    // ==========================
    // Update Charging Session
    // ==========================
    updateChargingSession({
      battery,
      energy,
      power,
      voltage,
      current,
      cost,
      status: 'CHARGING',
    });
  }, 1000);

  return timer;
}

// ==========================
// Stop Charging Simulator
// ==========================

export function stopChargingSimulator(timer: any) {
  clearInterval(timer);
}
