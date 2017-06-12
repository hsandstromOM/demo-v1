module.exports = {
	url: '/:slug',
	template: require('raw!templates/blog/blog-item-view.html'),
	controller: BlogItemController,
	controllerAs: 'blogItemCtrl',
};
function BlogItemController(contentful, $stateParams, $scope, $location, Slug, CacheService, $window, $state) {
    $window.scrollTo(0,0)
    var cachedPosts = CacheService.get('blogPosts');
    var blogPosts;
    if (cachedPosts) {
        blogPosts = cachedPosts;
        organizePosts(blogPosts)
    } else {
        // If no cached posts, preload for indexing (external origin)
        getBlogPosts();
    }
    function getBlogPosts () {
        contentful
            .entries('content_type=blogPost&order=fields.date')
            .then(function(response) {
                blogPosts = response.data.items
                console.log(blogPosts);
                CacheService.put('blogPosts', blogPosts);
                organizePosts(blogPosts)
            },
            function(error) {
                console.log('Error getting blog posts from Contentful: ' + error);
            });
    }
    function organizePosts (posts) {
        for(var i = 0; i < posts.length; i ++) {
            if(posts[i].fields.slug === $stateParams.slug){
                $scope.currentBlogPost = posts[i];
                if($scope.currentBlogPost.fields.seoTitle) {
                    document.title = $scope.currentBlogPost.fields.seoTitle;
                }
                if($scope.currentBlogPost.fields.pageSpecificMetaDescriptionSeo) {
                    var meta = document.getElementsByTagName("meta");
                    for (var i = 0; i < meta.length; i++) {
                        if (meta[i].name.toLowerCase() === "description") {
                            meta[i].content=$scope.currentBlogPost.fields.pageSpecificMetaDescriptionSeo;
                        }
                    }
                }
                if(i == 0) {
                    var prevNum = posts.length - 1;
                    $scope.prevPost = posts[prevNum];
                    $scope.nextPost = posts[1];
                } else if(i == posts.length - 1) {
                    var prevNum = i - 1;
                    $scope.nextPost = posts[0];
                    $scope.prevPost = posts[prevNum];
                } else {
                    var nextNum = i + 1;
                    var prevNum = i - 1;
                    $scope.prevPost = posts[prevNum];
                    $scope.nextPost = posts[nextNum];
                }
            }
        }
    }
    $scope.selectPhoto = function(photo, $index) {
        $scope.currentIndex = $index
        console.log($scope.currentIndex);
        $scope.selectedProjectImage = photo;
    };

    ///Social Sharing tbd on if count works
    $(function() {
        var knownButtons = ['twitter', 'facebook'];


        $.fn.sharify = function(options) {
            var settings = $.extend({
                buttons: knownButtons.slice(),
                url: document.location.origin + document.location.pathname,
                media: null,
                counter: false,
                className: ''
            }, options);

            settings.buttons.contains = function(item) {
                return this.indexOf(item) > -1;
            };

            if (settings.counter && settings.counter !== 'none' && settings.counter !== 'bottom') {
                settings.counter = 'top';
            } else if (!settings.counter) {
                settings.counter = 'none';
            }

            return this.each(function() {
                var $share = $('<div/>', {
                    class: $.trim(['share', 'counter-' + settings.counter, settings.className].join(' '), settings.className)
                });
                $.each(settings.buttons, function(index, name) {
                    if (knownButtons.indexOf(name) > -1) {
                        $share.append(createButton(name, settings));
                    }
                });

                enableShareClick($share, settings);
                if (settings.counter !== 'none') {
                    setShareCount($share, settings);
                }
                $(this).append($share);
            });
        };

        function createButton(name, settings) {
            var $button = $('<div/>', {
                'class': ['button', name].join(' ')
            });
            switch (settings.counter) {
                case 'top':
                    $button.append(
                        $('<div/>', {
                            'class': 'counter'
                        })).append(
                        $('<a/>', {
                            'href': '#'
                        }).append(
                            $('<i/>', {
                                class: 'fa fa-' + name
                            }))
                    );
                    break;
                case 'bottom':
                    $button.append(
                        $('<a/>', {
                            'href': '#'
                        }).append(
                            $('<i/>', {
                                class: 'fa fa-' + name
                            }))
                    ).append(
                        $('<div/>', {
                            'class': 'counter'
                        })
                    );
                    break;
                case 'none':
                    $button.append(
                        $('<a/>', {
                            'href': '#'
                        }).append(
                            $('<i/>', {
                                class: 'fa fa-' + name
                            })));
                    break;
            }
            return $button;
        }

        function enableShareClick($share, settings) {
            function openShareWindow(e) {
                window.open(e.href, 'mywin', 'left=20,top=20,width=500,height=400,toolbar=1,resizable=0');
                return false;
            }

            var buttons = settings.buttons;
            if (buttons.contains('twitter')) {
                $share.find(".twitter a")
                    .attr("href", "//twitter.com/intent/tweet?text=" + document.title + "&url=" + settings.url)
                    .on("click", function() {
                        return openShareWindow(this)
                    });
            }
            if (buttons.contains('facebook')) {
                $share.find(".facebook a")
                    .attr("href", "//www.facebook.com/sharer/sharer.php?u=" + settings.url)
                    .on("click", function() {
                        return openShareWindow(this)
                    });
            }
        }

        function setShareCount($share, settings) {
            var buttons = settings.buttons;
            if (buttons.contains('twitter')) {
                $.getJSON("http://urls.api.twitter.com/1/urls/count.json?url=" + settings.url + "&callback=?",
                    function(json) {
                        $share.find(".twitter .counter").text(formatCount(json.count));
                    });
            }
            if (buttons.contains('facebook')) {
                $.getJSON("http://graph.facebook.com/" + settings.url, function(json) {
                    $(".facebook .counter").text(formatCount(json.shares));
                });
            }

            function formatCount(num) {
                num = num || 0;
                if (num >= 1000000000) {
                    return (num / 1000000000).toFixed(1) + 'G';
                }
                if (num >= 1000000) {
                    return (num / 1000000).toFixed(1) + 'M';
                }
                if (num >= 1000) {
                    return (num / 1000).toFixed(1) + 'K';
                }
                return num;
            }
        };
    });

    $(function() {
        var buttons = ['twitter', 'facebook']

        $('.example.hidden-counter').sharify({
            buttons: buttons
        });

        $('.example.image').sharify({
            buttons: buttons,
            className: 'image',
            media: $('.example.image img').attr('src')
        });

    });

}
