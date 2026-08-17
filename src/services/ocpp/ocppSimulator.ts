import {
  updateChargingSession,
  chargingSession,
} from '../../store/chargingStore';

export function startChargingSimulator() {
  const timer = setInterval(() => {
    const energy = Number((chargingSession.energy + 0.02).toFixed(2));

    const power = Number((60 + Math.random() * 5).toFixed(1));

    const cost = Number((chargingSession.cost + 1.2).toFixed(2));

    const voltage = Number((395 + Math.random() * 8).toFixed(0));

    const current = Number((158 + Math.random() * 8).toFixed(0));

    const battery = Math.min(chargingSession.battery + 0.05, 100);

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

export function stopChargingSimulator(timer: any) {
  clearInterval(timer);
}
