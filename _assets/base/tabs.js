// SPDX-FileCopyrightText: Copyright 2022 SK TELECOM CO., LTD.
// SPDX-License-Identifier: Apache-2.0

(($) => {
  class Tabs {
    constructor(options) {
      this.options = options
    }

    init() {
      let tabNavs = $('.tabs').find('[data-tabs-content-id]:not([data-potion-handled])')

      tabNavs.attr('data-potion-handled', 'true')
        .on('click', e => {
          e.preventDefault()

          let $clicked = $(e.currentTarget)

          parent = $clicked.parents('.tabs')
          parent.find('[data-tabs-content-id]')
            .removeClass('active')
            .each((_, nav) => {
              parent.find('[id=\'' + $(nav).attr('data-tabs-content-id') + '\']').removeClass('active')
            })

          $clicked.addClass('active')
          $('#' + $clicked.attr('data-tabs-content-id')).addClass('active')
        })

      return tabNavs
    }
  }

  $.tabs = (options) => {
    return new Tabs(options)
  }
})(jQuery)

