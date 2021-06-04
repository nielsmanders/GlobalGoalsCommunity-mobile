$(document).ready(function() {

    // Search
    $("#search-form").on("submit", function(e) {
        e.preventDefault();

        var searchString = $("#search-input").val();
        var url = location.href;

        if (location.href.toLowerCase().indexOf("?search=") < 0) {
            url += "?search=&sort=&filter=";
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
            url += "?search=&sort=&filter=";
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

    // Filter
    $(".checkbox-input").on("change", function(e) {
        if ($(this).prop("checked")) {
            // If filter is checked
            var filterString = $(this).val();
            var url = location.href;

            if (location.href.toLowerCase().indexOf("&filter=") < 0) {
                url += "?search=&sort=&filter=";
            }

            var oldFilter = url.substring(url.indexOf('&filter='));

            if (oldFilter.length > 8) {
                if (oldFilter.indexOf(filterString) < 0) {
                    newFilter = oldFilter + "%2B" + filterString;
                }
            } else {
                newFilter = oldFilter + filterString;
            }

            location.href = url.replace(oldFilter, newFilter);
        } else {
            $(this).prop("checked", true);
            e.preventDefault();
        }
    });

    // Delete single filter
    $(".delete-filter").on("click", function() {
        var url = location.href;
        var filterString = $(this).data("filter");
        var oldFilter = url.substring(url.indexOf('&filter='));

        if (oldFilter.endsWith(filterString)) {
            location.href = url.replace(filterString, "");
        } else {
            location.href = url.replace(filterString + "%2B", "");
        }
    });

    // Delete all filters
    $(".delete-filters").on("click", function() {
        var url = location.href;
        var oldFilter = url.substring(url.indexOf('&filter='));
        location.href = url.replace(oldFilter, "&filter=");
    });

});