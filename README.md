# Bandlab Take Home Assignment

This app is implmented as a single page app (SPA) using the VueJS framework. No build step is required as we compiled the Vue Single-File-Components at runtime using [vue-import](https://github.com/kianfang/vue-import) and load the separate files as ES modules.

It includes the following features:
- Navigate between `Posts` page and `Samples` page via nav bar
- Routing enabled through the `/posts` and `/samples` endpoints
- `Posts` page allows sorting by title alphabetically or composed date reverse chronologically
- Posts can be grouped by composer. The sorting of user is by popularity (total likes acros all posts most to least)
- `Samples` page allow user to play samples one at a time (automatically pause others when one starts playing)
- Includes a frequency visualizer
- Posts, samples and users fetched from JSON endpoint

Credit goes to [Creartive](https://www.flaticon.com/free-icons/files-and-folders) for icons used in this project
