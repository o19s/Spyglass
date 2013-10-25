

// SG.Pagination = SG.SearcherObserver.extend({
//   searcher: null,
//   templateName: 'pagination',
//   totalPages: 0,
//   getTotalPages: function () {
//     try {
//       this.set('totalPages', Math.ceil(this.searcher.getNumFound() / this.searcher.resultsPerPage));
//     }
//     catch (error) {
//     }
//   },
//   pages: [],
//   currentPage: null,
//   update: function () {
//     var self = this;
//     var resultsPerPage = self.searcher.resultsPerPage;
//     self.set('currentPage', Math.ceil((self.searcher.params.start + resultsPerPage) / resultsPerPage));
//     var pages = [];
//     self.getTotalPages();
//     for (var i = 1; i <= self.totalPages; i++) {
//       var page = {};
//       page.num = i;
//       page.loadNext = function () {
//         self.set('currentPage', this.num);
//         self.searcher.loadNextResults((this.num - 1) * resultsPerPage, resultsPerPage);
//       };
//       pages.push(this.pageNumView.create(page));
//     }
//     self.set('pages', pages);
//   },
//   pageNumView: Em.View.extend({
//     template: Em.Handlebars.compile('{{num}} '),
//     tagName: 'span',
//     classNames: ['page-num'],
//     click: function (e) {
//       e.preventDefault();
//       e.stopPropagation();
//       this.loadNext();
//     }
//   })
// });

// Ember.TEMPLATES.pagination = Em.Handlebars.compile('\
//   {{#if view.currentPage}}{{view.currentPage}} | {{/if}}{{#each view.pages }}{{view this}}{{/each}}\
// ');