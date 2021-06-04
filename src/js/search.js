$(document).ready(function() {

    // Search
    $("#search-form").on("submit", function(e) {
        e.preventDefault();

        var searchString = $("#search-input").val();
        var url = location.href;

        if (location.href.toLowerCase().indexOf("?search=") < 0) {
            url += "?search=&sort=&filter=&sdgs=";
        }

        var oldSearch = url.substring(url.lastIndexOf('?search=') + 8, url.lastIndexOf('&sort='));

        if (searchString.length > 0) {
            if (oldSearch.length > 0) {
                location.href = url.replace(oldSearch, searchString);
            } else {
                location.href = url.replace('?search=', '?search=' + searchString);
            }
        }
    });

    // Delete search
    $('.delete-search').on("click", function() {
        var url = location.href;
        var oldSearch = url.substring(url.lastIndexOf('?search=') + 8, url.lastIndexOf('&sort='));

        location.href = url.replace(oldSearch, '');
    });

    // Sort
    $("#sort").on("change", function() {
        var sortString = $(this).val();
        var url = location.href;

        if (location.href.toLowerCase().indexOf("&sort=") < 0) {
            url += "?search=&sort=&filter=&sdgs=";
        }

        var oldSort = url.substring(url.lastIndexOf('&sort=') + 6, url.lastIndexOf('&filter='));
        
        if (oldSort !== sortString) {
            if (oldSort.length > 0) {
                location.href = url.replace(oldSort, sortString);
            } else {
                location.href = url.replace('&sort=', '&sort=' + sortString)
            }
        }
    });

    // Type Filter
    $(".type-filter").on("change", function(e) {
        if ($(this).prop("checked")) {
            // If filter is checked
            var filterString = $(this).val();
            var url = location.href;

            if (location.href.toLowerCase().indexOf("&filter=") < 0) {
                url += "?search=&sort=&filter=&sdgs=";
            }

            var oldFilter = url.substring(url.indexOf('&filter=') + 8, url.lastIndexOf('&sdgs='));

            if (oldFilter.length > 0) {
                if (oldFilter.indexOf(filterString) < 0) {
                    newFilter = oldFilter + "%2B" + filterString;
                    location.href = url.replace(oldFilter, newFilter);
                }
            } else {
                newFilter = oldFilter + filterString;
                location.href = url.replace('&filter=', '&filter=' + newFilter);
            }
        } else {
            $(this).prop("checked", true);
            e.preventDefault();
        }
    });

    // Sdg filter
    $(".sdg-filter-item").on("change", function(e) {
        if ($(this).prop("checked")) {
            // If filter is checked
            var sdgId = $(this).val();
            var url = location.href;

            if (location.href.toLowerCase().indexOf("&sdgs=") < 0) {
                url += "?search=&sort=&filter=&sdgs=";
            }

            var oldFilter = url.substring(url.indexOf('&sdgs=') + 6);

            if (oldFilter.length > 0) {
                if (oldFilter.indexOf(sdgId) < 0) {
                    newFilter = oldFilter + "%2B" + sdgId;
                    location.href = url.replace(oldFilter, newFilter);
                }
            } else {
                newFilter = oldFilter + sdgId;
                location.href = url.replace('&sdgs=', '&sdgs=' + newFilter);
            }
        } else {
            $(this).prop("checked", true);
            e.preventDefault();
        }
    });

    // Delete single filter
    $(".delete-filter").on("click", function() {
        var url = location.href;
        var type = $(this).data("filter-type");

        if (type == "type") {
            var filterString = $(this).data("filter");
            var oldFilter = url.substring(url.indexOf('&filter=') + 8, url.lastIndexOf('&sdgs='));
    
            if (oldFilter.endsWith(filterString)) {
                location.href = url.replace(filterString, "");
            } else {
                location.href = url.replace(filterString + "%2B", "");
            }
        } else if (type == "sdg") {
            var filterString = $(this).data("filter");
            var oldFilter = url.substring(url.indexOf('&sdgs=') + 6);    

            if (oldFilter.endsWith(filterString)) {
                location.href = url.replace(filterString, "");
            } else {
                location.href = url.replace(filterString + "%2B", "");
            }
        }
    });

    // Delete all filters
    $(".delete-filters").on("click", function() {
        var url = location.href;
        var oldFilter = url.substring(url.indexOf('&filter='));
        location.href = url.replace(oldFilter, "&filter=&sdgs=");
    });

});