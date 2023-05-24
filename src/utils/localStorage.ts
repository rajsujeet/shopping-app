const StorageKey = {
  userList: "userList@shopify-app",
  user: "user@shopify-app"
}

const setUserData = async (data: any) => {
  return await localStorage.setItem(StorageKey.userList, JSON.stringify(data));
}

const getUserData = async () => {
  const user = await localStorage.getItem(StorageKey.userList);
  return user ? JSON.parse(user) : user;
}

const setUser = async (data: any) => {
  return await localStorage.setItem(StorageKey.user, JSON.stringify(data));
}

const getUser = async () => {
  const user = await localStorage.getItem(StorageKey.user);
  return user ? JSON.parse(user) : user;
}

const resetStorage = async () => {
  const keys = StorageKey.user
  await localStorage.removeItem(keys);
}

export { StorageKey, setUserData, getUserData, resetStorage, getUser, setUser};