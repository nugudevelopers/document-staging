// SPDX-FileCopyrightText: Copyright 2022 SK TELECOM CO., LTD.
// SPDX-License-Identifier: Apache-2.0

(($) => {
  class Header {
    constructor(options) {
      this.options = options
    }

    init() {
      let copy_links = $('h1, h2, h3, h4, h5, h6').find('[data-header-link]:not([data-potion-handled])')

      copy_links.attr('data-potion-handled', 'true')
        .on('click', e => {
          e.preventDefault()

          let $clicked = $(e.currentTarget)

          let url = [$(location).attr('protocol'), $(location).attr('host'), $clicked.attr('data-header-link')].join('')

          navigator.clipboard.writeText(url)
        })

      return copy_links
    }
  }

  $.header = (options) => {
    return new Header(options)
  }
})(jQuery)
