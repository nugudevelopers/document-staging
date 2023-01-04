// SPDX-FileCopyrightText: Copyright 2022 SK TELECOM CO., LTD.
// SPDX-License-Identifier: Apache-2.0

(($) => {
  class Code {
    constructor(options) {
      this.options = options
    }

    init() {
      let copy_codes = $('.code').find('[data-code-copy-target-id]:not([data-potion-handled])')

      copy_codes.attr('data-potion-handled', 'true')
        .on('click', e => {
          e.preventDefault()

          let $clicked = $(e.currentTarget)

          parent = $clicked.parents('.code')
          let code = parent.find('td.rouge-code').text().trim()

          navigator.clipboard.writeText(code).then(() => {
            let $success = parent.find('.copy-text')

            if ($success[0]) {
              $success.addClass('show')
              setTimeout(() => $success.removeClass('show'), 1000)
            }
          })
        })

      return copy_codes
    }
  }

  $.code = (options) => {
    return new Code(options)
  }
})(jQuery)

