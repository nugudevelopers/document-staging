// SPDX-FileCopyrightText: Copyright 2022 SK TELECOM CO., LTD.
// SPDX-License-Identifier: Apache-2.0

(($) => {
  class Navigation {
    constructor(options) {
      this.options = options
    }

    static matchPath(path, requestPath) {
      return new RegExp(path + '(/|/?#([^/]*))?$').test(requestPath)
    }

    init(pathname) {
      $('[data-unfold-id]:not([data-potion-handled])')
        .attr('data-potion-handled', 'true')
        .on('click', e => {
          $('[data-fold-target-id=\'' + $(e.currentTarget).attr('data-unfold-id') + '\']').removeClass('fold')
        })

      $('[data-fold-id]:not([data-potion-handled])')
        .attr('data-potion-handled', 'true')
        .on('click', e => {
          $('[data-fold-target-id=\'' + $(e.currentTarget).attr('data-fold-id') + '\']').addClass('fold')
        })

      let all_links = $('[data-nav-link-id]')
      all_links.removeClass('active')

      let $selected = all_links.filter((_, nav_link) => Navigation.matchPath($(nav_link).attr('data-nav-link-id'), pathname))

      $selected.addClass('active')
      $('[data-fold-target-id=\'' + pathname + '\']').removeClass('fold')

      $selected.parents('[data-nav-link-id]').filter((_, p) => $(p).has($selected).length)
        .each((_, nav_link) => $('[data-fold-target-id=\'' + $(nav_link).attr('data-nav-link-id') + '\']').removeClass('fold'))
    }
  }

  $.navigation = (options) => {
    return new Navigation(options)
  }
})(jQuery)
