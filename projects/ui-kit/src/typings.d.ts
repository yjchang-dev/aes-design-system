// 允許 !!raw-loader! 開頭的匯入
declare module '!!raw-loader!*' {
  const content: string;
  export default content;
}
