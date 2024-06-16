// import { ZodError } from "zod";

// export const getFormattedZodError = (error: ZodError<any>) => {
//   const zodFormattedError = error.format();
//   const keys = Object.keys(zodFormattedError);
//   let formattedError = {};
//   keys.forEach((key) => {
//     formattedError = {
//       ...formattedError,
//       [key]: zodFormattedError[key]["_errors"][0],
//     };
//   });
//   return formattedError;
// };
