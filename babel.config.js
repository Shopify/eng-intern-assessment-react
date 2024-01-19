module.exports = {
   presets: [
      "@babel/preset-env",
      [
         "@babel/preset-react",
         {
            runtime: "automatic", // Ensures the new JSX transform is used
            importSource: "@emotion/react", // If you are using emotion
         },
      ],
      "@babel/preset-typescript",
   ],
};
