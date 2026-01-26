/* src/typings.d.ts */

// 支援 ?raw 結尾的匯入
declare module '*?raw' {
  const content: string;
  export default content;
}
