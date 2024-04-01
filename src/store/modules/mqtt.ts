import { defineStore } from 'pinia';
import mqtt from 'mqtt';

export type MqttState = {
  client: mqtt.MqttClient | null;
  isConnected: boolean;
};

export const useMqttStore = defineStore({
  id: 'mqtt',
  state: (): MqttState => ({
    client: null,
    isConnected: false,
  }),
  actions: {
    async waitConnect() {
      return new Promise((resolve) => {
        const timer = setInterval(() => {
          if (this.isConnected) {
            clearInterval(timer);
            resolve(true);
          }
        }, 100);
      });
    },
    connect(host?: string) {
      function getCurrentPort() {
        const port = window.location.port;
        if (port === '') {
          return window.location.protocol === 'https:' ? '443' : '80';
        }
        return port;
      }

      const port = getCurrentPort();

      const mqttUrl = `ws://${host}:${port}/ws/`;
      // const mqttUrl = `ws://broker.emqx.io:8083/mqtt`;

      const client = mqtt.connect(mqttUrl, {
        protocol: 'ws',
        // clientId: 'mqttx_1dd4ea63',
      });
      client.on('connect', () => {
        this.isConnected = true;
        this.client = client;
        console.log('connect mqtt!');
      });

      client.on('error', (err) => {
        console.error(err);
      });

      client.on('close', () => {
        console.error('close');
      });

      client.on('reconnect', () => {
        console.error('reconnect');
      });
    },
  },
});
