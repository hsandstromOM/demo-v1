module.exports = {
	url: '/blog',
	template: require('raw!templates/blog/blog-view.html'),
	controller: BlogController,
	controllerAs: 'blogCtrl'
};
function BlogController(contentful, $stateParams, $scope, $location, Slug, CacheService) {
    var blogPosts = [];

    // var feed = new Instafeed({
    //   get: 'user',
    //   userId: 4204910055, // Ex: 1374300081
    //   accessToken: '4204910055.7499d0e.098d029149fb456fb367af851bcecada',
    //   limit: 8
    // });
    // feed.run();

    $scope.currentPage = 1;
    $scope.featuredPost = null;

    $scope.isSelectedCategory = isSelectedCategory;
    $scope.submitSearch = submitSearch;
    $scope.goToPostDetail = goToPostDetail;
    $scope.nextPost = nextPost;
    $scope.prevPost = prevPost;
    $scope.nextPage = nextPage;
    $scope.prevPage = prevPage;

    getBlogPosts();

    function getBlogPosts() {
        console.log('getting posts');
        // Get all blog posts sorted by date
        var query = 'content_type=blogPost&order=fields.date';
        // Pass in optional query params
        console.log($stateParams);
        if ($stateParams.categoryId) query += '&fields.category.sys.id=' + $stateParams.categoryId;
        else if ($stateParams.tag) query += '&fields.tags[in]=' + $stateParams.tag;
        else if ($stateParams.query) query += '&query=' + $stateParams.query;

        contentful
            .entries(query)
            .then(function(response){
                console.log(response);
                blogPosts = response.data.items;
                $scope.numberOfPosts = response.data.total;

                // Search for featured post
                var featuredIndex = blogPosts.findIndex(isFeatured);
                // IF featured post in response
                if (featuredIndex > -1) {
                    // Remove from posts array
                    var featuredPost = blogPosts.splice(featuredIndex, 1)[0];
                    // Mark for DOM styling
                    featuredPost.firstFeatured = true;
                    // Add to front of posts array
                    blogPosts.unshift(featuredPost);
                }
                // Store posts in cache
                CacheService.put('blogPosts', blogPosts);
                // Set visible posts
                $scope.currentBlogPosts = blogPosts.slice(0,4);

                function isFeatured(post) {
                    return post.fields.featured === true;
                }
            },
            function(error){
                console.log('Error getting blog posts from Contentful: ' + error);
            });
    }

    // function getSeo() {
    //     contentful
    //         .entries('content_type=blogPageSeo')
    //         .then(function(response){
    //             var contentfulData = response.data.items[0];
    //             if(contentfulData.fields.seoTitle) {
    //                 document.title = contentfulData.fields.seoTitle;
    //             }
    //             if(contentfulData.fields.pageSpecificMetaDescriptionSeo) {
    //                 var meta = document.getElementsByTagName("meta");
    //                 for (var i = 0; i < meta.length; i++) {
    //                     if (meta[i].name.toLowerCase() === "description") {
    //                         meta[i].content=contentfulData.fields.pageSpecificMetaDescriptionSeo;
    //                     }
    //                 }
    //             }
    //         },
    //         function(error){
    //             console.log('Error getting blog seo from Contentful: ' + error);
    //         });
    // }



    $scope.post = {
         readMore: true,
       }
       $scope.showReadMore = function(post) {
           post.readMore = !post.readMore;
       }
       $scope.hideReadMore = function(post) {
           post.readMore = !post.readMore;
       }

    function isSelectedCategory(category) {
        return $location.path().startsWith('/blog/category/' + Slug.slugify(category));
    }

    function goToPostDetail(post, index) {
        console.log('index in dom: ' + index);
        currentPostIndex = getPostIndex(index);
        console.log('index in allposts: ' + index);
        $location.path('/blog/' + Slug.slugify(post.fields.title) + '/' + post.sys.id);
    }

    function prevPost() {
        var post = {};
        if (currentPostIndex === 0) {
            currentPostIndex = $scope.numberOfPosts - 1 ;
            post = blogPosts[currentPostIndex];
        }
        else {
            post = blogPosts[currentPostIndex - 1];
        }
        $location.path('/blog/' + Slug.slugify(post.fields.title) + '/' + post.sys.id);
    }

    function nextPost() {
        var post = {};
        if (currentPostIndex == $scope.numberOfPosts - 1 ) {
            currentPostIndex = 0;
            post = blogPosts[currentPostIndex];
        }
        else {
            post = blogPosts[currentPostIndex + 1];
        }
        $location.path('/blog/' + Slug.slugify(post.fields.title) + '/' + post.sys.id);
    }

    function submitSearch() {
        $location.path('blog/search/' + $scope.query);
    }

    function nextPage() {
        var begin = $scope.currentPage * 4;
        var end = begin + 4;
        $scope.currentBlogPosts = blogPosts.slice(begin, end);
    }

    function goToPage(pageNumber) {
        var begin = (pageNumber - 1) * 4;
        var end = begin + 4;
        $scope.currentBlogPosts = blogPosts.slice(begin, end);
    }

    function prevPage() {
        var begin = ($scope.currentPage - 1) * 4;
        var end = begin + 4;
        $scope.currentBlogPosts = blogPosts.slice(begin, end);
    }

    function getPostIndex(index) {
        return ($scope.currentPage - 1) * 4 + index;
    }
}
