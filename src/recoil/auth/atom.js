import { atom } from "recoil";

const authAtom = atom({
  key: "authAtom",
  default: localStorage.getItem("citizens-i-auth")
    ? JSON.parse(localStorage.getItem("citizens-i-auth"))
    : null,
});

export default authAtom;
