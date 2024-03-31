import { defineStore } from "pinia";
const useGlobalComponent = defineStore("GlobalComponent", {
 state: () => {
   return false;
   refresh:false
 }
})
export default useGlobalComponent;