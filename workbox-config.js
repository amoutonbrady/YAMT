module.exports = {
    globDirectory: 'public/',
    globPatterns: [
      '**/*.{html,json,js,css}'
    ],
    swDest: 'public/sw.js',
  
    // Define runtime caching rules.
    runtimeCaching: [{
      // Match any request ends with .png, .jpg, .jpeg or .svg.
      urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
  
      // Apply a cache-first strategy.
      handler: 'cacheFirst',
  
      options: {
        // Use a custom cache name.
        cacheName: 'images',
  
        // Only cache 10 images.
        expiration: {
          maxEntries: 10,
        },
      },
    }],
  };