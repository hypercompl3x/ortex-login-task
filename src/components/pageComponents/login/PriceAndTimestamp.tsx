import { useEffect, useRef, useState } from "react";

const SUB_MSG = { topic: "subscribe", to: "EURUSD:CUR" };
const WS_URL = "wss://stream.tradingeconomics.com/?client=guest:guest";

function formatLocal(dt: PriceAndTimestamp["dt"]) {
  const d = new Date(dt);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(d);
}

type PriceAndTimestamp = {
  dt: number;
  price: number;
};

export default function PriceAndTimestamp() {
  const wsRef = useRef<WebSocket>(null);
  const [latest, setLatest] = useState<PriceAndTimestamp>();

  useEffect(() => {
    let cancelled = false;
    let reconnectTimer: number | null = null;
    let attempts = 0;

    const connect = () => {
      if (cancelled) return;

      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        if (cancelled) return;
        attempts = 0;
        ws.send(JSON.stringify(SUB_MSG));
      };

      ws.onmessage = (e) => {
        if (cancelled) return;

        try {
          const msg = JSON.parse(e.data);

          const price = msg?.price;
          const dt = msg?.dt;

          if (price != null && dt != null) {
            setLatest({ price, dt });
          }
        } catch {
          return;
        }
      };

      ws.onerror = () => {
        if (cancelled) return;
      };

      ws.onclose = () => {
        if (cancelled) return;

        attempts += 1;
        const delay = Math.min(10_000, 500 * 2 ** Math.min(attempts, 4));
        reconnectTimer = window.setTimeout(connect, delay);
      };
    };

    connect();

    return () => {
      cancelled = true;
      if (reconnectTimer) window.clearTimeout(reconnectTimer);
      wsRef.current?.close();
    };
  }, []);

  return (
    <div className="absolute top-2 right-3 text-sm font-medium">
      <div>EUR/USD Exchange Rate: {latest ? latest.price : "—"}</div>
      <div>Local Time: {latest ? formatLocal(latest.dt) : "—"}</div>
    </div>
  );
}
