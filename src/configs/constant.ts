import dotenv from "dotenv";
dotenv.config(); // implement .env file

// Add fallback value from env for stability
export const PORT: number = Number(process.env.PORT) || 8089; // default port is 8089
export const DUMMY: string = process.env.DUMMY || "Dummy Export";    
// same as 
// export {
//     PORT,
//     DUMMY
// }