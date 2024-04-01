import { useMqttStore } from '@/store/modules/mqtt';

export type MqttMsg<T> = {
  value: T;
};

export function useSyncRef<T>(val: T, key: string) {
  // get master from route
  const route = useRoute();
  const master = computed(() => route.query.master as string);

  const value = toValue(val);
  const valueRef = ref<T>(value) as Ref<T>;

  // create connection to mqtt
  const mqttStore = useMqttStore();

  const { isConnected } = storeToRefs(mqttStore);

  const client = ref();

  watch(
    isConnected,
    (val) => {
      if (val) {
        client.value = mqttStore.client;
        if (client.value) {
          // subscribe topic
          client.value.subscribe(key);

          // listen topic value when changed
          client.value.on('message', (topic: string, message: string) => {
            console.log(`🚏 【${key}】 msg received`);
            if (topic === key) {
              const res = JSON.parse(message.toString()) as MqttMsg<T>;

              console.log(`收到消息：${res.value}`);

              setRemoteValue(res.value as any);
            }
          });
        } else {
          console.warn('mqtt client is null,maybe not connect');
        }
      }
    },
    { immediate: true },
  );

  /**
   * Set value when ref value changed and master=1
   */

  const publishValue = () => {
    if (master.value === '1') {
      const msg = JSON.stringify({ value: valueRef.value });

      if (client.value) {
        client.value.publish(key, msg);
        console.log(`发送消息：${msg}`, client.value);
      } else {
        console.warn(`发送消息失败：${msg},mqtt client is null`);
      }
    }
  };

  watch(valueRef, publishValue);

  /**
   * Set value when mqtt send message and master=0
   */

  const setRemoteValue = (val: T) => {
    if (master.value === '0') {
      valueRef.value = val;
    }
  };

  return valueRef;
}
