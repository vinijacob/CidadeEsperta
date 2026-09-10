import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  STUDENT: "@cidade_esperta_student",
  PROGRESS: "@cidade_esperta_progress",
};

export async function saveData<T>(key: string, data: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(data));
}

export async function getData<T>(key: string): Promise<T | null> {
  const data = await AsyncStorage.getItem(key);

  if (!data) {
    return null;
  }

  return JSON.parse(data) as T;
}

export async function removeData(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}

export async function clearStorage(): Promise<void> {
  await AsyncStorage.clear();
}
